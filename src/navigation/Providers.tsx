import React from 'react';
import {MD3DarkTheme, MD3LightTheme, PaperProvider} from 'react-native-paper';
import {AuthProvider} from '../context/AuthProvider';
import Navigator from './Navigator';

//Ampliando o tema padrão
const themeLight = {
  ...MD3LightTheme,
  // Specify custom property
  myOwnProperty: true,
  // Specify custom property in nested object
  colors: {
    ...MD3LightTheme.colors,
    backgroundPage: '#f0f0f7',
  },
};
const themeDark = {
  ...MD3DarkTheme,
  // Especifica propriedades customizadas nos objetos aninhados
  colors: {
    ...MD3DarkTheme.colors,
    backgroundPage: '#000000',
  },
};
const temaDoApp = true; //TODO: passar para Context para mudar o tema do app

export default function Providers() {
  return (
    <AuthProvider>
      <PaperProvider theme={temaDoApp ? themeLight : themeDark}>
        <Navigator />
      </PaperProvider>
    </AuthProvider>
  );
}
