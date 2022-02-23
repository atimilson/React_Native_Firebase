import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from './src/firebaseConnection'

export default function App() {
  const [nome, setNome] = useState('Carregando...');
  const [idade, setIdade] = useState('Carregando...');

  useEffect(() =>{
    async function dados() {
      await firebase.database().ref('Pessoas/1').on('value',(snapshot) => {
        setNome(snapshot.val().nome);
        setIdade(snapshot.val().idade);
      });
    }
    dados();
  },[])
  return (
    <View style={styles.container}>
      <Text>Ola {nome}</Text>
      <Text>idade {idade}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
