import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Tela Home</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'red',
    borderWidth: 1,
  },
  texto: {
    color: 'red',
    fontSize: 30,
  },
});
