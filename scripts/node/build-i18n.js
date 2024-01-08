'use strict';

const { join } = require('path');
const { readdirSync, readFileSync, copyFileSync, existsSync, rmSync, mkdirSync } = require('fs');

let pkgStr = readFileSync('./package.json', {encoding: 'UTF-8'});
const pkg = JSON.parse(pkgStr);

//console.info()

const targetI18nDir = process.argv[2] || './www/assets/i18n/';
const sourceI18nDir = './src/assets/i18n/';
if (!existsSync(targetI18nDir)) {
  mkdirSync(targetI18nDir, {recursive: true});
}

if (existsSync(targetI18nDir)) {
  console.debug('Insert version into I18n files... ' + targetI18nDir);

  // For each files
  readdirSync(sourceI18nDir)
    // Filter in src i18n files (skip renamed files)
    .filter(file => file.match(/^[a-z]{2}(-[A-Z]{2})?\.json$/))
    .forEach(file => {
      const sourceFilePath = join(sourceI18nDir, file);
      const targetFilePath = join(targetI18nDir, file.replace(/([a-z]{2}(:?-[A-Z]{2})?)\.json/, '$1-' + pkg.version + '.json'));

      // Remove existing file, if any
      if (existsSync(targetFilePath)) rmSync(targetFilePath);

      console.debug(' - Copying ' + sourceFilePath + ' -> ' + targetFilePath);
      copyFileSync(sourceFilePath, targetFilePath);
    });

  console.debug('Insert version into I18n files [OK]');

}
