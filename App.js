import { useState } from 'react';
import { View } from 'react-native';
import Bet from './components/Bet';
import BetFeed from './components/BetFeed';
import NavBar from './components/NavBar';
import NewBetModal from './components/NewBetModal';

export default function App() {
  const [showModal, setShowModal] = useState(false)
  const [bets, setBets] = useState([])

  const modalHandler = () => {
    setShowModal(!showModal)
  }
  
  console.log( )
  return (
    <View>
      <NavBar openModal={modalHandler}/>
      <NewBetModal closeModal={modalHandler} showModal={showModal} setBets={setBets}/>
      <BetFeed setBets={setBets} bets={bets}/>
    </View>
  );
}
