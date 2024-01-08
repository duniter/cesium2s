const execSync = require('child_process').execSync;
const fs = require('fs');
const path = require('path');

let projectDir = path.resolve(__dirname, '../..');

require('./env-global.js');

// Set up environment variables.
let gradleHome = process.env.GRADLE_HOME;
let javaHome = process.env.JAVA_HOME;
let gradleOpts = process.env.GRADLE_OPTS;
let androidSdkRoot = process.env.ANDROID_SDK_ROOT;
let androidBuildToolsRoot = process.env.ANDROID_BUILD_TOOLS_ROOT;
let nodesOptions = process.env.NODE_OPTIONS;
let nodeVersion = process.versions.node;

let androidConfig = {
  root: projectDir,
  node: `version ${nodeVersion} - options: ${nodesOptions || 'none'}`,
  androidSdk: androidSdkRoot,
  androidCli: `${androidSdkRoot}/tools/bin`,
  buildTools: `${androidBuildToolsRoot}`,
  gradle: `${gradleHome} - options: ${gradleOpts || 'none'}`,
  java: javaHome
};

console.info('--- Preparing Android environment... using:', androidConfig);

// Check if Android SDK CLI tools is installed.
if (!fs.existsSync(androidConfig.androidCli) || !fs.existsSync(androidConfig.buildTools)) {

  // Run installation
  require('./android-sdk-install.js', { stdio: 'inherit' });

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
  require('./android-gradle-install.js', { stdio: 'inherit' } );
}

// Check if the Android platform is prepared.
if (!fs.existsSync(`${projectDir}/android`)){
  console.info("----- Adding Capacitor Android platform...");
  execSync(
    `npx cap add android`,
    { stdio: 'inherit' }
  );
}

// Copy android local files.
if (fs.existsSync(`${projectDir}/.local/android`) && fs.existsSync(`${projectDir}/.local/android/release-signing.properties`)) {
  console.info(`Copying files from directory '${projectDir}/.local/android' into '${projectDir}/android/app'...`);
  execSync(`cp -rf ${projectDir}/.local/android/* ${projectDir}/android/app`, { stdio: 'inherit' });
} else {
  console.warn(`No directory '${projectDir}/.local/android' found. Please create it, with a file 'release-signing.properties' for release signing`);
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
