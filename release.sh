#!/bin/bash


### Control that the script is run on `dev` branch
branch=`git rev-parse --abbrev-ref HEAD`
if [[ ! "$branch" = "master" ]];
then
  echo ">> This script must be run under \`master\` branch"
  exit -1
fi


DIRNAME=`pwd`

 ### Releasing
current=`grep -oP "version\": \"\d+.\d+.\d+((a|b)[0-9]+)?" package.json | grep -oP "\d+.\d+.\d+((a|b)[0-9]+)?"`
echo "Current version: $current"


# force nodejs version to 8
if [ -d "$NVM_DIR" ]; then
    . $NVM_DIR/nvm.sh
    nvm use 8
else
    echo "nvm (Node version manager) not found (directory $NVM_DIR not found). Please install, and retry"
    exit -1
fi

# Check version format
if [[ ! $2 =~ ^[0-9]+.[0-9]+.[0-9]+((a|b)[0-9]+)?$ ]]; then
  echo "Wrong version format"
  echo "Usage:"
  echo " > ./release.sh [pre|rel] <version> <release_description>"
  echo "with:"
  echo " - pre: use for pre-release"
  echo " - rel: for full release"
  echo " - version: x.y.z"
  echo " - release_description: a comment on release"
  exit -1
fi

echo "new build version: $2"
case "$1" in
rel|pre)
    # Change the version in files: 'package.json' and 'config.xml'
    sed -i "s/version\": \"$current\"/version\": \"$2\"/g" package.json
    currentConfigXmlVersion=`grep -oP "version=\"\d+.\d+.\d+((a|b)[0-9]+)?\"" config.xml | grep -oP "\d+.\d+.\d+((a|b)[0-9]+)?"`
    sed -i "s/ version=\"$currentConfigXmlVersion\"/ version=\"$2\"/g" config.xml

    # Change version in file: 'www/manifest.json'
    currentManifestJsonVersion=`grep -oP "version\": \"\d+.\d+.\d+((a|b)[0-9]+)?\"" src/manifest.json | grep -oP "\d+.\d+.\d+((a|b)[0-9]+)?"`
    sed -i "s/version\": \"$currentManifestJsonVersion\"/version\": \"$2\"/g" src/manifest.json

    # Bump the install.sh
    sed -i "s/echo \"v.*\" #lastest/echo \"v$2\" #lastest/g" install.sh
    ;;
*)
    echo "No task given"
    ;;
esac

echo "----------------------------------"
echo "- Compiling sources..."
echo "----------------------------------"
npm run build.prod
if [ $? -ne 0 ]; then
    exit
fi

echo "----------------------------------"
echo "- Creating artefact..."
echo "----------------------------------"
cd $DIRNAME/dist 
zip -q -r cesium2.zip cesium2
if [ $? -ne 0 ]; then
    exit
fi

echo "----------------------------------"
echo "- Executing git push, with tag: v$2"
echo "----------------------------------"

# Commit
cd $DIRNAME
git reset HEAD
git add package.json config.xml src/manifest.json install.sh
git commit -m "v$2"
git tag "v$2"
git push
if [ $? -ne 0 ]; then
    exit
fi

# Pause (if propagation is need between hosted git server and github)
sleep 10s

description="$3"
if [[ "_$description" == "_" ]]; then
    description="Release v$2"
fi 

echo "**********************************"
echo "* Uploading artifacts to Github..."
echo "**********************************"

./github.sh $1 ''"$description"''
if [ $? -ne 0 ]; then
    exit
fi

echo "RELEASE finished !"

