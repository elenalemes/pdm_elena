import { yupResolver } from '@hookform/resolvers/yup';
import React, { useContext, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { AuthContext } from '../context/AuthProvider';
import { Credencial } from '../model/types';
import { CommonActions } from '@react-navigation/native';

import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import {
  Button,
  Dialog,
  Divider,
  Text,
  TextInput,
  useTheme,
} from 'react-native-paper';

const requiredMessage = 'Campo obrigatório';

const schema = yup
  .object()
  .shape({
    email: yup
      .string()
      .required(requiredMessage)
      .matches(/\S+@\S+\.\S+/, 'Email inválido'),
    senha: yup
      .string()
      .required(requiredMessage)
      .matches(
        /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/,
        'A senha deve conter ao menos uma letra maiúscula, uma letra minúscula, um numeral, um caractere especial e um total de 8 caracteres',
      ),
  })
  .required();

export default function SignIn({ navigation }: any) {
  const theme = useTheme();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    defaultValues: {
      email: '',
      senha: '',
    },
    mode: 'onSubmit',
    resolver: yupResolver(schema),
  });

  const [exibirSenha, setExibirSenha] = useState(true);
  const [logando, setLogando] = useState(false);
  const [dialogVisivel, setDialogVisivel] = useState(false);
  const [mensagemErro, setMensagemErro] = useState('');
  const { signIn } = useContext<any>(AuthContext);

  async function onSubmit(data: Credencial) {
    console.log('Dados submetidos:', data);
    setLogando(true);
    const mensagem = await signIn(data);
    if (mensagem === 'ok') {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'AppStack' }],
        }),
      );
    } else {
      setMensagemErro(mensagem);
      setDialogVisivel(true);
    }
   setLogando(false);
  }

  return (
    <SafeAreaView
      style={{
        ...styles.container,
        backgroundColor: theme.colors.background,
      }}
    >
      <ScrollView>
        <Image
          style={styles.image}
          source={require('../assets/images/imgview.png')}
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.textinput}
              label="Email"
              placeholder="Digite seu email"
              mode="outlined"
              autoCapitalize="none"
              returnKeyType="next"
              keyboardType="email-address"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              right={<TextInput.Icon icon="email" />}
            />
          )}
          name="email"
        />
        {errors.email && (
          <Text style={{ ...styles.textError, color: theme.colors.error }}>
            {errors.email?.message?.toString()}
          </Text>
        )}

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.textinput}
              label="Senha"
              placeholder="Digite sua senha"
              mode="outlined"
              autoCapitalize="none"
              returnKeyType="go"
              secureTextEntry={exibirSenha}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              right={
                <TextInput.Icon
                  icon={exibirSenha ? 'eye-off' : 'eye'}
                  onPress={() => setExibirSenha((prev) => !prev)}
                />
              }
            />
          )}
          name="senha"
        />
        {errors.senha && (
          <Text style={{ ...styles.textError, color: theme.colors.error }}>
            {errors.senha?.message?.toString()}
          </Text>
        )}

        <Text
          style={{ ...styles.textEsqueceuSenha, color: theme.colors.tertiary }}
          onPress={() => navigation.navigate('EsqueceuSenha')}
        >
          Esqueceu sua senha?
        </Text>

        <Button
          style={styles.button}
          mode="contained"
          onPress={handleSubmit(onSubmit)}
          loading={logando}
          disabled={logando}
        >
          {!logando ? 'Entrar' : 'Entrando'}
        </Button>

        <Divider />
        <View style={styles.divCadastro}>
          <Text>Não tem uma conta?</Text>
          <Text
            style={{ ...styles.textCadastro, color: theme.colors.tertiary }}
            onPress={() => navigation.navigate('SignUp')}
          >
            Cadastre-se.
          </Text>
        </View>
      </ScrollView>

      <Dialog visible={dialogVisivel} onDismiss={() => setDialogVisivel(false)}>
        <Dialog.Icon icon="alert-circle-outline" size={60} />
        <Dialog.Title style={styles.textDialog}>Erro</Dialog.Title>
        <Dialog.Content>
          <Text style={styles.textDialog}>{mensagemErro}</Text>
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
    borderRadius: 100,
    marginTop: 100,
    marginBottom: 40,
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
  button: {
    marginTop: 20,
  },
  textCadastro: {
    fontWeight: 'bold',
  },
  textError: {
    marginTop: 5,
  },
  divCadastro: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textDialog: {
    textAlign: 'center',
  },
});
