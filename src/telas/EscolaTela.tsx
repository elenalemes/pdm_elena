import {yupResolver} from '@hookform/resolvers/yup';
import React, {useContext, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Image, StyleSheet, View} from 'react-native';
import {
  ImageLibraryOptions,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import {Button, Dialog, Text, TextInput, useTheme} from 'react-native-paper';
import * as yup from 'yup';
import {EscolaContext} from '../context/EscolaProvider';
import {Escola} from '../model/Escola';

const requiredMessage = 'Campo obrigatório';
const schema = yup.object().shape({
  nome: yup
    .string()
    .required(requiredMessage)
    .min(2, 'O nome deve ter ao menos 2 caracteres'),
  tecnologias: yup
    .string()
    .required(requiredMessage)
    .min(2, 'A tecnologia deve ter ao menos 2 caracteres'),
});
export default function EscolaTela({route, navigation}: any) {
  const [escola, setEscola] = useState<Escola | null>(route.params.escola);
  const theme = useTheme();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<any>({
    defaultValues: {
      nome: escola?.nome,
      tecnologias: escola?.tecnologias,
      endereco: escola?.endereco,
    },
    mode: 'onSubmit',
    resolver: yupResolver(schema),
  });
  const [requisitando, setRequisitando] = useState(false);
  const [urlDevice, setUrlDevice] = useState<string | undefined>('');
  const [atualizando, setAtualizando] = useState(false);
  const [mensagem, setMensagem] = useState({tipo: '', mensagem: ''});
  const [dialogErroVisivel, setDialogErroVisivel] = useState(false);
  const [dialogExcluirVisivel, setDialogExcluirVisivel] = useState(false);
  const {salvar, excluir} = useContext<any>(EscolaContext);
  const [excluindo, setExcluindo] = useState(false);

  async function atualizar(data: Escola) {
    data.uid = escola?.uid || '';
    data.urlFoto =
    escola?.urlFoto ||
      'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50';
    data.endereco = escola?.endereco || '';
    data.latitude = escola?.latitude || 0;
    data.longitude = escola?.longitude || 0;
    setRequisitando(true);
    setAtualizando(true);
    const msg = await salvar(data, urlDevice);
    if (msg === 'ok') {
      setMensagem({
        tipo: 'ok',
        mensagem: 'Show! Operação realizada com sucesso.',
      });
      setDialogErroVisivel(true);
      setRequisitando(false);
      setAtualizando(false);
    } else {
      setMensagem({tipo: 'erro', mensagem: msg});
      setDialogErroVisivel(true);
      setRequisitando(false);
      setAtualizando(false);
    }
  }
  function avisarDaExclusaoPermanenteDoRegistro() {
    setDialogExcluirVisivel(true);
  }
  async function excluirEscola() {
    setDialogExcluirVisivel(false);
    setRequisitando(true);
    setExcluindo(true);
    const msg = await excluir(escola);
    if (msg === 'ok') {
      setDialogErroVisivel(true);
      setRequisitando(false);
      setAtualizando(false);
      setMensagem({
        tipo: 'ok',
        mensagem: 'A escola foi excluída com sucesso.',
      });
    } else {
      setMensagem({tipo: 'erro', mensagem: 'ops! algo deu errado'});
      setDialogErroVisivel(true);
      setRequisitando(false);
      setExcluindo(false);
    }
  }
  const buscaNaGaleria = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
    };
    launchImageLibrary(options, response => {
      if (response.errorCode) {
        setMensagem({tipo: 'erro', mensagem: 'Ops! Erro ao buscar a imagem.'});
      } else if (response.didCancel) {
        setMensagem({tipo: 'ok', mensagem: 'Ok, você cancelou.'});
      } else {
        const path = response.assets?.[0].uri;
        setUrlDevice(path); //armazena a uri para a imagem no device
      }
    });
  };
  function tiraFoto() {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
    };
    launchCamera(options, response => {
      if (response.errorCode) {
        setMensagem({tipo: 'erro', mensagem: 'Ops! Erro ao tirar a foto'});
      } else if (response.didCancel) {
        setMensagem({tipo: 'ok', mensagem: 'Ok, você cancelou.'});
      } else {
        const path = response.assets?.[0].uri;
        setUrlDevice(path); //armazena a uri para a imagem no device
      }
    });
  }
  return (
    <View
      style={{...styles.container, backgroundColor: theme.colors.background}}>
      <Image
        style={styles.image}
        source={
          urlDevice !== ''
            ? {uri: urlDevice}
            : escola && escola?.urlFoto !== ''
            ? {uri: escola?.urlFoto}
            : require('../assets/images/imgview.png')
        }
        loadingIndicatorSource={require('../assets/images/imgview.png')}
      />
      <View style={styles.divButtonsImage}>
        <Button
          style={styles.buttonImage}
          mode="outlined"
          icon="image"
          onPress={() => buscaNaGaleria()}>
          Galeria
        </Button>
        <Button
          style={styles.buttonImage}
          mode="outlined"
          icon="camera"
          onPress={() => tiraFoto()}>
          Foto
        </Button>
      </View>
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={styles.textinput}
            label="Nome"
            placeholder="Digite o nome da escola:"
            mode="outlined"
            autoCapitalize="words"
            returnKeyType="next"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            right={<TextInput.Icon icon="office-building" />}
          />
        )}
        name="nome"
      />
      {errors.nome && (
        <Text style={{...styles.textError, color: theme.colors.error}}>
          {errors.nome?.message?.toString()}
        </Text>
      )}
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={styles.textinput}
            label="Teconologias"
            placeholder="react, react native, expo"
            mode="outlined"
            autoCapitalize="words"
            returnKeyType="next"
            keyboardType="default"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            right={<TextInput.Icon icon="rocket-launch" />}
          />
        )}
        name="tecnologias"
      />
      {errors.tecnologias && (
        <Text style={{...styles.textError, color: theme.colors.error}}>
          {errors.tecnologias?.message?.toString()}
        </Text>
      )}
      <Button
        style={styles.button}
        mode="contained"
        onPress={handleSubmit(atualizar)}
        loading={requisitando}
        disabled={requisitando}>
        {!atualizando ? 'Salvar' : 'Salvando'}
      </Button>
      <Button
        style={styles.buttonOthers}
        mode="outlined"
        onPress={handleSubmit(avisarDaExclusaoPermanenteDoRegistro)}
        loading={requisitando}
        disabled={requisitando}>
        {!excluindo ? 'Excluir' : 'Excluindo'}
      </Button>
      <Dialog
        visible={dialogExcluirVisivel}
        onDismiss={() => {
          setDialogErroVisivel(false);
          navigation.goBack();
        }}>
        <Dialog.Icon icon={'alert-circle-outline'} size={60} />
        <Dialog.Title style={styles.textDialog}>{'Ops!'}</Dialog.Title>
        <Dialog.Content>
          <Text style={styles.textDialog} variant="bodyLarge">
            {
              'Você tem certeza que deseja excluir esse registro?\nEsta operação será irreversível.'
            }
          </Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => setDialogExcluirVisivel(false)}>
            Cancelar
          </Button>
          <Button onPress={excluirEscola}>Excluir</Button>
        </Dialog.Actions>
      </Dialog>
      <Dialog
        visible={dialogErroVisivel}
        onDismiss={() => {
          setDialogErroVisivel(false);
          if (mensagem.tipo === 'ok') {
            navigation.goBack();
          }
        }}>
        <Dialog.Icon
          icon={
            mensagem.tipo === 'ok'
              ? 'checkbox-marked-circle-outline'
              : 'alert-circle-outline'
          }
          size={60}
        />
        <Dialog.Title style={styles.textDialog}>
          {mensagem.tipo === 'ok' ? 'Informação' : 'Erro'}
        </Dialog.Title>
        <Dialog.Content>
          <Text style={styles.textDialog} variant="bodyLarge">
            {mensagem.mensagem}
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
    padding: 20,
  },
  image: {
    width: 180,
    height: 180,
    alignSelf: 'center',
    borderRadius: 180 / 2,
    marginTop: 50,
  },
  textinput: {
    width: 350,
    height: 50,
    marginTop: 20,
    backgroundColor: 'transparent',
  },
  textError: {
    width: 350,
  },
  button: {
    marginTop: 40,
    width: 350,
  },
  divButtonsImage: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
    marginBottom: 20,
  },
  buttonImage: {
    width: 180,
  },
  textDialog: {
    textAlign: 'center',
  },
  buttonOthers: {
    marginTop: 20,
    marginBottom: 30,
    width: 350,
  },
});
