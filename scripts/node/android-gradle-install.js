// Load global variables
require('./env-global.js', { stdio: 'inherit' });

const shell = require('shelljs');
const path = require('path');
const fs = require('fs');
const os = require('os');

// Make sure variables are set
if (!process.env.GRADLE_VERSION) {
  throw new Error("Please set environment variable GRADLE_VERSION.");
}
if (!process.env.GRADLE_HOME) {
  throw new Error("Please set environment variable GRADLE_HOME.");
}

const gradleZip = `gradle-${process.env.GRADLE_VERSION}-all.zip`;
const gradleDistUrl = `https://services.gradle.org/distributions/${gradleZip}`;
const gradleParentDir = path.dirname(process.env.GRADLE_HOME);

// Install Gradle
if (!shell.which('gradle') || !fs.existsSync(process.env.GRADLE_HOME)) {
  console.info(`--- Installing Gradle...  ${process.env.GRADLE_HOME}`);

  if (!fs.existsSync(gradleParentDir)) {
    shell.mkdir('-p', gradleParentDir);
  }

  if (!fs.existsSync(path.join(gradleParentDir, gradleZip))) {
    console.info(`----- Downloading Gradle...  ${gradleDistUrl}`);
    shell.exec(`wget -kL --output-document=${path.join(gradleParentDir, gradleZip)} ${gradleDistUrl}`);
  }

  unzipTarget = path.join(gradleParentDir, `gradle-${process.env.GRADLE_VERSION}`);
  if (!fs.existsSync(unzipTarget)) {
    console.info(`----- Unpacking Gradle into ${gradleParentDir}`);
    shell.exec(`unzip -qq ${path.join(gradleParentDir, gradleZip)} -d "${gradleParentDir}"`);
  }

  if (!fs.existsSync(process.env.GRADLE_HOME)) {
    shell.mv(path.join(gradleParentDir, `gradle-${process.env.GRADLE_VERSION}`), process.env.GRADLE_HOME);
  }

  if (fs.existsSync(path.join(gradleParentDir, gradleZip))) {
    shell.rm(path.join(gradleParentDir, gradleZip));
  }

  console.info(`--- Installing Gradle [OK]`);
}
