import { useState } from "react";
import { View } from "react-native";
import BetFeed from "./components/BetFeed";
import NavBar from "./components/NavBar";
import NewBetModal from "./components/NewBetModal";

const dummyData = [
  {
    title: "Vikings win the superbowl",
    person: "Bobby",
    wager: "$100",
    date: "Nov 2, 2022",
  },
  {
    title: "Raptors beat the Celtics",
    person: "Tommy",
    wager: "Steak dinner",
    date: "Apr 20, 2021",
  },
  {
    title: "10km foot race",
    person: "Billy",
    wager: "$20",
    date: "Jul 2, 1999",
  },
  {
    title: "Trae scores over 50 points",
    person: "Sally",
    wager: "$10",
    date: "Jan 7, 2020",
  },
];

export default function App() {
  const [showModal, setShowModal] = useState(false);
  const [bets, setBets] = useState(dummyData);

  const modalHandler = () => {
    setShowModal(!showModal);
  };

  return (
    <View>
      <NavBar openModal={modalHandler} />
      <NewBetModal
        closeModal={modalHandler}
        showModal={showModal}
        setBets={setBets}
      />
      <BetFeed setBets={setBets} bets={bets} />
    </View>
  );
}
