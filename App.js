import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import theme from './config/theme';
import AuthProvider from './contexts/AuthProvider';
import Navigation from './Navigation';
import * as Font from "expo-font";

const loadFonts = async () => {
  await Font.loadAsync({
    "yu-gothic": require("./assets/fonts/yu-gothic/yugothib.ttf"),
  });
};

loadFonts();

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <AuthProvider>
        <StatusBar
          animated
          translucent
          backgroundColor="transparent"
          style="auto" />
        <Navigation />
      </AuthProvider>
    </PaperProvider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    color: "blue"
  }
});
