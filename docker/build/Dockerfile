# PREPARE STAGE
ARG IMAGE_REGISTRY=""
ARG DOCKER_IMAGE="node:18-slim"
ARG IONIC_CLI_VERSION="7.2.0"
ARG ANGULAR_CLI_VERSION="17.0.3"
FROM $IMAGE_REGISTRY$DOCKER_IMAGE AS prepare
ENV DEBIAN_FRONTEND: noninteractive
ARG CACHE_DIR=/tmp/.build-cache

# Use a cache dir
WORKDIR $CACHE_DIR

# Copy need files, to check deps
COPY package.json .
COPY scripts/ scripts/

# set version to 0.0.0 in order not to upload dependencies if only version change
RUN sed -i 's/\"version\": \".*\"/\"version\": \"0.0.0\"/g' package.json

# BUILD STAGE
FROM $IMAGE_REGISTRY$DOCKER_IMAGE AS build
ARG CACHE_DIR=/tmp/.build-cache
WORKDIR $CACHE_DIR

# Copy need files, to check deps
COPY --from=prepare $CACHE_DIR/package.json .
COPY --from=prepare $CACHE_DIR/scripts/ scripts/

# Install global dependencies
RUN npm install -g @ionic/cli@${IONIC_CLI_VERSION} @angular/cli@${ANGULAR_CLI_VERSION}

# Install global tools
RUN apt-get update && \
    apt-get -y install git zip curl python3-minimal fakeroot openjdk-17-jdk-headless \
    && rm -rf /var/lib/apt/lists/*

# Install project dependencies
RUN npm install --unsafe-perm --force --silent

RUN ls -artl

WORKDIR /build

