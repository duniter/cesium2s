#!/usr/bin/env node


const execSync = require('child_process').execSync;
const shell = require('shelljs');
const path = require('path');
const fs = require('fs');
const os = require('os');
const {downloadFile, unzipFile, moveFiles, canExecute} = require("./utils");

let projectDir = path.resolve(__dirname, '../..');
require('./env-global.js');

async function installGradle(gradleVersion, gradleHome) {
  gradleVersion = gradleVersion || process.env.GRADLE_VERSION;
  gradleHome = gradleHome || process.env.GRADLE_HOME;
  // Make sure variables are set
  if (!gradleVersion) {
    throw new Error("Please set environment variable 'GRADLE_VERSION'.");
  }
  if (!gradleHome) {
    throw new Error("Please set environment variable 'GRADLE_HOME'.");
  }

  const gradleZip = `gradle-${gradleVersion}-all.zip`;
  const gradleDistUrl = `https://services.gradle.org/distributions/${gradleZip}`;
  const gradleParentDir = path.dirname(gradleHome);

  // Install Gradle
  if (!shell.which('gradle') || !fs.existsSync(gradleHome)) {
    console.info(`--- Installing Gradle...  ${gradleHome}`);

    if (!fs.existsSync(gradleParentDir)) {
      fs.mkdirSync(gradleParentDir, {recursive: true});
    }

    if (!fs.existsSync(path.join(gradleParentDir, gradleZip))) {
      console.info(`----- Downloading Gradle...  ${gradleDistUrl} into ${path.join(gradleParentDir, gradleZip)}`);
      await downloadFile(gradleDistUrl, path.join(gradleParentDir, gradleZip));
    }

    let unzipTarget = path.join(gradleParentDir, `gradle-${gradleVersion}`);
    if (!fs.existsSync(unzipTarget)) {
      console.info(`----- Unpacking Gradle into ${unzipTarget}`);
      await unzipFile(path.join(gradleParentDir, gradleZip), gradleParentDir);
    }

    if (!fs.existsSync(gradleHome)) {
      await moveFiles(path.join(gradleParentDir, `gradle-${gradleVersion}`), gradleHome);
    }

    // Remove zip file
    if (fs.existsSync(path.join(gradleParentDir, gradleZip))) {
      fs.rmSync(path.join(gradleParentDir, gradleZip));
    }

    console.info(`--- Installing Gradle [OK]`);
  }
}


async function installSdkCli(androidSdkCliRoot) {
  androidSdkCliRoot = androidSdkCliRoot || process.env.ANDROID_SDK_CLI_ROOT;
  if (!androidSdkCliRoot) {
    throw new Error("Please set environment variable 'ANDROID_SDK_CLI_ROOT'.");
  }

  // If Android SDK CLI is not installed, then install it.
  if (!fs.existsSync(path.join(androidSdkCliRoot, 'bin'))) {
    try {
      console.info(`--- Installing Android SDK CLI into '${androidSdkCliRoot}'...`);

      const androidSdkCliZip = `commandlinetools-linux-${process.env.ANDROID_SDK_CLI_VERSION}_latest.zip`;

      if (!fs.existsSync(androidSdkCliZip)) {
        console.debug(`Downloading ${androidSdkCliZip} ...`)
        await downloadFile(`https://dl.google.com/android/repository/${androidSdkCliZip}`, androidSdkCliZip);
      }

      if (!fs.existsSync(androidSdkCliRoot)) {
        fs.mkdirSync(androidSdkCliRoot, {recursive: true});
      }

      await unzipFile(androidSdkCliZip, '/tmp');
      if (!fs.existsSync(path.join('/tmp', 'cmdline-tools'))) {
        throw new Error(`Invalid ZIP content: expected to find a directory named 'cmdline-tools' inside ${androidSdkCliZip}`);
      }

      await moveFiles('/tmp/cmdline-tools', androidSdkCliRoot)

      // Check that '<CLI_ROOT>/bin/sdkmanager' exists
      const sdkManagerPath = path.join(androidSdkCliRoot, 'bin', 'sdkmanager');
      if (!fs.existsSync(sdkManagerPath)) {
        throw new Error("Failed to install Android SDK CLI. Please make sure you have the necessary permissions.");
      }

      // Check that '<CLI_ROOT>/bin/sdkmanager' is executable
      if (!canExecute(sdkManagerPath)) {
        throw new Error(`Invalid permission: missing execution permission in ${sdkManagerPath}`)
      }

      // Remove CLI zip file
      if (fs.existsSync(androidSdkCliZip)) {
        fs.rmSync(androidSdkCliZip);
      }

      console.info("--- Installing Android SDK CLI [OK]");
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  }

  // Add SDK CLI to PATH
  process.env.ANDROID_SDK_CLI_ROOT = androidSdkCliRoot;
  process.env.PATH = `${androidSdkCliRoot}/bin:${process.env.PATH}`;
}

function sdkmanager(arg, options) {
  if (!shell.which('sdkmanager')) {
    const androidSdkCliRoot = process.env.ANDROID_SDK_CLI_ROOT;

    // Add to path
    if (androidSdkCliRoot && fs.existsSync(`${path.join(androidSdkCliRoot, 'bin', 'sdkmanager')}`)) {
      process.env.PATH = `${androidSdkCliRoot}/bin:${process.env.PATH}`;
    }
    else throw new Error('Missing Android SDK CLI. Please call installSdkCli() before calling sdkmanager()');
  }

  const androidSdkRoot = options?.androidSdkRoot || process.env.ANDROID_SDK_ROOT;
  // Check if installed
  if (options?.skipIfInstalled) {
    if (shell.exec(`sdkmanager --list_installed | grep "${arg}" > /dev/null`).code === 0) {
      console.debug(` sdkmanager "${arg}" => Skipped (already installed)`);
      return;
    }
  }

  if (shell.exec(`echo y | sdkmanager "${arg}" --sdk_root=${androidSdkRoot}`).code !== 0) {
    throw new Error(`Failed to run 'sdkmanager ${arg}'`);
  }
}

async function installSdkTools(androidSdkRoot) {
  androidSdkRoot = androidSdkRoot || process.env.ANDROID_SDK_ROOT;

  // Make sure variables are set
  if (!androidSdkRoot) {
    throw new Error("Please set environment variable 'ANDROID_SDK_ROOT'.");
  }

  try {

    console.info("--- Installing Android SDK Tools...");

    // Make sure licenses directory exists.
    fs.mkdirSync(path.join(androidSdkRoot, 'licenses'), { recursive: true });

    // Accept Android SDK licenses.
    const licenses = {
      'android-sdk-license': '8933bad161af4178b1185d1a37fbf41ea5269c55',
      'android-googletv-license': '601085b94cd77f0b54ff86406957099ebe79c4d6',
      'google-gdk-license': '33b6a2b64607f11b759f320ef9dff4ae5c47d97a'
    };

    Object.entries(licenses).forEach(([license, key]) => {
      fs.writeFileSync(path.join(androidSdkRoot, 'licenses', license), key);
    });

    if (shell.exec(`yes | sdkmanager --licenses --sdk_root=${androidSdkRoot} > /dev/null`).code !== 0) {
      throw new Error('Error while accepting Android SDK licenses');
    }

    // Make sure .android/repositories.cfg exists.
    fs.mkdirSync(path.join(os.homedir(), '.android'), { recursive: true });
    fs.closeSync(fs.openSync(path.join(os.homedir(), '.android', 'repositories.cfg'), 'w'));

    // Install required packages.
    sdkmanager("platform-tools", {skipIfInstalled: true, androidSdkRoot});
    sdkmanager("extras;android;m2repository", {skipIfInstalled: true, androidSdkRoot});
    sdkmanager("extras;google;m2repository", {skipIfInstalled: true, androidSdkRoot});
    sdkmanager("cmdline-tools;latest", {skipIfInstalled: true, androidSdkRoot});
    sdkmanager(`build-tools;${process.env.ANDROID_SDK_VERSION}`, {skipIfInstalled: true, androidSdkRoot})
    sdkmanager(`platforms;android-${process.env.ANDROID_OUTPUT_MAX_SDK_VERSION}`, {skipIfInstalled: true, androidSdkRoot});

    // Install Android NDK
    if (process.env.ANDROID_NDK_VERSION) {
      sdkmanager(`ndk;${process.env.ANDROID_NDK_VERSION}`, {skipIfInstalled: true, androidSdkRoot});
    }

    //["22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34"]
    //  .forEach(version => sdkmanager(`platforms;android-${version}`, {skipIfInstalled: true, androidSdkRoot}));

    console.info("--- Installing Android SDK Tools [OK]");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}


async function main() {
  // Set up environment variables.
  let gradleVersion = process.env.GRADLE_VERSION;
  let gradleHome = process.env.GRADLE_HOME;
  let javaHome = process.env.JAVA_HOME;
  let gradleOpts = process.env.GRADLE_OPTS;
  let androidSdkRoot = process.env.ANDROID_SDK_ROOT;
  let androidCliVersion = process.env.ANDROID_SDK_CLI_VERSION;
  let androidCliRoot = process.env.ANDROID_SDK_CLI_ROOT || `${androidSdkRoot}/cmdline-tools/${androidCliVersion}`;
  let androidBuildToolsRoot = process.env.ANDROID_BUILD_TOOLS_ROOT;
  let nodesOptions = process.env.NODE_OPTIONS;
  let nodeVersion = process.versions.node;

  let androidConfig = {
    root: projectDir,
    node: `version ${nodeVersion} - options: ${nodesOptions || 'none'}`,
    androidSdk: androidSdkRoot,
    androidCli: androidCliRoot,
    buildTools: `${androidBuildToolsRoot}`,
    gradle: `${gradleHome} - options: ${gradleOpts || 'none'}`,
    java: javaHome
  };

  console.info('--- Preparing Android environment... using:', androidConfig);

  // Check if Android SDK CLI tools is installed.
  if (!fs.existsSync(androidConfig.androidCli) || !fs.existsSync(androidConfig.buildTools)) {

    // Run CLI + SDK installation
    try {
      await installSdkCli(androidCliRoot);
      await installSdkTools(androidSdkRoot);
    }
    catch(err) {
      console.error(err);
      process.exit(1);
    }

    // Verify build tools
    if (!fs.existsSync(androidConfig.buildTools)) {
      console.error(`ERROR: Failed to locate Android build tools at: ${androidConfig.buildTools}`);
      process.exit(1);
    }

  } else {
    process.env.PATH = `${androidConfig.androidCli}:${androidConfig.buildTools}:${process.env.PATH}`;
  }

  // Check if Gradle is installed.
  if (!fs.existsSync(gradleHome)) {
    await installGradle(gradleVersion, gradleHome);
  }

  // Check if the Android platform is prepared.
  if (!fs.existsSync(`${projectDir}/android`)){
    console.info("----- Adding Capacitor Android platform...");
    execSync(
      `npx cap add android`,
      { stdio: 'inherit' }
    );
  }

  // Create file 'android/local.properties'
  if (!fs.existsSync(path.join(projectDir, 'android', 'local.properties'))) {
    fs.writeFileSync(
      path.join(projectDir, 'android', 'local.properties'),
      `sdk.dir=${androidConfig.androidSdk}`);
  }

  // Create file 'android/app/release-signing.properties'
  if (!fs.existsSync(path.join(projectDir, 'android', 'app', 'release-signing.properties'))) {
    console.warn(`WARNING: Missing file 'android/app/release-signing.properties' - This is required for APK release signing`);
  }

  // Check key store file exists
  const keystoreFile = process.env.KEYSTORE_FILE || `${projectDir}/android/app/Cesium.keystore`;
  if (fs.existsSync(keystoreFile)) {
    process.env.KEYSTORE_FILE = keystoreFile;
  }
  else {
    console.error(`ERROR: Keystore file node found at '${keystoreFile}'`);
    process.exit(1);
  }

  console.log("--- Preparing Android environment [OK]");
}

main();
