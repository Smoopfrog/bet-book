import { useState } from "react";
import { StyleSheet, View } from "react-native";
import BetFeed from "./components/BetFeed";
import FooterBar from "./components/FooterBar";
import NavBar from "./components/NavBar";
import NewBetModal from "./components/NewBetModal";
import SortModal from "./components/SortModal";
import StatBar from "./components/StatBar";

const dummyData = [
  {
    title: "Vikings win the superbowl",
    person: "Bobby",
    wager: "$100",
    date: "Nov 2, 2022",
    result: "winner",
    active: true,
    id: 4,
  },
  {
    title: "Raptors beat the Celtics",
    person: "Tommy",
    wager: "Steak dinner",
    date: "Apr 20, 2021",
    result: "pending",
    active: true,
    id: 3,
  },
  {
    title: "10km foot race",
    person: "Billy",
    wager: "$20",
    date: "Jul 2, 1999",
    result: "loser",
    active: true,
    id: 2,
  },
  {
    title: "Trae scores over 50 points",
    person: "Sally",
    wager: "$10",
    date: "Jan 7, 2020",
    result: "pending",
    active: false,
    id: 1,
  },
];

export default function App() {
  const [showBetModal, setShowBetModal] = useState(false);
  const [showSortModal, setShowSortModal] = useState(false);

  const [bets, setBets] = useState(dummyData);

  const betModalHandler = () => {
    setShowBetModal(!showBetModal);
  };

  const sortModalHandler = () => {
    setShowSortModal(!showSortModal);
  };

  return (
    <View style={styles.app}>
      <NavBar />
      <StatBar bets={bets} />
      <NewBetModal
        closeModal={betModalHandler}
        showModal={showBetModal}
        setBets={setBets}
      />
      <BetFeed setBets={setBets} bets={bets} />
      <SortModal showModal={showSortModal} closeModal={sortModalHandler} />
      <FooterBar showSortModal={sortModalHandler} showBetModal={betModalHandler}/>
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    backgroundColor: "white",
  },
});
