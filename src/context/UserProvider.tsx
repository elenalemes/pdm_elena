import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import React, {createContext, useContext, useState} from 'react';
import {Usuario} from '../model/Usuario';
import {AuthContext} from './AuthProvider';

export const UserContext = createContext({});

export const UserProvider = ({children}: any) => {
  const {setUserAuth} = useContext<any>(AuthContext);
  const {user, setUser} = useState(null);

  async function update(usuario: Usuario): Promise<string> {
    try {

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

  async function del(uid: string): Promise<string> {
    try {
      await firestore().collection('usuarios').doc(uid).delete();
      await auth().currentUser?.delete();
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
