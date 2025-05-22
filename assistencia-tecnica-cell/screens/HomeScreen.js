import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { salvaRegistro } from '../storage/dados';

const  HomeScreen = ({ navigation }) => {
  const [nome, setNome] = useState('');
  const [servico, setServico] = useState('');
  const [telefone, setTelefone] = useState('');
  const [date, setDate] = useState('');

  const formataData = (input) => {
    let dataFormatada = input.replace(/[^\d]/g, '');

    if (dataFormatada.length > 2) {
      dataFormatada = dataFormatada.slice(0, 2) + '/' + dataFormatada.slice(2);
    }
    if (dataFormatada.length > 5) {
      dataFormatada = dataFormatada.slice(0, 5) + '/' + dataFormatada.slice(5, 9);
    }

    return dataFormatada.slice(0, 10); 
  };


  const registro = async () => {
    
    if (!nome || !servico || !date || !/^\d{2}\/\d{2}\/\d{4}$/.test(date)) {
      Alert.alert("Erro", "Por favor, preencha todos os campos obrigatórios (Nome, Serviço e Data).");
      return;
    }

    const newRecord = {
      nome,
      servico,
      date,
      telefone: telefone || 'Não preenchido',
    };

    await salvaRegistro(newRecord); 
    setNome('');
    setServico('');
    setTelefone('');
    setDate('');
    Alert.alert('Registro realizado com sucesso!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome do cliente"
        value={nome}
        onChangeText={setNome}
      />
      <Text style={styles.label}>Serviço</Text>
      <TextInput
        style={styles.input}
        placeholder="ex:troca de tela"
        value={servico}
        onChangeText={setServico}
      />
      <Text style={styles.label}>contato</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex:Telefone"
        value={telefone}
        onChangeText={setTelefone}
        keyboardType="phone-pad"
      />
      <Text style={styles.label}>data Serviço</Text>
      <TextInput
        style={styles.input}
        placeholder="Data (dd/mm/aaaa)"
        value={date}
        onChangeText={(text) => setDate(formataData(text))}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.botao} onPress={registro}>
        <Text style={styles.textoBotao}>Registrar Serviço</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Relatório')}>
        <Text style={styles.textoBotao}>Ver Relatório</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '##D8DFF8',
  },

  label: {
    textAlign: "center",
    fontSize: 25,
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 15,
    borderWidth: 1,
    borderColor: '#474747',
    borderRadius: 15,
    fontSize: 18,
  },
  botao: {
    backgroundColor: 'black',
    paddingVertical: 30,
    paddingHorizontal: 35,
    borderRadius: 200,
    marginVertical: 10,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoBotao: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textShadowColor: 'black', 
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
  },
});

export default HomeScreen;