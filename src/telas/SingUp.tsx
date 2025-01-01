import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View, Alert, Image, ScrollView} from 'react-native';
import {Text, Button, Dialog, TextInput, useTheme, RadioButton} from 'react-native-paper';
import {yupResolver} from '@hookform/resolvers/yup';
import {Controller, useForm} from 'react-hook-form';
import {SafeAreaView} from 'react-native-safe-area-context';
import * as yup from 'yup';
import {AuthContext} from '../context/AuthProvider';
import {UsuarioAuth} from '../model/types';
import {Perfil} from '../model/Perfil';

const requiredMessage = 'Campo obrigatório';

const schema = yup
  .object()
  .shape({
    nome: yup.string().required(requiredMessage).min(3, 'O nome deve ter ao menos 3 caracteres'),
    email: yup.string().required(requiredMessage).matches(/\S+@\S+\.\S+/, 'Email inválido'),
    senha: yup
      .string()
      .required(requiredMessage)
      .matches(
        /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/,
        'A senha deve conter ao menos uma letra maiúscula, uma letra minúscula, um númeral, um caractere especial e um total de 8 caracteres',
      ),
    confirmar_senha: yup
      .string()
      .required(requiredMessage)
      .equals([yup.ref('senha')], 'As senhas não conferem'),
  })
  .required();

export default function SignUp({navigation}: any) {
  const theme = useTheme();
  const {
    control,
    handleSubmit,
    register,
    formState: {errors},
  } = useForm<any>({
    defaultValues: {
      nome: '',
      email: '',
      senha: '',
      confirmar_senha: '',
    },
    mode: 'onSubmit',
    resolver: yupResolver(schema),
  });
  const [mensagemErro, setMensagemErro] = useState('');
  const [exibirSenha, setExibirSenha] = useState(true);
  const [requisitando, setRequisitando] = useState(false);
  const [dialogVisivel, setDialogVisivel] = useState(false);
  const [mensagem, setMensagem] = useState({tipo: '', mensagem: ''});
  const {signUp} = useContext<any>(AuthContext);
  const [checked, setChecked] = React.useState<Perfil>(Perfil.Professor);

  useEffect(() => {
    register('nome');
    register('email');
    register('senha');
    register('confirmar_senha');
  }, [register]);
  async function onSubmit(data: UsuarioAuth) {
    console.log(JSON.stringify(data));
    if (data.senha !== data.confirmar_senha) {
      setMensagemErro('As senhas não conferem');
      setDialogVisivel(true);
      return;
    }
    setCadastrando(true);
    // const mensagem = await signIn(data);
    // if (mensagem === 'ok') {
    //   navigation.dispatch(
    //     CommonActions.reset({
    //       index: 0,
    //       routes: [{name: 'AppStack'}],
    //     }),
    //   );
    // } else {
    //   setMensagemErro(mensagem);
    //   setDialogVisivel(true);
    // setLogando(true);
    // }
  }
  <SafeAreaView
      style={{
        ...styles.container,
        backgroundColor: theme.colors.background,
      }}>
      <ScrollView>
        <>
          <Image
            style={styles.image}
            source={require('../assets/images/logo512.png')}
          />
          <View style={styles.divButtonsImage}>
            <Button
              style={styles.buttonImage}
              mode="outlined"
              icon="image"
              onPress={() => Alert.alert('Vamos ver isso em upload de imagens')}
              loading={abrindo}>
              Galeria
            </Button>
            <Button
              style={styles.buttonImage}
              mode="outlined"
              icon="camera"
              onPress={() => Alert.alert('Vamos ver isso em upload de imagens')}
              loading={abrindo}>
              Foto
            </Button>
          </View>
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                style={styles.textinput}
                label="Nome"
                placeholder="Digite seu nome completo"
                mode="outlined"
                autoCapitalize="words"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                right={<TextInput.Icon icon="smart-card" />}
              />
            )}
            name="nome"
          />
          {errors.email && (
            <Text style={{...styles.textError, color: theme.colors.error}}>
              {errors.nome?.message?.toString()}
            </Text>
          )}
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                style={styles.textinput}
                label="Email"
                placeholder="Digite seu email"
                mode="outlined"
                autoCapitalize="none"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                right={<TextInput.Icon icon="email" />}
              />
            )}
            name="email"
          />
          {errors.email && (
            <Text style={{...styles.textError, color: theme.colors.error}}>
              {errors.email?.message?.toString()}
            </Text>
          )}
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                style={styles.textinput}
                label="Senha"
                placeholder="Digite sua senha"
                mode="outlined"
                autoCapitalize="none"
                secureTextEntry={exibirSenha}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                right={
                  <TextInput.Icon
                    icon="eye"
                    onPress={() => setExibirSenha(previus => !previus)}
                  />
                }
              />
            )}
            name="senha"
          />
          {errors.senha && (
            <Text style={{...styles.textError, color: theme.colors.error}}>
              {errors.senha?.message?.toString()}
            </Text>
          )}
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                style={styles.textinput}
                label="Confirmar senha"
                placeholder="Confirme sua senha"
                mode="outlined"
                autoCapitalize="none"
                secureTextEntry={exibirSenha}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                right={
                  <TextInput.Icon
                    icon="eye"
                    onPress={() => setExibirSenha(previus => !previus)}
                  />
                }
              />
            )}
            name="confirmar_senha"
          />
          {errors.confirmar_senha && (
            <Text style={{...styles.textError, color: theme.colors.error}}>
              {errors.confirmar_senha?.message?.toString()}
            </Text>
          )}
          <Button
            style={styles.button}
            mode="contained"
            onPress={handleSubmit(onSubmit)}
            loading={cadastrando}
            disabled={cadastrando}>
            {!cadastrando ? 'Cadastrar' : 'Cadastrando'}
          </Button>
        </>
      </ScrollView>
      <Dialog visible={dialogVisivel} onDismiss={() => setDialogVisivel(false)}>
        <Dialog.Icon icon="alert-circle-outline" size={60} />
        <Dialog.Title style={styles.textDialog}>Erro</Dialog.Title>
        <Dialog.Content>
          <Text style={styles.textDialog} variant="bodyLarge">
            {mensagemErro}
          </Text>
        </Dialog.Content>
      </Dialog>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    borderRadius: 200 / 2,
    marginTop: 50,
  },
  textinput: {
    width: 350,
    height: 50,
    marginTop: 20,
    backgroundColor: 'transparent',
  },
  textEsqueceuSenha: {
    alignSelf: 'flex-end',
    marginTop: 20,
  },
  textCadastro: {},
  textError: {
    width: 350,
  },
  button: {
    marginTop: 50,
    marginBottom: 30,
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
});
