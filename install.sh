#!/bin/bash

{ # this ensures the entire script is downloaded #

is_installed() {
  type "$1" > /dev/null 2>&1
}

if [[ "_$1" != "_" ]]; then
  INSTALL_DIR="$1"
fi
if [ "_$INSTALL_DIR" == "_" ]; then
  DIRNAME=`pwd`
  INSTALL_DIR="$DIRNAME/cesium2"
fi

latest_version() {
  echo "v2.0.0" #lastest
}

api_release_url() {
  echo "https://api.github.com/repos/duniter/cesium2/releases/tags/$(latest_version)"
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

  local RELEASE=`curl -XGET -i $(api_release_url)`
  local ARCHIVE_URL=`echo "$RELEASE" | grep -P "\"browser_download_url\": \"[^\"]+" | grep -oP "https://[a-zA-Z0-9/.-]+-web.zip"`
  local TMP_DIR=/tmp/cesium2-install
  local ARCHIVE_FILE=${TMP_DIR}/cesium2-$(latest_version)-web.zip
  if [[ -d "$INSTALL_DIR" ]]; then
    if [[ -f "$ARCHIVE_FILE" ]]; then
      echo "WARNING: Deleting existing archive [$ARCHIVE_FILE]"
      rm ${ARCHIVE_FILE}
    fi
    
  else
    mkdir -p "$INSTALL_DIR"
  fi

  if [[ -d "${TMP_DIR}" ]]; then
    echo "WARNING: Deleting existing temp directory [$TMP_DIR]"
    rm -rf ${TMP_DIR}
  fi
  mkdir -p "$TMP_DIR"

  echo "Downloading [$ARCHIVE_URL]"
  download "$ARCHIVE_URL" -o "$ARCHIVE_FILE" || {
      echo >&2 "Failed to download '$ARCHIVE_URL'"
      return 4
    }
  echo "Unarchive to $INSTALL_DIR"
  unzip -o ${ARCHIVE_FILE} -d ${TMP_DIR}
  cp -rf ${TMP_DIR}/* ${INSTALL_DIR}
  rm -rf ${TMP_DIR}

  echo

  echo "Successfully installed at ${INSTALL_DIR}"
}

do_install() {

  if ! is_installed "curl"; then
    echo "=> curl is not available. You will likely need to install 'curl' package."
    exit 1
  fi
  if ! is_installed "unzip"; then
    echo "=> unzip is not available. You will likely need to install 'unzip' package."
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
    download install_from_github do_install
}

[[ "_$CESIUM2_ENV" = "_testing" ]] || do_install $1

} # this ensures the entire script is downloaded #
