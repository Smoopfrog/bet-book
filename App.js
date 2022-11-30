import { useState } from "react";
import { StyleSheet, View } from "react-native";
import BetFeed from "./components/BetFeed";
import NavBar from "./components/NavBar";
import NewBetModal from "./components/NewBetModal";
import StatBar from "./components/StatBar";

const dummyData = [
  {
    title: "Vikings win the superbowl",
    person: "Bobby",
    wager: "$100",
    date: "Nov 2, 2022",
    result: 'winner',
    active: true,
    id: 4,
  },
  {
    title: "Raptors beat the Celtics",
    person: "Tommy",
    wager: "Steak dinner",
    date: "Apr 20, 2021",
    result: 'pending',
    active: true,
    id: 3,
  },
  {
    title: "10km foot race",
    person: "Billy",
    wager: "$20",
    date: "Jul 2, 1999",
    result: 'loser',
    active: true,
    id: 2,
  },
  {
    title: "Trae scores over 50 points",
    person: "Sally",
    wager: "$10",
    date: "Jan 7, 2020",
    result: 'pending',
    active: false,
    id: 1,
  },
];

export default function App() {
  const [showModal, setShowModal] = useState(false);
  const [bets, setBets] = useState(dummyData);

  const modalHandler = () => {
    setShowModal(!showModal);
  };

  return (
    <View style={styles.app}>
      <NavBar openModal={modalHandler} />
      <StatBar bets={bets} />
      <NewBetModal
        closeModal={modalHandler}
        showModal={showModal}
        setBets={setBets}
        bets={bets}
      />
      <BetFeed setBets={setBets} bets={bets} />
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    backgroundColor: "#323232",
  },
});
