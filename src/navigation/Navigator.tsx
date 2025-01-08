/* eslint-disable react/no-unstable-nested-components */
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon, useTheme } from 'react-native-paper';
import Preload from '../telas/Preload';
import Menu from '../telas/Menu';
import PerfilTela from '../telas/PerfilTela';
import EsqueceuSenha from '../telas/EsqueceuSenha';
import { StatusBar } from 'react-native';
import Escolas from '../telas/Escolas';
import EscolaTela from '../telas/EscolaTela';
import SignUp from '../telas/SignUp';
import SignIn from '../telas/SignIn';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = () => (
  <Stack.Navigator
    initialRouteName="Preload"
    screenOptions={{
      headerShown: false,
    }}>
   <Stack.Screen component={Preload} name="Preload" />
    <Stack.Screen component={SignIn} name="SignIn" />
    <Stack.Screen component={SignUp} name="SignUp" />
    <Stack.Screen component={EsqueceuSenha} name="EsqueceuSenha" />
  </Stack.Navigator>
);

const AppStack = () => {
  const theme = useTheme();
  return (
    <Tab.Navigator
      initialRouteName="Escolas"
      screenOptions={() => ({
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarStyle: {backgroundColor: theme.colors.surface},
      })}>
      <Tab.Screen
        component={Escolas}
        name="Cadastro Escolas"
        options={{
          tabBarLabel: 'Professor',
          tabBarIcon: () => <Icon source="assistant-photo" color={theme.colors.primary} size={20} />,
        }}
      />
      <Tab.Screen
        component={Menu}
        name="Menu do app"
        options={{
          tabBarLabel: 'Menu do app',
          tabBarIcon: () => <Icon source="house" color={theme.colors.primary} size={20} />,
        }}
      />
      <Tab.Screen
        component={PerfilTela}
        name="Perfil do usuário"
        options={{
          tabBarLabel: 'Perfil do usuário',
            tabBarIcon: () => <Icon source="account-edit" color={theme.colors.primary} size={20} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default function Navigator() {
  const theme = useTheme();
  return (
    <NavigationContainer>
      <StatusBar
        backgroundColor={
          theme.dark ? theme.colors.surface : theme.colors.primary
        }
      />
      <Stack.Navigator
        initialRouteName="AuthStack"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen component={AuthStack} name="AuthStack" />
        <Stack.Screen component={AppStack} name="AppStack" />
        <Stack.Screen component={EsqueceuSenha} name="AlterarSenha" />
        <Stack.Screen component={EscolaTela} name="EscolaTela" />
        <Stack.Screen component={PerfilTela} name="PerfilTela" />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
