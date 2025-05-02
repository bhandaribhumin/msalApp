import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.app.msal.example',
  appName: 'Msal Example',
  webDir: 'www',
  server: {
    iosScheme: 'msauth',
    cleartext: true
  },
  ios: {
    contentInset: 'automatic',
    preferredContentMode: 'mobile',
    scheme: 'msauth',
    backgroundColor: '#ffffff'
  }
};

export default config;
