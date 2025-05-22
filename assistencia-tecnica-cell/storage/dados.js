import * as FileSystem from 'expo-file-system';

const fileUri = FileSystem.documentDirectory + 'registro-servicos.json';

export const carregaRegistro = async () => {
  try {
    const fileData = await FileSystem.readAsStringAsync(fileUri);
    if (fileData) {
      return JSON.parse(fileData); 
    }
    return []; 
  } catch (error) {
    console.log('Erro ao ler os registros:', error);
    return []; 
  }
};

export const salvaRegistro = async (newRecord) => {
  const records = await carregaRegistro();
  const updatedRecords = [...records, newRecord];

  try {
    await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(updatedRecords)); 
    console.log('Registro salvo com sucesso!');
  } catch (error) {
    console.log('Erro! Tente novamente.', error);
  }
};

export const excluiRegistro = async (index) => {
  const records = await carregaRegistro();
  records.splice(index, 1);

  try {
    await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(records));
    console.log('Registro excluído com sucesso!');
  } catch (error) {
    console.log('Erro ao excluir o registro:', error);
  }
};