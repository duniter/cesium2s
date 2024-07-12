# Cesium²

[![Latest Release](https://git.duniter.org/clients/cesium-grp/cesium2s/-/badges/release.svg)](https://git.duniter.org/clients/cesium-grp/cesium2s/-/releases)
[![pipeline status](https://git.duniter.org/clients/cesium-grp/cesium2s/badges/develop/pipeline.svg)](https://git.duniter.org/clients/cesium-grp/cesium2s/-/commits/develop)

Cesium², running on Duniter v2s (Substrate).

Cesium² use Angular, Ionic and Capacitor.

## Roadmap

Priority 1
- [ ] First membership / certification / deposit / distance
- [ ] Network scan ?

Priority 2
- [x] Login process should use a unique modal, and a method selector - issue #26
- [ ] Directory (aka wot) search using Data Pod (see [duniter-panel](https://duniter--vue-coinduf-eu.ipns.pagu.re/))
- [ ] Submit profile to Data pod (see ddd-ui)
- [ ] TX comments


## Build

### In a post-it

```bash

# Get sources
git clone git@git.duniter.org:clients/cesium-grp/cesium2s.git
cd cesium2s

# Install NodeJS v18 or v20, then deps
nvm use 18
npm install -g @ionic/cli @angular/cli @capacitor/cli
npm install

# Build and run !
npm run start
```

### Build for Android

- Init the android project:

  ```bash
  npm run android:prepare
  npm run android:init
  npm run android:sync  # or `ionic capacitor sync android`
  ```

- Compile from Android Studio:
  - Open the Android project at `<cesium2s-root>/android`
  - Run !

- Compile from the command line:

  ```bash
  npm run android:prepare
  npm run android:assemble:prod
  ```

## More documentation

You will find more devloper documentation in [doc/](https://git.duniter.org/clients/cesium-grp/cesium2s/-/tree/master/doc) directory.
