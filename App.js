import { useState } from 'react';
import { View } from 'react-native';
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
    </View>
  );
}
