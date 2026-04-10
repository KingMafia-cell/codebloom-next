import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.nexcode.ide',
  appName: 'NexCode IDE',
  webDir: 'dist',
  server: {
    url: 'https://5646c66f-2021-4ace-8e87-e7c6075a3b65.lovableproject.com?forceHideBadge=true',
    cleartext: true
  }
};

export default config;
