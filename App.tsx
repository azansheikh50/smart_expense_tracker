import { ActivityIndicator, Image, Platform, StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AppProvider, useApp } from './src/AppContext';
import { AuthScreen } from './src/AuthScreen';
import { AppText, usePalette } from './src/components';
import { MainApp } from './src/MainApp';

function AppRoot() {
  const palette = usePalette();
  const { booting, user } = useApp();

  if (booting) {
    return (
      <View style={[styles.loadingCanvas, { backgroundColor: palette.canvas }]}>
        <View style={[styles.loadingCard, { backgroundColor: palette.white }]}>
          <Image
            source={require('./assets/smart-bachat-mark.png')}
            style={styles.loadingLogo}
            resizeMode="contain"
          />
          <ActivityIndicator size="large" color={palette.primary} />
          <AppText style={styles.loadingTitle}>Smart Bachat</AppText>
          <AppText muted style={styles.loadingText}>Loading your financial workspace...</AppText>
        </View>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={[styles.authCanvas, { backgroundColor: palette.canvas }]}>
        <View style={styles.authFrame}>
          <AuthScreen />
        </View>
      </View>
    );
  }

  return <MainApp />;
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <AppRoot />
      </AppProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loadingCanvas: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingCard: {
    width: 270,
    borderRadius: 26,
    padding: 32,
    alignItems: 'center',
    ...Platform.select({
      web: { boxShadow: '0 12px 24px rgba(23, 32, 58, 0.10)' },
      default: {
        shadowColor: '#17203A',
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.1,
        shadowRadius: 24,
      },
    }),
  },
  loadingTitle: {
    fontSize: 21,
    fontWeight: '900',
    marginTop: 15,
  },
  loadingLogo: {
    width: 86,
    height: 86,
    marginBottom: 14,
  },
  loadingText: {
    fontSize: 11,
    marginTop: 5,
  },
  authCanvas: {
    flex: 1,
    alignItems: 'center',
  },
  authFrame: {
    flex: 1,
    width: '100%',
    maxWidth: Platform.OS === 'web' ? 500 : undefined,
    ...Platform.select({
      web: { boxShadow: '0 0 24px rgba(23, 32, 58, 0.13)' },
    }),
  },
});
