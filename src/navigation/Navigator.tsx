
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useTheme, Icon} from 'react-native-paper';
import Preload from '../telas/Preload';
import Menu from '../telas/Menu';
import SingIn from '../telas/SingIn';
import Perfil from '../telas/Perfil';
import SingUp from '../telas/SingUp';
import RecuperarSenha from '../telas/RecuperarSenha';
import Professor from '../telas/Professor';
import { StatusBar } from 'react-native';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = () => (
  <Stack.Navigator
    initialRouteName="Preload"
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen component={Preload} name="Preload" />
    <Stack.Screen component={SingIn} name="SignIn" />
    <Stack.Screen component={SingUp} name="SignUp" />
    <Stack.Screen component={RecuperarSenha} name="RecuperarSenha" />
  </Stack.Navigator>
);

const AppStack = () => {
  const theme = useTheme();
  return (
    <Tab.Navigator
      initialRouteName="Menu"
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen
        component={Professor}
        name="Professor"
        options={{
          tabBarLabel: 'Professor',
          tabBarIcon: () => <Icon source="account-group" color={theme.colors.primary} size={20}/>,
        }}
      />
      <Tab.Screen
        component={Menu}
        name="Menu"
        options={{
          tabBarLabel: 'Menu',
          tabBarIcon: () => <Icon source="menu" color={theme.colors.primary} size={20} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default function Navigator() {
  const theme = useTheme();

  return (
    <NavigationContainer>
      <>
        <StatusBar backgroundColor={theme.colors.primary} />
        <Stack.Navigator
          initialRouteName="AuthStack"
          screenOptions={{
            headerShown: false,
          }}>

          <Stack.Screen component={AuthStack} name="AuthStack" />
          <Stack.Screen component={AppStack} name="AppStack" />
          <Stack.Screen
            component={Professor}
            name="Professor"
            options={{
              presentation: 'modal',
            }}
          />
          <Stack.Screen component={Perfil} name="Perfil" />
        </Stack.Navigator>
      </>
    </NavigationContainer>
  );
}


