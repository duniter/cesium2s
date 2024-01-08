const fs = require('fs');
const os = require('os');
const path = require('path');
const { execSync } = require('child_process');

const projectDir = path.resolve(__dirname, '../..');

// Configure environment variables.
const versions = {
  NODE_VERSION: 18,
  ANDROID_NDK_VERSION: "22.0.7026061",
  ANDROID_SDK_VERSION: "33.0.2",
  ANDROID_SDK_CLI_VERSION: "8512546",
  ANDROID_OUTPUT_MIN_SDK_VERSION: 22,
  ANDROID_OUTPUT_MAX_SDK_VERSION: 33,
  GRADLE_VERSION: "8.5",
  JAVA_MAJOR_VERSION: 17,
  JAVA_MINOR_VERSION: 0,
}
const env = {
  ...versions,
  PROJECT_DIR: projectDir,
  NODE_OPTIONS: "--max-old-space-size=4096",
  ANDROID_SDK_ROOT: `${os.homedir()}/Android/Sdk`,
  ANDROID_ALTERNATIVE_SDK_ROOT: "/usr/lib/android-sdk",
  ANDROID_SDK_CLI_ROOT: `${os.homedir()}/Android/Sdk/cmdline-tools/${versions.ANDROID_SDK_CLI_VERSION}`,
  ANDROID_BUILD_TOOLS_ROOT: `${os.homedir()}/Android/Sdk/build-tools/${versions.ANDROID_SDK_VERSION}`,
  ANDROID_OUTPUT_APK_PREFIX: "app",
  ANDROID_OUTPUT_APK: `${projectDir}/android/app/build/outputs/apk`,
  ANDROID_OUTPUT_APK_DEBUG: `${projectDir}/android/app/build/outputs/apk/debug`,
  ANDROID_OUTPUT_APK_RELEASE: `${projectDir}/android/app/build/outputs/apk/release`,
  JAVA_HOME: null, // This could be configured later or inside '.local/env.sh' file
  GRADLE_HOME: `${os.homedir()}/.gradle/${versions.GRADLE_VERSION}`,
};

// Override with a local file, if any.
if (fs.existsSync(`${projectDir}/.local/env.json`)) {
  const localEnv = require(`${projectDir}/.local/env.json`);
  Object.assign(env, localEnv);
}

// Apply environment variables.
for (const key in env) {
  process.env[key] = env[key];
}

// Add necessary directories to the PATH.
process.env.PATH = `${process.env.JAVA_HOME}/bin:${process.env.ANDROID_SDK_CLI_ROOT}/bin:${process.env.GRADLE_HOME}/bin:${process.env.PATH}`;

// Check for Java installation.
if (!process.env.JAVA_HOME) {
  const javaCmd = execSync('which java').toString().trim();
  if (!javaCmd) {
    throw new Error(
      "Java is not installed. Please install Java, or set the JAVA_HOME environment variable."
    );
  }

  const output = execSync('java -version 2>&1').toString();
  const match = output.trim().match(/^(java|openjdk) version "(\d+(\.\d+)?)"/i);
  const javaVersion = match ? match[2] : '';
  const versionParts = javaVersion.split('.');
  const major = parseInt(versionParts[0]);
  const minor = parseInt(versionParts[1] || '0');
  if (major !== versions.JAVA_MAJOR_VERSION || minor !== versions.JAVA_MINOR_VERSION) {
    throw new Error(`Only Java version ${versions.JAVA_MAJOR_VERSION}.${versions.JAVA_MINOR_VERSION} is supported, but found ${javaVersion}.`);
  }
  if (javaCmd.endsWith('/bin/java')) {
    process.env.JAVA_HOME = javaCmd.substring(0, javaCmd.indexOf('/bin/java'));
  }
  else {
    // Assuming Java is installed under /usr/lib/jvm
    process.env.JAVA_HOME = `/usr/lib/jvm/java-${major}-openjdk`;
  }
}

// Check Android SDK
if (!fs.existsSync(process.env.ANDROID_SDK_ROOT)) {
  if (fs.existsSync(process.env.ANDROID_ALTERNATIVE_SDK_ROOT)) {
    process.env.ANDROID_SDK_ROOT = process.env.ANDROID_ALTERNATIVE_SDK_ROOT;
  }
}

// Write project environment variables to a .env file.
fs.writeFileSync(
  path.join(projectDir, '.local', 'env.sh'),
  '#!/bin/bash\n\n');
fs.appendFileSync(
  path.join(projectDir, '.local', 'env.sh'),
  Object.entries(process.env)
    .map(([key, value]) => `${key}='${value}'`)
    .join('\n')
);

// Append PATH to .env file
fs.appendFileSync(
  path.join(projectDir, '.local', 'env.sh'),
  `\n\n`
  + `export ANDROID_SDK_ROOT="${process.env.ANDROID_SDK_ROOT}"\n`
  + `export JAVA_HOME="${process.env.JAVA_HOME}"\n`
  + `export GRADLE_HOME="${process.env.GRADLE_HOME}"\n\n`
  + `export PATH="${process.env.PATH}"\n`
);
