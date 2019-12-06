#!/bin/bash


# Get to the root project
if [[ "_" == "_${PROJECT_DIR}" ]]; then
  cd ..
  PROJECT_DIR=`pwd`
  export PROJECT_DIR
fi;

SCRIPT_DIR=${PROJECT_DIR}/scripts
JAR_DIR="${PROJECT_DIR}/.local"
JAR_VERSION="1.2019.12"
JAR_FILE="${JAR_DIR}/plantuml-${JAR_VERSION}.jar"
JAR_URL="https://repo1.maven.org/maven2/net/sourceforge/plantuml/plantuml/${JAR_VERSION}/plantuml-${JAR_VERSION}.jar"

cd ${PROJECT_DIR}

# Make sure jar exists
checkJarExists() {
  # Download the jar if need
  if  [[ ! -f "${JAR_FILE}" ]]; then
    echo "Downloading PlantUML jar file: ${JAR_URL}..."
    mkdir -p $JAR_DIR
    wget -O $JAR_FILE ${JAR_URL}
    if [[ $? -ne 0 ]]; then
        echo "ERROR - Missing PlantUML JAR file at: $JAR_FILE"
        echo " Please download it manually: ${JAR_URL}"
        echo " and save it into the directory: ${JAR_DIR}"
        exit 1
      fi
  fi;
}

generateSvg() {
  echo Converting all PlatUML files from `pwd` into SVG...
  java -jar ${JAR_FILE} -tsvg "./**.puml" -charset UTF-8 -progress -duration -nometadata
  echo "Done"
}

generatePng() {
  echo Converting all PlatUML files from `pwd` into PNG...
  java -jar ${JAR_FILE} -tpng "./**.puml" -charset UTF-8 -progress -duration -nometadata
  echo "Done"
}

showUsage() {
   echo "Usage: $0 {svg|png|version|help}"
}

case "$1" in
svg)
    checkJarExists
    generateSvg

    exit 0
;;

png)
    checkJarExists
    generatePng

    exit 0
;;

version)
    checkJarExists
    java -jar ${JAR_FILE} -version
    exit 0
;;


help)
    showUsage
    exit 0
;;

*)
    showUsage
    exit 0
esac
