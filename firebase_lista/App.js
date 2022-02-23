import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, ActivityIndicator, ScrollView } from 'react-native';
import firebase from './src/firebaseConnection';
import Listagem from './src/Listagem';

export default function App() {
  const [cargo, setCargo] = useState('');
  const [nome, setNome] = useState('');
  const [pessoas, setPessoas] = useState([]);
  const [load, setLoad] = useState(true);

  useEffect(() =>{
    async function dados() {
      // await firebase.database().ref('tipo').set('Vendedor');

      //remover um nó
      //await firebase.database().ref('tipo').remove();

      // await firebase.database().ref('Pessoas').child(3).set({
      //   nome: 'testeee',
      //   idade: '50'  
      // });

      // await firebase.database().ref('Pessoas').child(3).update({
      //   nome : 'jose algusto'
      // })

      await firebase.database().ref('Pessoas').on('value', (snapshot) => {
        setPessoas([]);
        snapshot.forEach((childItem) => {
          let data = {
            key: childItem.key,
            nome: childItem.val().nome,
            cargo: childItem.val().cargo
          }
          setPessoas(oldArray => [...oldArray,data].reverse());

        })
        setLoad(false);

      })
    }
    dados();
  },[]);

  async function cadastrar(){
    if (nome !== '' & cargo !== '') {
      let usuarios = await firebase.database().ref('Pessoas');
      let chave = usuarios.push().key;


      usuarios.child(chave).set({
        nome : nome,
        cargo : cargo
      });
      alert('Cadastrado com sucesso! ');
      setCargo('');
      setNome('');
    }
  }
  return (
    <View> 
        <ScrollView > 
        <View style={styles.container}>
             
          
          <StatusBar translucent={false} />
              <View style={styles.card}>
                  <Text style={styles.texto}>Nome</Text>
                  <TextInput 
                  style={styles.inputTexto}
                  underlineColorAndroid='transparent'
                  onChangeText={(texto)=>setNome(texto)}
                  value={nome}
                  /> 
                  <Text style={styles.texto}>Cargo</Text>
                  <TextInput 
                  style={styles.inputTexto}
                  underlineColorAndroid='transparent'
                  onChangeText={(texto)=>setCargo(texto)}
                  value={cargo}
                  /> 
                  <Button  
                  title='Novo Funcionario'
                  onPress={cadastrar}
                  />
              </View>
              <View style={styles.card}>
                {load ?
                (
                  <ActivityIndicator color='#121212' size={45} />
                ) : (
                  <FlatList 
                  keyExtractor={item => item.key}
                  data={pessoas}
                  renderItem={({item})=>(<Listagem data={item} />)}
                  />
                )}        
              </View>
             
        </View>
        </ScrollView>  
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    height: '100%',
  },
  inputTexto:{
    padding: 8,
    marginBottom : 10,
    borderWidth:1,
    borderColor : '#d3d3d3',  
    height: 48,  
    fontSize: 18,
    backgroundColor: '#FFF'
  },
  card: {
    backgroundColor: '#c0c0c0',
    shadowColor:'#363636',
    shadowOpacity: 1,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowRadius: 3,
    padding:  10,    
    borderRadius: 10,
    marginTop:10,
    elevation:5,
  },  
  texto:{
    fontSize:20,
  },
});
