import auth from '@react-native-firebase/auth';
import {CommonActions} from '@react-navigation/native';
import React, {useContext, useEffect} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {AuthContext} from '../context/AuthProvider';
import {UserContext} from '../context/UserProvider';

export default function Preload({navigation}: any) {
  const {setUserAuth, recuperaCredencialdaCache, signIn} =
    useContext<any>(AuthContext);
  const {getUser} = useContext<any>(UserContext);

  useEffect(() => {
    const unsubscriber = auth().onAuthStateChanged(authUser => {
    const unsubscriber = auth().onAuthStateChanged(async authUser => {
      console.log('Preload');
      console.log(authUser);
      if (authUser) {
        setUserAuth(authUser);
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'AppStack'}],
          }),
        );
        if (authUser.emailVerified) {
          await buscaUsuario();
        } else {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'SignIn'}],
            }),
          );
        }
      } else {
        logar(); //se não, tenta logar com as credenciais armazenadas
      }
@@ -35,18 +42,11 @@ export default function Preload({navigation}: any) {

  async function logar() {
    const credencial = await recuperaCredencialdaCache();
    console.log('logar');
    console.log(credencial);
    if (credencial !== 'null') {
      //se tem credenciais armazenadas tenta logar
      const mensagem = await signIn(credencial);
      if (mensagem === 'ok') {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'AppStack'}],
          }),
        );
        await buscaUsuario();
      } else {
        //se não consegue logar vai para a tela de login
        navigation.dispatch(
@@ -59,6 +59,22 @@ export default function Preload({navigation}: any) {
    }
  }

  async function buscaUsuario() {
    const usuario = await getUser();
    const credencial = await recuperaCredencialdaCache();
    if (usuario) {
      usuario.senha = credencial?.senha;
      console.log(usuario);
      setUserAuth(usuario);
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'AppStack'}],
        }),
      );
    }
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.imagem}
        source={require('../assets/images/logo512.png')}
        accessibilityLabel="logo do app"
      />
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
});


// export default function Preload({navigation}: any) {
//   const theme = useTheme();
//   const {setUserAuth} = useContext<any>(AuthContext);
//   // const {getUser} = useContext<any>(UserContext);
//   const [dialogVisivel, setDialogVisivel] = useState(false);
//   const [mensagemErro] = useState('Você precisa verificar seu email para continuar');


//   useEffect(() => {
//     //liga o listener e fica escutando o estado da autenticação no serviço Auth do Firebase
//     const unsubscribe = auth().onAuthStateChanged(user => {
//       if (user) {
//         console.log('Usuário logado');
//         console.log(user);
//         navigation.dispatch(
//           CommonActions.reset({
//             index: 0,
//             routes: [{name: 'AppStack'}],
//           }),
//         );
//       } else {
//         setDialogVisivel(true);
//       }
//     });

//     //ao desmontar
//     return () => {
//       unsubscribe(); //avisa o serviço Auth do Firebase para desligar o listener
//     };
//   }, [navigation]);

//   function irParaSignIn() {
//     setDialogVisivel(false);
//     navigation.dispatch(
//       CommonActions.reset({
//         index: 0,
//         routes: [{name: 'SignIn'}],
//       }),
//     );
//   }

//   return (
//     <View style={{...styles.container, backgroundColor: theme.colors.background}}>
//       <Image
//         style={styles.imagem}
//         source={require('../assets/images/imgview.png')}
//         accessibilityLabel="logo do app"
//       />
//       <Dialog visible={dialogVisivel} onDismiss={irParaSignIn}>
//         <Dialog.Icon icon="alert-circle-outline" size={60} />
//         <Dialog.Title style={styles.textDialog}>Erro</Dialog.Title>
//         <Dialog.Content>
//           <Text style={styles.textDialog} variant="bodyLarge">
//             {mensagemErro}
//           </Text>
//         </Dialog.Content>
//       </Dialog>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   imagem: {
//     width: 250,
//     height: 250,
//   },
//   textDialog: {
//     textAlign: 'center',
//   },
// });

