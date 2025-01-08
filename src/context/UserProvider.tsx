import ImageResizer from '@bam.tech/react-native-image-resizer';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import React, {createContext, useContext, useState} from 'react';
import {Usuario} from '../model/Usuario';
import {AuthContext} from './AuthProvider';

export const UserContext = createContext({});

export const UserProvider = ({children}: any) => {
  const {setUserAuth} = useContext<any>(AuthContext);
  const {user, setUser} = useState(null);

  async function update(usuario: Usuario, urlDevice: string): Promise<string> {
    try {

      if (urlDevice !== '') {
        usuario.urlFoto = await sendImageToStorage(usuario, urlDevice);
        if (!usuario.urlFoto) {
          return 'Erro ao atualizar a foto do usuário. Contate o suporte.';
          //não deixa salvar ou atualizar se não realizar todos os passos para enviar a imagem para o storage
        }
      }

      const usuarioFirestore = {
        nome: usuario.nome,
        email: usuario.email,
        urlFoto: usuario.urlFoto,
        perfil: usuario.perfil,
      };

      await firestore()
        .collection('usuarios')
        .doc(auth().currentUser?.uid)
        .set(usuarioFirestore, {merge: true});
      const usuarioAtualizado = await getUser();
      setUser(usuarioAtualizado);
      setUserAuth(usuarioAtualizado);
      return 'ok';
    } catch (e) {
      console.error(e);
      return 'Erro ao atualizar o usuário. Contate o suporte.';
    }
  }

  async function sendImageToStorage(
    usuario: Usuario,
    urlDevice: string,
  ): Promise<string> {
    let imageRedimencionada = await ImageResizer.createResizedImage(
      urlDevice,
      150,
      200,
      'PNG',
      80,
    );
    const pathToStorage = `imagens/usuarios/${
      auth().currentUser?.uid
    }/foto.png`;
    let url: string | null = '';
    const task = storage().ref(pathToStorage).putFile(imageRedimencionada?.uri);
    await task.then(async () => {
      url = await storage().ref(pathToStorage).getDownloadURL();
    });
    task.catch(e => {
      console.error('UserProvider, sendImageToStorage: ' + e);
      url = null;
      throw new Error('Erro ao enviar a imagem para o storage.');
    });
    return url;
  }

  async function del(uid: string): Promise<string> {
    try {
      await firestore().collection('usuarios').doc(uid).delete();
      await auth().currentUser?.delete();
      const pathToStorage = `imagens/${user?.uid}/foto.png`;
      await storage().ref(pathToStorage).delete();
      return 'ok';
    } catch (e) {
      console.error(e);
      return 'Erro ao excluir a conta. Contate o suporte.';
    }
  }

  async function getUser() {
    try {
      let doc = await firestore().collection('usuarios').doc(auth().currentUser?.uid).get();
      if (doc.exists) {
        const userData = doc.data();
        if (userData) {
          userData.codusuario = auth().currentUser?.uid;
          setUser(userData);
          return userData;
        }
      }
      return null;
    } catch (e) {
      return null;
    }
  }

  return (
    <UserContext.Provider value={{user, setUser, update, del, getUser}}>
      {children}
    </UserContext.Provider>
  );
};
