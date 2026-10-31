import { DefaultTheme, ThemeProvider } from 'expo-router';
import Stack from 'expo-router/stack';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import { Brand } from '@/constants/theme';

SplashScreen.preventAutoHideAsync();

const BrandTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Brand.crimson,
    background: Brand.cream,
    card: Brand.crimson,
    text: Brand.text,
  },
};

export default function RootLayout() {
  return (
    <ThemeProvider value={BrandTheme}>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false }} />
      <AnimatedSplashOverlay />
    </ThemeProvider>
  );
}
