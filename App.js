import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import BetFeed from "./components/BetFeed";
import FooterBar from "./components/FooterBar";
import NavBar from "./components/NavBar";
import NewBetModal from "./components/NewBetModal";
import SortModal from "./components/SortModal";
import StatBar from "./components/StatBar";
import StatsModal from "./components/StatsModal";

const dummyData = [
  {
    title: "Vikings win the superbowl",
    person: "Bobby",
    wager: "$100",
    date: 4263983023177,
    result: "winner",
    active: true,
    id: 4,
  },
  {
    title: "Raptors beat the Celtics",
    person: "Tommy",
    wager: "Steak dinner",
    date: 1669943023177,
    result: "pending",
    active: true,
    id: 3,
  },
  {
    title: "10km foot race",
    person: "Billy",
    wager: "$20",
    date: 1668973024177,
    result: "loser",
    active: true,
    id: 2,
  },
  {
    title: "Trae scores over 50 points",
    person: "Sally",
    wager: "$10",
    date: 1659963221177,
    result: "pending",
    active: false,
    id: 1,
  },
];

export default function App() {
  const [showBetModal, setShowBetModal] = useState(false);
  const [showSortModal, setShowSortModal] = useState(false);
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [bets, setBets] = useState(dummyData);
  const [sortedBets, setSortedBets] = useState(dummyData);
  const [activeFilter, setActiveFilter] = useState("all");
  const [sortMethod, setSortMethod] = useState("date");

  useEffect(() => {
    if (activeFilter === "all") {
      setSortedBets(bets);
    }
    if (activeFilter === "active") {
      const activeBets = bets.filter((bet) => bet.active);
      setSortedBets(activeBets);
    }
    if (activeFilter === "settled") {
      const settledBets = bets.filter((bet) => !bet.active);
      setSortedBets(settledBets);
    }
  }, [activeFilter, bets]);

  useEffect(() => {
    if (sortMethod === "date") {
      const sortedArray = sortedBets.sort((a, b) => b.date - a.date);
      setSortedBets(sortedArray);
    }
    if (sortMethod === "alphabetical") {
      const sortedArray = sortedBets.sort((a, b) => {
        return a.person.localeCompare(b.person);
      });
      setSortedBets(sortedArray);
    }
  }, [sortMethod, bets]);

  const betModalHandler = () => {
    setShowBetModal(!showBetModal);
  };

  const sortModalHandler = () => {
    setShowSortModal(!showSortModal);
  };

  const statsModalHandler = () => {
    setShowStatsModal(!showStatsModal);
  };

  const sortBetsAlphabetically = () => {
    setSortMethod("alphabetical");
  };

  const sortBetsChronologically = () => {
    setSortMethod("date");
  };

  const filterAllBets = () => {
    setActiveFilter("all");
  };

  const filterActiveBets = () => {
    setActiveFilter("active");
  };

  const filterSettledBets = () => {
    setActiveFilter("settled");
  };

  return (
    <View style={styles.app}>
      <NavBar />
      <StatBar bets={sortedBets} />
      <BetFeed setBets={setBets} bets={sortedBets} />
      <FooterBar
        showSortModal={sortModalHandler}
        showBetModal={betModalHandler}
        showStatsModal={statsModalHandler}
      />
      <NewBetModal
        closeModal={betModalHandler}
        showModal={showBetModal}
        setBets={setSortedBets}
      />
      <SortModal
        showModal={showSortModal}
        closeModal={sortModalHandler}
        sortBetsAlphabetically={sortBetsAlphabetically}
        sortBetsChronologically={sortBetsChronologically}
        filterAllBets={filterAllBets}
        filterActiveBets={filterActiveBets}
        filterSettledBets={filterSettledBets}
        activeFilter={activeFilter}
        sortMethod={sortMethod}
      />
      <StatsModal closeModal={statsModalHandler} showModal={showStatsModal} bets={bets} />
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    backgroundColor: "white",
    flex: 1,
  },
});
