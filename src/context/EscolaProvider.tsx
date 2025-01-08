import ImageResizer from '@bam.tech/react-native-image-resizer';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import React, {createContext, useEffect, useState} from 'react';
import {Escola} from '../model/Escola';

export const EscolaContext = createContext({});

export const EscolaProvider = ({children}: any) => {
  const [escola, setEscolas] = useState<Escola[]>([]);

  useEffect(() => {
    const listener = firestore()
      .collection('escolas')
      .orderBy('nome')
      .onSnapshot(snapShot => {
        if (snapShot) {
          let data: Escola[] = [];
          snapShot.forEach(doc => {
            data.push({
              uid: doc.id,
              nome: doc.data().nome,
              tecnologias: doc.data().tecnologias,
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
        escola.uid = firestore().collection('escola').doc().id;
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
          tecnologias: escola.tecnologias,
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
  //urlDevice: qual imagem deve ser enviada via upload
  async function sendImageToStorage(
    escola: Escola,
    urlDevice: string,
  ): Promise<string> {
    //1. Redimensiona e compacta a imagem
    let imageRedimencionada = await ImageResizer.createResizedImage(
      urlDevice,
      150,
      200,
      'PNG',
      80,
    );
    //2. e prepara o path onde ela deve ser salva no storage
    const pathToStorage = `imagens/escolas/${escola?.uid}/fotoelena.png`;
    //3. Envia para o storage
    let url: string | null = ''; //local onde a imagem será salva no Storage
    const task = storage().ref(pathToStorage).putFile(imageRedimencionada?.uri);
    task.on('state_changed', taskSnapt => {
      //Para acompanhar o upload, se necessário
      // console.log(
      //   'Transf:\n' +
      //     `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      // );
    });
    //4. Busca a URL gerada pelo Storage
    await task.then(async () => {
      //se a task finalizar com sucesso, busca a url
      url = await storage().ref(pathToStorage).getDownloadURL();
    });
    //5. Pode dar zebra, então pega a exceção
    task.catch(e => {
      console.error('EscolaProvider, sendImageToStorage: ' + e);
      url = null;
    });
    return url;
  }
  return (
    <EscolaContext.Provider value={{escola, salvar, excluir}}>
      {children}
    </EscolaContext.Provider>
  );
};
