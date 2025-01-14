import ImageResizer from '@bam.tech/react-native-image-resizer';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import React, {createContext, useEffect, useState} from 'react';
import {Escola} from '../model/Escola';

export const EscolaContext = createContext({});

export const EscolaProvider = ({children}: any) => {
  const [escolas, setEscolas] = useState<Escola[]>([]);

  useEffect(() => {
    const listener = firestore()
      .collection('escolas')
      .orderBy('nome')
      .onSnapshot(snapShot => {
        console.log('getEscolaProvider');
          console.log(snapShot);
          console.log(snapShot.docs);
        if (snapShot) {
          let data: Escola[] = [];
          snapShot.forEach(doc => {
            data.push({
              uid: doc.id,
              nome: doc.data().nome,
              categoria: doc.data().categoria,
              endereco: doc.data().endereco,
              latitude: doc.data().latitude,
              longitude: doc.data().longitude,
              urlFoto: doc.data().urlFoto,
            });
          });
          setEscolas(data);
        }
      });
    return () => {
      listener();
    };
  }, []);

  const salvar = async (
    escola: Escola,
    urlDevice: string,
  ): Promise<string> => {
    try {
      if (escola.uid === '') {
        escola.uid = firestore().collection('escolas').doc().id;
      }
      if (urlDevice !== '') {
        escola.urlFoto = await sendImageToStorage(escola, urlDevice);
        if (!escola.urlFoto) {
          return 'Não foi possíve salvar a imagem. Contate o suporte técnico.'; //não deixa salvar ou atualizar se não realizar todos os passpos para enviar a imagem para o storage
        }
      }
      await firestore().collection('escolas').doc(escola.uid).set(
        {
          nome: escola.nome,
          categoria: escola.categoria,
          endereco: escola.endereco,
          latitude: escola.latitude,
          longitude: escola.longitude,
          urlFoto: escola.urlFoto,
        },
        {merge: true},
      );
      return 'ok';
    } catch (e) {
      console.error('EscolaProvider, salvar: ' + e);
      return 'Não foi possíve salvar a imagem. Por favor, contate o suporte técnico.';
    }
  };
  const excluir = async (escola: Escola) => {
    try {
      await firestore().collection('escolas').doc(escola.uid).delete();
      const pathToStorage = `imagens/${escola?.uid}/foto.png`;
      await storage().ref(pathToStorage).delete();
      return 'ok';
    } catch (e) {
      console.error('EscolaProvider, excluir: ', e);
      return 'Não foi possíve excluir a escola. Por favor, contate o suporte técnico.';
    }
  };
  async function sendImageToStorage(
    escola: Escola,
    urlDevice: string,
  ): Promise<string> {
    let imageRedimencionada = await ImageResizer.createResizedImage(
      urlDevice,
      150,
      200,
      'PNG',
      80,
    );
    const pathToStorage = `imagens/escolas/${escola?.uid}/fotoelena.png`;
    let url: string | null = '';
    const task = storage().ref(pathToStorage).putFile(imageRedimencionada?.uri);
    task.on('state_changed', taskSnapt => {
    });
    await task.then(async () => {
      url = await storage().ref(pathToStorage).getDownloadURL();
    });
    task.catch(e => {
      console.error('EscolaProvider, sendImageToStorage: ' + e);
      url = null;
    });
    return url;
  }
  return (
    <EscolaContext.Provider value={{escolas, salvar, excluir}}>
      {children}
    </EscolaContext.Provider>
  );
};
