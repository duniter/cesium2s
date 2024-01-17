import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.cesium',
  appName: 'Cesium2',
  webDir: 'www',
  plugins: {
    SplashScreen: {
      showSpinner: true,
      androidSpinnerStyle: 'horizontal',
      launchAutoHide: false,
    },
  },
  android: {
    buildOptions: {
      releaseType: 'APK',
    },
  },
  server: {
    cleartext: true,
  },
};

export default config;
