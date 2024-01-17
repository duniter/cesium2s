#!/usr/bin/env bash
# This script is meant to be run on Unix/Linux based systems
set -e

# Get to the root project
if [[ "_" == "_${PROJECT_DIR}" ]]; then
  SCRIPT_DIR=$(dirname $0)
  PROJECT_DIR=$(cd "${SCRIPT_DIR}/../.." && pwd)
  export PROJECT_DIR
fi;

BUILD_IMAGE=cesium2s/build:develop

echo "-- Building image ${BUILD_IMAGE}..."

# Create the target directory
cd "${PROJECT_DIR}" || exit 1
mkdir -p target/docker
cp -rf scripts/docker/build/* target/docker

# Build and push the CI image
docker build --cache-from "${BUILD_IMAGE}" -t "${BUILD_IMAGE}" --build-arg="BUILDKIT_INLINE_CACHE=1" -f docker/build/Dockerfile .

echo "-- Building image ${BUILD_IMAGE} [OK]"
echo

echo "-- Running image ${BUILD_IMAGE}..."
docker run --rm -v "${PROJECT_DIR}:/build" -it --entrypoint=/bin/bash ${BUILD_IMAGE}
