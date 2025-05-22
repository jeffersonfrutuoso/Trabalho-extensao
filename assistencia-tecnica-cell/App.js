import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import ReportScreen from './screens/ReportScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Registrar Serviço' }} />
        <Stack.Screen name="Relatório" component={ReportScreen} options={{ title: 'Relatório de Serviços' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}