# Building from Source

Cesium² is an Angular app built with Ionic. This article will guide you through setting up your environment and building the application.

## Installation Tools and Getting the Sources

1. Install [NVM](https://github.com/nvm-sh/nvm)

2. Install Node v18 (e.g., v18.19.0):

   ```bash
   nvm install 18.19.0
   ```

3. Install global dependencies:

   ```bash
   npm install -g @ionic/cli @angular/cli
   ```

4. Get the sources by cloning the repository:

   ```bash
   git clone ...
   ```

### Optional: Install Additional Tools

```bash
sudo apt-get install chromium-browser docker.io
```

## Web Build

### Development and Testing

1. Install the project's dependencies:

   ```bash
   cd cesium
   npm install
   ```

2. Check the environment configuration:
   - Edit the file `src/environment/environment.ts`

3. Start the app:

   ```bash
   cd cesium
   npm start
   ```

   By default, the app should be accessible at [http://localhost:4200](http://localhost:4200)

   To change the default port, use this command instead:

   ```bash
   cd cesium
   ng serve --port [port]
   ```

### Production Web Build

1. Check the environment configuration:
   - Edit the file `src/environment/environment-prod.ts`

2. Create the release:

   ```bash
   npm run build:prod
   ```

## Android Build

### Debug APK for Development and Testing

1. Install the Android build environment:

   ```bash
   cd sumaris-app/scripts
   ./env-android.sh
   ```

2. Create a debug APK file:

   ```bash
   cd sumaris-app/scripts
   ./build-android.sh
   ```

### Release APK for Production

1. Check the environment configuration:
   - Edit the file `src/environment/environment-prod.ts`

2. Create a release APK file:

   ```bash
   cd sumaris-app/scripts
   ./release-android.sh
   ```

## Useful Links

- [Ionic 4 Colors](https://www.joshmorony.com/a-primer-on-css-4-variables-for-ionic-4/)
- [Migration to Ionic 4 Tips](https://www.joshmorony.com/my-method-for-upgrading-from-ionic-3-to-ionic-4/)
- [Signing Android APK](https://www.c-sharpcorner.com/article/create-ionic-4-release-build-for-android/)

## Troubleshooting

### Error on Datasource or Angular Material Table

1. Check out the project:

   ```bash
   git clone https://github.com/e-is/angular4-material-table.git
   cd angular4-material-table
   ```

2. Build the project:

   ```bash
   npm install
   npm run build
   cp package*.json ./dist
   ```

3. Link to your local NPM repo:

   ```bash
   cd dist
   npm link
   ```

4. Use it from the Sumaris project:

   ```bash
   cd <sumaris_app_root>
   npm link angular4-material-table
   ```
