#!/usr/bin/env node

const { async } = require('rxjs');

(async () => {
  const path = require('path');
  const fs = require('fs');
  const stdio = require('stdio');
  const {fileURLToPath} = require('url');
  const {copyFiles, replaceTextInFile, standardizeVersionForWebExt} = require('./utils');
  const webext = await import('web-ext');

  let projectDir = path.resolve(__dirname, '../..');
  require('./env-global');

  const LOG_PREFIX = '[mkpkg-web-ext]';
  const APP_BUILD_DIR = path.join(projectDir, 'www');
  const MKPKG_DIR = path.join(projectDir, 'release', 'web-ext');
  const MKPKG_SRC_DIR = path.join(MKPKG_DIR, 'src');
  const MKPKG_RESOURCES = path.join(projectDir, 'resources', 'web-ext');
  const PACKAGE_JSON = require(path.join(projectDir, 'package.json'));
  const OPTIONS = stdio.getopt({
    publish: {
      description: "Publish the addon (sign the addon with 'listed' channel, see `--channel` on `web-ext sign --help`)",
      default: false,
    },
    keepsrc: {
      key: 'k',
      description: "Keep pkg source dir (do not re-init it)",
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

  function clean() {
    console.info(`${LOG_PREFIX} clean...`)
    if (fs.existsSync(MKPKG_DIR)) {
      fs.rmSync(MKPKG_DIR, {recursive: true});
    }
    fs.mkdirSync(MKPKG_SRC_DIR, { recursive: true });
  }

  async function copyAppBuild() {
    console.info(`${LOG_PREFIX} copy app files...`)
    if (! fs.existsSync(APP_BUILD_DIR, 'index.html')) {
      throw new Error('App is not built');
    }
  }


  async function copyResources() {
    console.info(`${LOG_PREFIX} copy web-ext resources...`)
    await copyFiles(MKPKG_RESOURCES, MKPKG_SRC_DIR);
  }

  function updateManifest() {
    console.info(`${LOG_PREFIX} update manifest.json ...`)
    const manifestPath = path.join(MKPKG_SRC_DIR, 'manifest.json');
    const manifest = JSON.parse(fs.readFileSync(manifestPath, {encoding: 'utf8'}));

    const result = {
      version: standardizeVersionForWebExt(PACKAGE_JSON.version),
      version_name: PACKAGE_JSON.version,
      ...manifest,
    }

    fs.writeFileSync(manifestPath, JSON.stringify(result, null, 2));
  }

  async function copyImg() {
    console.info(`${LOG_PREFIX} copy web-ext img...`);
    const src = path.join(projectDir, 'resources', 'logo', 'web-ext');
    const dest = path.join(MKPKG_SRC_DIR, 'img');
    fs.mkdirSync(dest);
    await copyFiles(src, dest);
  }

  async function initPkg() {
    const exist = fs.existsSync(path.join(MKPKG_SRC_DIR, 'manifest.json'));
    if (exist && OPTIONS.keepsrc) {
      console.info(`${LOG_PREFIX} skip pkgInit (keepsrc)...`);
      return;
    }
    console.info(`${LOG_PREFIX} init pkg src...`);
    clean();
    await copyAppBuild();
    await copyResources();
    updateManifest();
    await copyImg();
  }

  async function runPkg() {
    console.info(`${LOG_PREFIX} run package...`);
    const res = await webext.cmd.run({
      sourceDir: MKPKG_SRC_DIR,
    });
  }

  async function lintPkg() {
    console.info(`${LOG_PREFIX} lint package...`);
    const res = await webext.cmd.lint({
      sourceDir: MKPKG_SRC_DIR,
      output: 'text',
    }, {shouldExitProgram: false});
    if (res.summary.errors > 0) {
      throw new Error(`${LOG_PREFIX} webext lint not pass without errors`);
    }
  }

  async function mkPkg() {
    console.info(`${LOG_PREFIX} make unsigned web-ext package...`);
    await webext.cmd.build({
      sourceDir: MKPKG_SRC_DIR,
      artifactsDir: path.join(MKPKG_DIR),
      filename: '{name}-{version}-webext-unsigned.zip',
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
      sourceDir: MKPKG_SRC_DIR,
      artifactsDir: MKPKG_DIR,
      apiKey,
      apiSecret,
      id,
      channel: channel,
    });
  }

  async function main() {
    if (!OPTIONS.keepsrc) await initPkg();
    await lintPkg();
    if (OPTIONS.run) await runPkg();
    else {
      if (OPTIONS.pkg) await mkPkg();
      if (OPTIONS.sign) await signPkg();
    }
  }

  await main()
})().catch(err => console.log(err));

