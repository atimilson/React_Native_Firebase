import React from 'react';
import { View, Text, StyleSheet  } from 'react-native';

export default function Listagem({data}) {
    return(
        <View style={styles.listagem}>
            <Text style={styles.texto}>{data.nome}</Text>
            <Text style={styles.texto}>{data.cargo}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    listagem:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:10,
        marginBottom: 5,
        padding: 5,
        backgroundColor: '#121212'
    },
    texto:{
        fontSize: 15,
        color: '#FFF'
    }
});