import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.d680b9b6776c4b0c9df79d82e2237bf3',
  appName: 'yatra-guardian',
  webDir: 'dist',
  server: {
    url: 'https://d680b9b6-776c-4b0c-9df7-9d82e2237bf3.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    Camera: {
      permissions: ['camera', 'photos']
    },
    Geolocation: {
      permissions: ['location']
    }
  }
};

export default config;
