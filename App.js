import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import NavBar from './components/NavBar';
import NewBet from './components/NewBet';

export default function App() {
  return (
    <View>
      <NavBar />
      <NewBet />
    </View>
  );
}
