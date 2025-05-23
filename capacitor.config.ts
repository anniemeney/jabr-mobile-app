import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.jabr.app',
  appName: 'JABR',
  webDir: 'dist/public',
  ios: {
    backgroundColor: '#3700FF',
    contentInset: 'always'
  }
};

export default config;
