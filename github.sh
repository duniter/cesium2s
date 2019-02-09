#!/bin/bash

### Control that the script is run on `dev` branch
branch=`git rev-parse --abbrev-ref HEAD`
if [[ ! "$branch" = "master" ]];
then
  echo ">> This script must be run under \`master\` branch"
  exit 1
fi

### Get version to release
current=`grep -P "version\": \"\d+.\d+.\d+(\w*)" package.json | grep -oP "\d+.\d+.\d+(\w*)"`
echo "Current version: $current"

### Get repo URL
REMOTE_URL=`git remote -v | grep -P "push" | grep -oP "(https:\/\/github.com\/|git@github.com:)[^ ]+"`
REPO=`echo $REMOTE_URL | sed "s/https:\/\/github.com\///g" | sed "s/git@github.com://g" | sed "s/.git$//"`
REPO='duniter/cesium2'
REPO_URL=https://api.github.com/repos/$REPO


###  get auth token
GITHUB_TOKEN=`cat ~/.config/cesium/.github`
if [[ "_$GITHUB_TOKEN" != "_" ]]; then
    GITHUT_AUTH="Authorization: token $GITHUB_TOKEN"
else
    echo "Unable to find github authentication token file: "
    echo " - You can create such a token at https://github.com/settings/tokens > 'Generate a new token'."
    echo " - Then copy the token and paste it in the file '~/.config/cesium/.github' using a valid token."
    exit 1
fi

case "$1" in
  del)
    result=`curl -i "$REPO_URL/releases/tags/v$current"`
    release_url=`echo "$result" | grep -P "\"url\": \"[^\"]+"  | grep -oP "$REPO_URL/releases/\d+"`
    if [[ $release_url != "" ]]; then
        echo "Deleting existing release..."
        curl -H 'Authorization: token $GITHUB_TOKEN'  -XDELETE $release_url
    fi
  ;;

  pre|rel)
    if [[ "_$2" != "_" ]]; then

      if [[ $1 = "pre" ]]; then
        prerelease="true"
      else
        prerelease="false"
      fi

      description=`echo $2`

      result=`curl -s -H ''"$GITHUT_AUTH"'' "$REPO_URL/releases/tags/v$current"`
      release_url=`echo "$result" | grep -P "\"url\": \"[^\"]+" | grep -oP "https://[A-Za-z0-9/.-]+/releases/\d+"`
      if [[ "_$release_url" != "_" ]]; then
        echo "Deleting existing release... $release_url"
        result=`curl -H ''"$GITHUT_AUTH"'' -s -XDELETE $release_url` 
        if [[ "_$result" != "_" ]]; then
            error_message=`echo "$result" | grep -P "\"message\": \"[^\"]+" | grep -oP ": \"[^\"]+\""`
            echo "Delete existing release failed with error$error_message"
            exit 1
        fi
      else 
        echo "Release not exists yet on github."
      fi

      echo "Creating new release..."
      echo " - tag: v$current"
      echo " - description: $description"
      result=`curl -H ''"$GITHUT_AUTH"'' -s $REPO_URL/releases -d '{"tag_name": "v'"$current"'","target_commitish": "master","name": "'"$current"'","body": "'"$description"'","draft": false,"prerelease": '"$prerelease"'}'`
      
      upload_url=`echo "$result" | grep -P "\"upload_url\": \"[^\"]+"  | grep -oP "https://[A-Za-z0-9/.-]+"`

      if [[ "_$upload_url" = "_" ]]; then
        echo "Failed to create new release for repo $REPO."
        echo "Server response:"
        echo "$result"
        exit 1
      fi

      ###  Sending files
      echo "Uploading files to $upload_url"
      dirname=`pwd`

      echo "Sending web build..."
      curl -s -H ''"$GITHUT_AUTH"'' -H 'Content-Type: application/zip' -T $dirname/dist/cesium2.zip $upload_url?name=cesium2-v$current-web.zip

      echo "-----"
      echo "Successfully uploading files !"
      echo " -> Release url: https://github.com/$REPO/releases/tag/v$current"
    else
      echo "Wrong arguments"
      echo "Usage:"
      echo " > ./github.sh pre|rel <release_description>"
      echo "With:"
      echo " - pre: use for pre-release"
      echo " - rel: for full release"
      exit 1
    fi
    ;;
  *)
    echo "No task given"
    ;;
esac




