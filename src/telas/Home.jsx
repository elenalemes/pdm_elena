import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, useTheme } from 'react-native-paper';

export default function Home({ navigation }: any) {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('Menu')}
        style={styles.button}
      >
        Voltar para o Menu
      </Button>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('CadastrarAluno')}
        style={styles.button}
      >
        Cadastrar Aluno
      </Button>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('CadastrarTurma')}
        style={styles.button}
      >
        Cadastrar Turma
      </Button>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('ListaAlunos')}
        style={styles.button}
      >
        Ver Lista de Alunos
      </Button>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('ListaTurmas')}
        style={styles.button}
      >
        Ver Lista de Turmas
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  button: {
    marginVertical: 10,
    width: '80%',
  },
});
