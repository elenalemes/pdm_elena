import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'react-native';
import Home from '../telas/Home';
import Preload from '../telas/Preload';
import SingIn from '../telas/SingIn';
import Perfil from '../telas/Perfil';
import RecuperarSenha from '../telas/RecuperarSenha';
import { Usuario } from '../model/usuario';
import {
  useTheme,
  Icon
} from 'react-native-paper';
import SignUp from '../telas/SingUp';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = () => (
  <Stack.Navigator
    initialRouteName="Preload"
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen component={Home} name="Home" />
    <Stack.Screen component={Perfil} name="Perfil" />
    <Stack.Screen component={Preload} name="Preload" />
    <Stack.Screen component={RecuperarSenha} name="RecuperarSenha" />
    <Stack.Screen component={SingIn} name="SignIn" />
    <Stack.Screen component={SignUp} name="SignUp" />
  </Stack.Navigator>
);
const ProfessorIcon = (props: { color: string }) => (
  <Icon source="account-group" color={props.color} size={20} />
);

const MenuIcon = (props: { color: string }) => (
  <Icon source="menu" color={props.color} size={20} />
);

const AppStack = () => {
  const theme = useTheme();
  return (
    <Tab.Navigator
      initialRouteName="Usuario"
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen
        component={Usuario}
        name="Professor"
        options={{
          tabBarLabel: 'Professor',
          tabBarIcon: ({ color }: { color: string }) => <ProfessorIcon color={color} />,
        }}
      />
      <Tab.Screen
        component={Perfil}
        name="Perfil"
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color }: { color: string }) => <MenuIcon color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};
};

export default function Navigator() {
  const theme = useTheme();
  return (
    <NavigationContainer
      theme={{
        colors: {
          primary: theme.colors.primary,
          background: theme.colors.background,
          card: theme.colors.background,
          text: theme.colors.primary,
          border: theme.colors.primary,
          notification: theme.colors.error,
        },
        dark: theme.dark,
      }}>
      <StatusBar backgroundColor={theme.colors.primary} />
      <Stack.Navigator
        initialRouteName="AuthStack"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen component={AuthStack} name="AuthStack" />
        <Stack.Screen component={AppStack} name="AppStack" />
        <Stack.Screen
          component={Perfil}
          name="Professor"
          options={{
            presentation: 'modal',
          }}
        />
        <Stack.Screen component={Perfil} name="Perfil" />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

