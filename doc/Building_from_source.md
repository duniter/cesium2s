# Building from source

Technologies: Cesium2 is an Ionic 4 + Angular 7 App.

This article will explain how to install your environment, then build the application.

## Installation tools, and get sources

1. Install [Node.js](https://nodejs.org/en/) (v10)
  - Recommendation: use NVM (Node Version Manager), a simple tool to mange many versions of Node.js.
    ```
      wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash
      nvm install 10
    ```

    Then to enable the right version of Node.js:  
    ```
    mvn use 10
    ```

2. Install global dependency:
    ```bash
    npm install -g ionic cordova 
    npm install -g cordova-res native-run  # -> optional 
    ```

3. Clone the repo: `git clone ...`
4. Install project dependencies
    ```bash
    cd cesium2
    npm install
    ```
   
5. Install and start a Duniter node, with GraphQL API (GVA) enable:

 - See this documentation: https://git.duniter.org/nodes/typescript/modules/gva-api/

 - After installation, make sure the GraphQL query editor is accessible at [http://localhost:15000/graphql](http://localhost:15000/graphql)
 
 - If you choose another port than `15000`, please update the file `proxy.conf.json`


### Install additional tools (optional)
```bash
sudo apt-get install chromium-browser docker.io
```

## Web build

### Web build for development and test

1. Check environment configuration:

   - Edit the file `src/environment/environment.ts`
   
2. Start the app
    ```bash
    cd cesium2
    npm start
    ```
   By default, the app should be accessible at [http://localhost:4200](http://localhost:4200)
   
   To change the default port, use this command instead: 
    ```bash
    cd cesium2
    ng serve --port [port] --proxy-config proxy.conf.json
    ```

### Web build for production

1. Check environment configuration:

   - Edit the file `src/environment/environment-prod.ts`

2. Build a release
    ```
    npm run build --prod --release
    ```

## Android build 

### Build APK for development and test

- Use Ionic script:
    ```bash
    ionic build android
    ```
  
- Or use script:  
    ```bash
    cd scripts
    ./build-android.sh
    ```

### Build APK for production

- Use Ionic script:
    ```bash
    ionic build android --prod --release
    ```
  
- Or use script:  
    ```bash
    cd scripts
    ./release-android.sh
    ```

## Useful links

- Ionic 4 colors: https://www.joshmorony.com/a-primer-on-css-4-variables-for-ionic-4/
- Migration to Ionic 4 tips: https://www.joshmorony.com/my-method-for-upgrading-from-ionic-3-to-ionic-4/
- Signing Android APK: See doc at 
   https://www.c-sharpcorner.com/article/create-ionic-4-release-build-for-android/

