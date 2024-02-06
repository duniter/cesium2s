#!/usr/bin/env node

(async () => {
  const path = require('path');
  const fs = require('fs');
  const stdio = require('stdio');
  const {copyFiles} = require('./utils');
  const webext = await import('web-ext');

  const projectDir = path.resolve(__dirname, '../..');
  require('./env-global');

  const LOG_PREFIX = `[${__filename}]`;
  const ARTIFACTS_DIR = path.join(projectDir, 'release');
  const MKPKG_DIR = path.join(projectDir, 'webext');
  const MKPKG_RESOURCES = path.join(projectDir, 'resources', 'webext');
  const OPTIONS = stdio.getopt({
    publish: {
      description: "Publish the addon (sign the addon with 'listed' channel, see `--channel` on `web-ext sign --help`)",
      default: false,
    },
    init: {
      key: 'i',
      description: "Initialize webext source directory",
      default: false,
    },
    pkg: {
      key: 'p',
      description: "Make local unsigned zip package",
      default: false,
    },
    sign: {
      key: 's',
      description: "Make signed webext package",
      default: false,
    },
    run: {
      key: 'r',
      description: "Only run the addon (do not make package, --sign or --publish has no effect)",
      default: false,
    },
  });

  function checkBuild() {
    if (! fs.existsSync(path.join(MKPKG_DIR, 'index.html'))) {
      throw new Error('Web ext app is not build : run `npm build:webext` before');
    }
  }

  async function copyResources() {
    console.info(`${LOG_PREFIX} copy web-ext resources...`)
    await copyFiles(MKPKG_RESOURCES, MKPKG_DIR);
  }

  async function initPkg() {
    console.info(`${LOG_PREFIX} init pkg src...`);
    await copyResources();
    await lintPkg();
  }

  async function runPkg() {
    console.info(`${LOG_PREFIX} run package...`);
    const res = await webext.cmd.run({
      sourceDir: MKPKG_DIR,
    });
  }

  async function lintPkg() {
    console.info(`${LOG_PREFIX} lint package...`);
    const res = await webext.cmd.lint({
      sourceDir: MKPKG_DIR,
      output: 'text',
    }, {shouldExitProgram: false});
    if (res.summary.errors > 0) {
      throw new Error(`${LOG_PREFIX} webext lint not pass without errors`);
    }
  }

  async function mkPkg() {
    console.info(`${LOG_PREFIX} make unsigned web-ext package...`);
    await webext.cmd.build({
      sourceDir: MKPKG_DIR,
      artifactsDir: path.join(ARTIFACTS_DIR),
      filename: '{name}-v{version}-extension.zip',
    });
  }

  async function signPkg() {
    console.info(`${LOG_PREFIX} make signed web-ext package...`);

    const apiKey = process.env.AMO_JWT_ISSUER;
    const apiSecret = process.env.AMO_JWT_SECRET;
    const id = process.env.WEB_EXT_ID;
    const channel = OPTIONS.publish ? 'listed' : 'unlisted';

    if (!apiKey || !apiSecret || !id) {
      throw new Error('Missing "AMO_JWT_ISSUER" or "AMO_JWT_SECRET" or "WEB_EXT_ID" in script env');
    }

    await webext.cmd.sign({
      sourceDir: MKPKG_DIR,
      artifactsDir: ARTIFACTS_DIR,
      apiKey,
      apiSecret,
      id,
      channel: channel,
    });
  }

  async function main() {
    checkBuild();
    if (OPTIONS.init) await initPkg();
    if (!fs.existsSync(path.join(MKPKG_DIR, 'manifest.json'))) {
      console.error(`${LOG_PREFIX} webext is not initialized : run \`npm run webext:init\``);
      return;
    }
    if (OPTIONS.run) await runPkg();
    else {
      if (OPTIONS.pkg) await mkPkg();
      if (OPTIONS.sign) await signPkg();
    }
  }

  await main()
})().catch(err => console.log(err));

