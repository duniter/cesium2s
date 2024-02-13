#!/usr/bin/env node

(async () => {
  const path = require('path');
  const fs = require('fs');
  const stdio = require('stdio');
  const webext = await import('web-ext');

  const projectDir = path.resolve(__dirname, '../..');
  require('./env-global');

  const LOG_PREFIX = `[${path.basename(__filename)}]`;
  const ARTIFACTS_DIR = path.join(projectDir, 'release');
  const MKPKG_DIR = path.join(projectDir, 'webext');
  const OPTIONS = stdio.getopt({
    listed: {
      description: "Publish the addon (sign the addon with 'listed' channel, see `--channel` on `web-ext sign --help`)",
      default: false,
    },
    lint: {
      key: 'l',
      description: "Lint webext directory",
      default: false,
    },
    package: {
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
      description: "Only run the addon (do not make package, --sign or --release has no effect)",
      default: false,
    },
  });

  function checkBuild() {
    if (! fs.existsSync(path.join(MKPKG_DIR, 'index.html')) || !fs.existsSync(path.join(MKPKG_DIR, 'manifest.json'))) {
      console.error(`${LOG_PREFIX} webext not build: run \`npm run webext:build\``);
    }
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
      filename: '{name}-{version}-extension.zip',
    });
  }

  async function signPkg() {
    console.info(`${LOG_PREFIX} make signed web-ext package...`);

    const apiKey = process.env.AMO_JWT_ISSUER;
    const apiSecret = process.env.AMO_JWT_SECRET;
    const id = process.env.WEB_EXT_ID;
    const channel = OPTIONS.listed ? 'listed' : 'unlisted';

    if (!apiKey || !apiSecret || !id) {
      throw new Error('Missing "AMO_JWT_ISSUER" or "AMO_JWT_SECRET" or "WEB_EXT_ID" in script env');
    }

    await webext.cmd.sign({
      sourceDir: MKPKG_DIR,
      artifactsDir: ARTIFACTS_DIR,
      apiKey,
      apiSecret,
      id,
      channel,
    });
  }

  async function main() {
    checkBuild();
    if (OPTIONS.lint) await lintPkg();
    if (OPTIONS.run) await runPkg();
    else {
      if (OPTIONS.package) await mkPkg();
      if (OPTIONS.sign) await signPkg();
    }
  }

  await main()
})().catch(err => console.log(err));

