import React from 'react';
import {MD3DarkTheme, MD3LightTheme, PaperProvider} from 'react-native-paper';
import {AuthProvider} from '../context/AuthProvider';
import Navigator from './Navigator';
import {EscolaProvider} from '../context/EscolaProvider';
import {UserProvider} from '../context/UserProvider';


const themeLight = {
  ...MD3LightTheme,

};

const themeDark = {
  ...MD3DarkTheme,
};

const temaDoApp = true; //TODO: passar para Context para mudar o tema do app

export default function Providers() {
  return (
    <AuthProvider>
    <UserProvider>
        <PaperProvider theme={temaDoApp ? themeLight : themeDark}>
          <Navigator />
        </PaperProvider>
          <EscolaProvider>
            <PaperProvider theme={temaDoApp ? themeLight : themeDark}>
              <Navigator />
            </PaperProvider>
          </EscolaProvider>
    </UserProvider>
  </AuthProvider>
  );
}
