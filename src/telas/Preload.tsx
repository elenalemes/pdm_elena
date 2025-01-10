import auth from '@react-native-firebase/auth';
import {CommonActions} from '@react-navigation/native';
import React, {useContext, useEffect, useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Dialog, Text} from 'react-native-paper';
import {AuthContext} from '../context/AuthProvider';
import {UserContext} from '../context/UserProvider';


export default function Preload({navigation}: any) {
  const {setUserAuth, recuperaCredencialdaCache, signIn} = useContext<any>(AuthContext);
  const {getUser} = useContext<any>(UserContext);
  const [dialogVisivel, setDialogVisivel] = useState(false);
  const [mensagemErro] = useState('Você precisa verificar seu email para continuar');

  async function logar() {
    const credencial = await recuperaCredencialdaCache();
    console.log('Credencial recuperada:', credencial);

    if (credencial && credencial !== 'null') {
      try {
        const mensagem = await signIn(credencial);
        console.log('Resultado do SignIn:', mensagem);

        if (mensagem === 'ok') {
          console.log('Login bem-sucedido');
          await buscaUsuario();
        } else {
          console.log('Não foi possível fazer login na sua conta. Redirecionando.');
        }
      } catch (error) {
        console.error('Erro no SignIn:', error);
      }
    } else {
      console.log('Credencial inválida. Redirecionando para a página de login.');
      irParaSignIn();
    }
  }

  function irParaSignIn() {
    setDialogVisivel(false);
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'SignIn'}],
      }),
    );
  }

  useEffect(() => {
    const unsubscriber = auth().onAuthStateChanged(async authUser => {console.log('onAuthStateChanged:', authUser);
      console.log(authUser);
      if (authUser) {
        if (authUser.emailVerified) {
          console.log('email verificado');
         await buscaUsuario();
        } else {
          console.log('email não verificado');
          setDialogVisivel(true);
        }
          } else {
          console.log('Usuário não autenticado. Redirecionando para a página de login.');
          await logar();
       }
    });

    return () => { unsubscriber();};

  },);

  async function buscaUsuario() {
    const usuario = await getUser();
    if (usuario) {
    console.log('Usuário não autenticado:', usuario);
    setUserAuth(usuario);
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'AppStack'}],

        }),
      );
      } else {
        console.log('Usuário não encontrado.');
        irParaSignIn();
  }

          return (
            <View style={styles.container}>
              <Image
                style={styles.imagem}
                source={require('../assets/images/imgview.png')}
                accessibilityLabel="logo do app"
              />
              <Dialog visible={dialogVisivel} onDismiss={irParaSignIn}>
                <Dialog.Icon icon="alert-circle-outline" size={60} />
                <Dialog.Title style={styles.textDialog}>Erro</Dialog.Title>
                <Dialog.Content>
                  <Text style={styles.textDialog} variant="bodyLarge">
                    {mensagemErro}
                  </Text>
                </Dialog.Content>
              </Dialog>
            </View>
          );
        }

        const styles = StyleSheet.create({
          container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          },
          imagem: {
            width: 250,
            height: 250,
          },
          textDialog: {
            textAlign: 'center',
          },
        });
      }
