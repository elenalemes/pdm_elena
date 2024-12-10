@@ -1,39 +1,6 @@
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import {MD3DarkTheme, MD3LightTheme, PaperProvider} from 'react-native-paper';
import {AuthProvider} from './src/context/AuthProvider';
import Home from './src/telas/Home';
import SignIn from './src/telas/SignIn';

const Stack = createNativeStackNavigator();

//Ampliando o tema padrão
const themeLight = {
  ...MD3LightTheme,
};

const themeDark = {
  ...MD3DarkTheme,
};

const temaDoApp = true; 
import Providers from './src/navigation/Providers';

export default function App() {
  return (
    <AuthProvider>
      <PaperProvider theme={temaDoApp ? themeLight : themeDark}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="SignIn"
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="Home" component={Home} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </AuthProvider>
  );
  return <Providers />;
}
