# Cesium²

Cesium², running on Duniter v2 (Substrate).

Cesium² use Angular, Ionic and Capacitor.

# Build

## In a post-it

```bash
# Get sources
git clone git@git.duniter.org:clients/cesium-grp/cesium2s.git
cd cesium2s

# Install NodeJS v18 or v20+, then deps
nvm use 18
npm install -g @ionic/cli @angular/cli @capacitor/cli
npm install

# Build and run !
npm run start
```

## Build for Android

- Init the android project :

```bash
ionic capacitor add android
npx cap sync
```

- Launch Android Studio
- Open the Android project at `<cesium2s-root>/android`
- Run !
