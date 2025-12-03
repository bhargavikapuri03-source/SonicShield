import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'com.sonicshield.app',
    appName: 'SonicShield',
    webDir: 'build',
    server: {
        androidScheme: 'https'
    },
    plugins: {
        SplashScreen: {
            launchShowDuration: 2000,
            backgroundColor: "#0f172a",
            showSpinner: false
        },
        Geolocation: {
            requestPermissions: true
        }
    }
};

export default config;
