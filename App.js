import { useState } from 'react';
import { View } from 'react-native';
import Bet from './components/Bet';
import BetFeed from './components/BetFeed';
import NavBar from './components/NavBar';
import NewBetModal from './components/NewBetModal';

export default function App() {
  const [showModal, setShowModal] = useState(false)
  const modalHandler = () => {
    setShowModal(!showModal)
  }

  return (
    <View>
      <NavBar openModal={modalHandler}/>
      <NewBetModal closeModal={modalHandler} showModal={showModal}/>
      <BetFeed />
    </View>
  );
}
