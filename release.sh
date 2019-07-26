#!/bin/bash

NODEJS_VERSION=10

### Control that the script is run on `dev` branch
branch=`git rev-parse --abbrev-ref HEAD`
if [[ ! "$branch" = "master" ]];
then
  echo ">> This script must be run under \`master\` branch"
  exit -1
fi

DIRNAME=`pwd`

### Get current version (package.json)
current=`grep -oP "version\": \"\d+.\d+.\d+((a|b)[0-9]+)?" package.json | grep -oP "\d+.\d+.\d+((a|b)[0-9]+)?"`
if [[ "_$current" == "_" ]]; then
  echo "Unable to read the current version in 'package.json'. Please check version format is: x.y.z (x and y should be an integer)."
  exit -1;
fi
echo "Current version: $current"

### Get current version for Android
currentAndroid=`grep -oP "android-versionCode=\"[0-9]+\"" config.xml | grep -oP "\d+"`
if [[ "_$currentAndroid" == "_" ]]; then
  echo "Unable to read the current Android version in 'config.xml'. Please check version format is an integer."
  exit -1;
fi
echo "Current Android version: $currentAndroid"

# Check version format
if [[ ! $2 =~ ^[0-9]+.[0-9]+.[0-9]+((a|b)[0-9]+)?$ || ! $3 =~ ^[0-9]+$ ]]; then
  echo "Wrong version format"
  echo "Usage:"
  echo " > ./release.sh [pre|rel] <version>  <android-version> <release_description>"
  echo "with:"
  echo " - pre: use for pre-release"
  echo " - rel: for full release"
  echo " - version: x.y.z"
  echo " - android-version: nnn"
  echo " - release_description: a comment on release"
  exit -1
fi

echo "new build version: $2"
echo "new build android version: $3"

case "$1" in
rel|pre)
    # Change the version in files: 'package.json' and 'config.xml'
    sed -i "s/version\": \"$current\"/version\": \"$2\"/g" package.json
    currentConfigXmlVersion=`grep -oP "version=\"\d+.\d+.\d+((a|b)[0-9]+)?\"" config.xml | grep -oP "\d+.\d+.\d+((a|b)[0-9]+)?"`
    sed -i "s/ version=\"$currentConfigXmlVersion\"/ version=\"$2\"/g" config.xml
      sed -i "s/ android-versionCode=\"$currentAndroid\"/ android-versionCode=\"$3\"/g" config.xml

    # Change version in file: 'src/assets/manifest.json'
    currentManifestJsonVersion=`grep -oP "version\": \"\d+.\d+.\d+((a|b)[0-9]+)?\"" src/assets/manifest.json | grep -oP "\d+.\d+.\d+((a|b)[0-9]+)?"`
    sed -i "s/version\": \"$currentManifestJsonVersion\"/version\": \"$2\"/g" src/assets/manifest.json

    # Bump the install.sh
    sed -i "s/echo \"v.*\" #lastest/echo \"v$2\" #lastest/g" install.sh
    ;;
*)
    echo "No task given"
    ;;
esac

# Check the Java version
JAVA_VERSION=`java -version 2>&1 | egrep "(java|openjdk) version" | awk '{print $3}' | tr -d \"`
if [[ $? -ne 0 ]]; then
  echo "No Java JRE 1.8 found in machine. This is required for Android artifacts."
  exit -1
fi
JAVA_MAJOR_VERSION=`echo ${JAVA_VERSION} | awk '{split($0, array, ".")} END{print array[1]}'`
fiJAVA_MINOR_VERSION=`echo ${JAVA_VERSION} | awk '{split($0, array, ".")} END{print array[2]}'`
if [[ ${JAVA_MAJOR_VERSION} -ne 1 ]] || [[ ${JAVA_MINOR_VERSION} -ne 8 ]]; then
  echo "Require a Java JRE in version 1.8, but found ${JAVA_VERSION}. You can override your default JAVA_HOME in 'env.sh'."
  exit -1
fi
echo "Java: $JAVA_VERSION"

# Force nodejs version
if [[ -d "${NVM_DIR}" ]]; then
    . ${NVM_DIR}/nvm.sh
    nvm use ${NODEJS_VERSION}
    if [[ $? -ne 0 ]]; then
        exit 1
    fi
else
    echo "nvm (Node version manager) not found (directory ${NVM_DIR} not found). Please install, and retry"
    exit -1
fi

echo "----------------------------------"
echo "- Compiling sources..."
echo "----------------------------------"
npm run build.prod
if [[ $? -ne 0 ]]; then
    exit 1
fi

echo "----------------------------------"
echo "- Creating web artifact..."
echo "----------------------------------"
cd $DIRNAME/www
zip -q -r cesium2.zip .
if [[ $? -ne 0 ]]; then
    exit 1
fi

echo "----------------------------------"
echo "- Compiling sources for Android platform..."
echo "----------------------------------"
# Removing previous APK..."
rm ${DIRNAME}/platforms/android/app/build/outputs/apk/release/*.apk
# Launch the build script
PROJECT_DIR=${DIRNAME}
cd ${DIRNAME}/scripts
./release-android.sh
if [[ $? -ne 0 ]]; then
    exit 1
fi

echo "----------------------------------"
echo "- Executing git push, with tag: v$2"
echo "----------------------------------"

# Commit
cd $DIRNAME
git reset HEAD
git add package.json config.xml src/assets/manifest.json install.sh
git commit -m "v$2"
git tag "v$2"
git push
if [[ $? -ne 0 ]]; then
    exit 1
fi

# Pause (if propagation is need between hosted git server and github)
sleep 10s

description="$4"
if [[ "_$description" == "_" ]]; then
    description="Release v$2"
fi

echo "**********************************"
echo "* Uploading artifacts to Github..."
echo "**********************************"

./github.sh $1 ''"$description"''
if [[ $? -ne 0 ]]; then
    exit 1
fi

echo "RELEASE finished !"

