import React, { useContext, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { List, Divider, Dialog, Text, useTheme } from 'react-native-paper';
import { AuthContext } from '../context/AuthProvider';
import { CommonActions } from '@react-navigation/native';

export default function Menu({ navigation }: any) {
  const theme = useTheme();
  const { signOut } = useContext<any>(AuthContext);
  const [dialogVisivel, setDialogVisivel] = useState(false);

  async function sair() {
    if (await signOut()) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'AuthStack' }],
        })
      );
    } else {
      setDialogVisivel(true);
    }
  }

  return (
    <View style={styles.container}>
      <List.Section>
        <List.Item
          title="Home"
          description="Voltar para a tela inicial"
          left={() => <List.Icon color={theme.colors.primary} icon="home" />}
          onPress={() => navigation.navigate('Home')}
        />
        <Divider />
        <List.Item
          title="Sair"
          description="Finaliza sua sessão no aplicativo"
          left={() => <List.Icon color={theme.colors.primary} icon="exit-run" />}
          onPress={sair}
        />
      </List.Section>
      <Dialog
        visible={dialogVisivel}
        onDismiss={() => {
          setDialogVisivel(false);
        }}
      >
        <Dialog.Icon icon={'alert-circle-outline'} size={60} />
        <Dialog.Title style={styles.textDialog}>Ops!</Dialog.Title>
        <Dialog.Content>
          <Text style={styles.textDialog} variant="bodyLarge">
            Estamos com problemas para realizar essa operação. Por favor, contate o administrador.
          </Text>
        </Dialog.Content>
      </Dialog>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingTop: 20,
    alignItems: 'center',
  },
  textDialog: {
    textAlign: 'center',
  },
});
