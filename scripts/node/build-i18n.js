#!/usr/bin/env node

const path = require('path');
const { readdirSync, readFileSync, copyFileSync, existsSync, rmSync, mkdirSync } = require('fs');

const projectDir = path.resolve(__dirname, '../..');

const pkgStr = readFileSync(path.join(projectDir, 'package.json'), {encoding: 'UTF-8'});
const pkg = JSON.parse(pkgStr);

const targetI18nDir = process.argv[2] || path.join(projectDir, 'www/assets/i18n');
const sourceI18nDir = path.join(projectDir, 'src/assets/i18n');
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
      const sourceFilePath = path.join(sourceI18nDir, file);
      const targetFilePath = path.join(targetI18nDir, file.replace(/([a-z]{2}(:?-[A-Z]{2})?)\.json/, '$1-' + pkg.version + '.json'));

      // Remove existing file, if any
      if (existsSync(targetFilePath)) rmSync(targetFilePath);

      console.debug(` - Copying ${sourceFilePath} -> ${targetFilePath}`);
      copyFileSync(sourceFilePath, targetFilePath);
    });

  console.debug('Insert version into I18n files [OK]');

}
