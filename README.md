# cesium2s

Cesium 2, running on Substrate


Cesium 2 use Angular 14, Ionic 5 and Capacitor.


# Build

## In a post-it

```bash

# Get sources
git clone git@git.duniter.org:clients/cesium-grp/cesium2s.git
cd cesium2s

# Install NodeJS v14+, then deps
nvm use 14
npm install -g yarn @ionic/cli @angular/cli
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
