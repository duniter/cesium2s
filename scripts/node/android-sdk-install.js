// Load global variables
require('./env-global.js', { stdio: 'inherit' });

const shell = require('shelljs');
const path = require('path');
const fs = require('fs');
const os = require('os');


// Make sure variables are set
if (!process.env.ANDROID_SDK_ROOT) {
  throw new Error("Please set environment variable ANDROID_SDK_ROOT.");
}
if (!process.env.ANDROID_SDK_CLI_ROOT) {
  throw new Error("Please set environment variable ANDROID_SDK_CLI_ROOT.");
}

const androidSdkRoot = process.env.ANDROID_SDK_ROOT;
const androidSdkCliRoot = process.env.ANDROID_SDK_CLI_ROOT;
const androidSdkTargetVersions = ["22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33"];

// If Android SDK CLI is not installed, then install it.
if (!fs.existsSync(path.join(androidSdkCliRoot, 'bin'))) {
  console.info("--- Installing Android SDK CLI...");

  const androidSdkCliZip = `commandlinetools-linux-${process.env.ANDROID_SDK_CLI_VERSION}_latest.zip`;

  if (!fs.existsSync(androidSdkCliZip)) {
    shell.exec(`wget -kL https://dl.google.com/android/repository/${androidSdkCliZip}`);
  }

  if (!fs.existsSync(androidSdkCliRoot)) {
    shell.mkdir('-p', androidSdkCliRoot);
  }

  shell.exec(`unzip -qq ${androidSdkCliZip} -d /tmp`);
  shell.mv('/tmp/cmdline-tools/*', `${androidSdkCliRoot}`);
  shell.rm(androidSdkCliZip);

  if (!fs.existsSync(path.join(androidSdkCliRoot, 'bin'))) {
    throw new Error("Failed to install Android SDK CLI. Please make sure you have the necessary permissions.");
  }

  console.info("--- Installing Android SDK CLI [OK]");
}

// Add SDK CLI to PATH
process.env.PATH = `${androidSdkCliRoot}/bin:${process.env.PATH}`;

// Make sure licenses directory exists.
shell.mkdir('-p', path.join(androidSdkRoot, 'licenses'));

// Accept Android SDK licenses.
const licenses = {
  'android-sdk-license': '8933bad161af4178b1185d1a37fbf41ea5269c55',
  'android-googletv-license': '601085b94cd77f0b54ff86406957099ebe79c4d6',
  'google-gdk-license': '33b6a2b64607f11b759f320ef9dff4ae5c47d97a'
};

Object.entries(licenses).forEach(([license, key]) => {
  fs.writeFileSync(path.join(androidSdkRoot, 'licenses', license), key);
});

console.info("--- Installing Android SDK Tools...");

shell.exec(`yes | sdkmanager --licenses --sdk_root=${androidSdkRoot}`);

// Make sure .android/repositories.cfg exists.
shell.mkdir('-p', path.join(os.homedir(), '.android'));
fs.closeSync(fs.openSync(path.join(os.homedir(), '.android', 'repositories.cfg'), 'w'));

const runSdkManager = (arg) => {
  const result = shell.exec(`echo y | sdkmanager "${arg}" --sdk_root=${androidSdkRoot} | tee sdkmanager.log`);
  if (result.code !== 0) throw new Error("Failed to run sdkmanager using args: " + JSON.stringify(arg));
};

// Install required packages.
runSdkManager("platform-tools");
runSdkManager("extras;android;m2repository");
runSdkManager("extras;google;m2repository");
runSdkManager("cmdline-tools;latest");
runSdkManager(`build-tools;${process.env.ANDROID_SDK_VERSION}`);

// Install Android NDK
runSdkManager(`ndk;${process.env.ANDROID_NDK_VERSION}`);
runSdkManager(`ndk;22.0.7026061`);
runSdkManager(`ndk;25.2.9519653`);

// Platforms
androidSdkTargetVersions.forEach(version => {
  runSdkManager(`platforms;android-${version}`);
});

console.info("--- Installing Android SDK Tools [OK]");
