require('./android-prepare.js', { stdio: 'inherit' });

let { execSync } = require('child_process');
let fs = require('fs');
let path = require('path');

let projectDir = path.resolve(__dirname, '../..');
let androidRoot = process.env.ANDROID_SDK_ROOT || path.resolve(process.env.HOME, 'Android/Sdk');
let androidSdkVersion = process.env.ANDROID_SDK_VERSION || '33.0.2';
let androidBuildToolsRoot = process.env.ANDROID_BUILD_TOOLS_ROOT || `${androidRoot}/build-tools/${androidSdkVersion}`;

let keystoreFile = process.env.KEYSTORE_FILE;
let keyAlias = process.env.KEYSTORE_ALIAS || 'Cesium';
let keyPwd = process.env.KEYSTORE_PWD;

let apkPrefix = 'app';
let apkDir = `${projectDir}/android/${apkPrefix}/build/outputs/apk`;
let apkReleaseDir = `${apkDir}/release`;
let apkUnsigned = `${apkReleaseDir}/${apkPrefix}-release-unsigned.apk`;
let apkSigned = `${apkReleaseDir}/${apkPrefix}-release-signed.apk`;

let minSdkVersion = 22;
let maxSdkVersion = 33;

// Check if files exist
if (!fs.existsSync(keystoreFile)) {
  console.error(`ERROR: Keystore file not found: ${keystoreFile}`);
  process.exit(1);
}
// Check if key alias and key pwd exists
if (!keyAlias || !keyPwd) {
  console.error(`ERROR: Key alias or password are missing. Please define 'KEYSTORE_ALIAS' and 'KEYSTORE_PWD' in '${projectDir}.local/env.json'`);
  process.exit(1);
}

if (!fs.existsSync(apkUnsigned)) {
  console.error(`ERROR: APK file not found: ${apkUnsigned}`);
  process.exit(1);
}

// Delete the previous signed APK file if it exists
if (fs.existsSync(apkSigned)) {
  fs.unlinkSync(apkSigned);
}

// Run zipalign
let zipalignCommand = `zipalign -v 4 ${apkUnsigned} ${apkSigned}`;
execSync(zipalignCommand, { stdio: 'inherit', cwd: androidBuildToolsRoot });

// Run apksigner
let apksignerCommand = `apksigner sign --ks ${keystoreFile} --ks-pass "pass:${keyPwd}" --ks-key-alias ${keyAlias} ` +
  `--min-sdk-version ${minSdkVersion} --max-sdk-version ${maxSdkVersion} ${apkSigned}`;
execSync(apksignerCommand, { stdio: 'inherit', cwd: androidBuildToolsRoot });

// Verify the APK signature
let verifyCommand = `apksigner verify --verbose --print-certs ${apkSigned}`;
execSync(verifyCommand, { stdio: 'inherit', cwd: androidBuildToolsRoot });

console.info(`Successfully generated signed APK at: ${apkSigned}`);
