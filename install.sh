#!/bin/bash

{ # this ensures the entire script is downloaded #

is_installed() {
  type "$1" > /dev/null 2>&1
}

PROJECT_NAME=cesium2s
PROJECT_REPO="duniter/cesium2s"
INSTALL_DIR=${1:-$(pwd)/${PROJECT_NAME}}

# --- For DEV only
INSTALL_ENV=testing

latest_version() {
  echo "2.0.0-alpha41" #lastest
}

api_release_url() {
  echo "https://api.github.com/repos/${PROJECT_REPO}/releases/tags/$(latest_version)"
}

download() {
  if is_installed "curl"; then
    curl -qkL $*
  elif is_installed "wget"; then
    # Emulate curl with wget
    ARGS=$(echo "$*" | command sed -e 's/--progress-bar /--progress=bar /' \
                           -e 's/-L //' \
                           -e 's/-I /--server-response /' \
                           -e 's/-s /-q /' \
                           -e 's/-o /-O /' \
                           -e 's/-C - /-c /')
    wget ${ARGS}
  fi
}

install_from_github() {

  local RELEASE=$(curl -XGET -i "$(api_release_url)")
  local ARCHIVE_URL=$(echo "$RELEASE" | grep -P "\"browser_download_url\": \"[^\"]+" | grep -oP "https://[a-zA-Z0-9/.-]+-web.zip" | head -n 1)
  local TMP_DIR="/tmp/${PROJECT_NAME}"
  local ARCHIVE_FILE=${TMP_DIR}/${PROJECT_NAME}-$(latest_version)-web.zip
  if [[ ! -d "$INSTALL_DIR" ]]; then
    mkdir -p "$INSTALL_DIR"
  fi
  if [[ -d "${TMP_DIR}" ]]; then
    echo "WARNING: Deleting existing temp directory [$TMP_DIR]"
    rm -rf ${TMP_DIR}
  fi
  mkdir -p "${TMP_DIR}"

  echo "Downloading [${ARCHIVE_URL}]"
  download "${ARCHIVE_URL}" -o "${ARCHIVE_FILE}" || {
    echo >&2 "Failed to download '$ARCHIVE_URL'"
    return 4
  }

  echo "Unzip to ${INSTALL_DIR}"
  unzip -o ${ARCHIVE_FILE} -d ${TMP_DIR}
  cp -rf ${TMP_DIR}/* ${INSTALL_DIR}
  rm -rf ${TMP_DIR}

  echo ""
  echo "Successfully installed at ${INSTALL_DIR}"
}

do_install() {

  if ! is_installed "curl" && ! is_installed "wget"; then
    echo "=> Neither 'curl' nor 'wget' is available. Please install one of them."
    exit 1
  fi
  if ! is_installed "unzip"; then
    echo "=> 'unzip' is not available. You will likely need to install the 'unzip' package."
    exit 1
  fi

  install_from_github
}

#
# Unsets the various functions defined
# during the execution of the install script
#
reset() {
  unset -f reset is_installed latest_version \
    api_release_url download install_from_github do_install
}

[[ "_${INSTALL_ENV}" = "_testing" ]] || do_install $1

} # this ensures the entire script is downloaded #
