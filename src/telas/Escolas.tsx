import React, {useContext} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Avatar, Card, FAB, List, useTheme} from 'react-native-paper';
import {EscolaContext} from '../context/EscolaProvider';
import {Escola} from '../model/Escola';

export default function Escolas({navigation}: any) {
  const theme = useTheme();
  const {escolas} = useContext<any>(EscolaContext);

  const irParaTelaEscola = (escola: Escola | null) => {
    navigation.navigate('TelaEscola', {
      escola,
    });
  };

  return (
    <View
      style={{...styles.container, backgroundColor: theme.colors.background}}>
      <List.Section
        style={{...styles.list, backgroundColor: theme.colors.background}}>
        <List.Subheader style={styles.subhearder}>
          Lista de Escolas
        </List.Subheader>
        <ScrollView>
          {escolas.map((escola: Escola, key: number) => (
            <Card
              key={key}
              style={{...styles.card, borderColor: theme.colors.secondary}}
              onPress={() => irParaTelaEscola(escola)}>
              <Card.Title
                title={escola.nome}
                subtitle={escola.tecnologias}
                left={() => (
                  <Avatar.Image size={40} source={{uri: escola.urlFoto}} />
                )}
              />
            </Card>
          ))}
        </ScrollView>
      </List.Section>
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => irParaTelaEscola(null)}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  subhearder: {
    fontSize: 20,
    alignSelf: 'center',
  },
  list: {
    width: '95%',
  },
  card: {
    height: 100,
    width: '100%',
    borderWidth: 1,
    marginBottom: 10,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
