import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { ref, onValue } from "firebase/database";
import { db } from "../../firebase";
import BetFeed from "./BetFeed";
import FooterBar from "./FooterBar";
import NewBetModal from "./NewBetModal";
import SortModal from "./SortModal";
import StatBar from "./StatBar";
import StatsModal from "./StatsModal";

const Home = ({ bets, setBets }) => {
  const [showBetModal, setShowBetModal] = useState(false);
  const [showSortModal, setShowSortModal] = useState(false);
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [sortedBets, setSortedBets] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [sortMethod, setSortMethod] = useState("date");
  const fireBets = ref(db, "/bets");
  console.log('bets', bets);
  useEffect(() => {
    onValue(fireBets, (snapshot) => {
      const fireData = snapshot.val();
      const arrayBets = Object.values(fireData);
      // console.log(arrayBets);
      setBets(arrayBets);
      setSortedBets(arrayBets);
    });
  }, []);

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
      {/* <NavBar /> */}
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
      <StatsModal
        closeModal={statsModalHandler}
        showModal={showStatsModal}
        bets={bets}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  app: {
    backgroundColor: "white",
    flex: 1,
  },
});

export default Home;
