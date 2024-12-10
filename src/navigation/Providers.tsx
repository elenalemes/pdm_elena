import React from 'react';
import {MD3DarkTheme, MD3LightTheme, PaperProvider} from 'react-native-paper';
import {AuthProvider} from '../context/AuthProvider';
import Navigator from './Navigator';
//Ampliando o tema padrão
const themeLight = {
  ...MD3LightTheme,
};
const themeDark = {
  ...MD3DarkTheme,
};
const temaDoApp = true;

export default function Providers() {
  <AuthProvider>
    <PaperProvider theme={temaDoApp ? themeLight : themeDark}>
      <Navigator />
    </PaperProvider>
  </AuthProvider>;
  return (
    <AuthProvider>
      <PaperProvider theme={temaDoApp ? themeLight : themeDark}>
        <Navigator />
      </PaperProvider>
    </AuthProvider>
  );
}
