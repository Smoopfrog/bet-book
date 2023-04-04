import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { ref, onValue } from "firebase/database";
import { db } from "../../firebase";
import BetFeed from "./BetFeed";
import FooterBar from "./FooterBar";
import NewBetModal from "./NewBetModal";
import SortModal from "./SortModal";
import StatBar from "./StatBar";
// import StatsModal from "./StatsModal";

const Home = ({ bets, setBets }) => {
  const [showBetModal, setShowBetModal] = useState(false);
  const [showSortModal, setShowSortModal] = useState(false);
  const [sortedBets, setSortedBets] = useState(bets);
  const [activeFilter, setActiveFilter] = useState("all");
  const [sortMethod, setSortMethod] = useState("date");
  const fireBets = ref(db, "/bets");

  const activeFilterHandler = (status, bets) => {
    if (status === "all") {
      return [...bets];
    }
    if (status === "active") {
      const activeBets = [...bets].filter((bet) => bet.active);
      console.log('activeBets', activeBets)
      return activeBets;
    }
    if (status === "settled") {
      const settledBets = [...bets].filter((bet) => !bet.active);
      return settledBets;
    }
  };

  const sortMethodHandler = (status, bets) => {
    if (sortMethod === "date") {
      const sortedArray = sortedBets.sort((a, b) => b.date - a.date);
      return sortedArray;
    }
    if (sortMethod === "alphabetical") {
      const sortedArray = sortedBets.sort((a, b) => {
        return a.person.localeCompare(b.person);
      });
      return sortedArray;
    }
  }
  useEffect(() => {
    onValue(fireBets, (snapshot) => {
      const fireData = snapshot.val();
      const arrayBets = Object.values(fireData).sort((a, b) => b.date - a.date);
      setBets(arrayBets);
      setSortedBets(arrayBets);
    });
  }, []);



  useEffect(() => {
    const filteredBets = activeFilterHandler(activeFilter, bets)
    setSortedBets(filteredBets)
  }, [activeFilter, bets]);

  useEffect(() => {
    const filteredBets = sortMethodHandler(sortMethod, bets)
    setSortedBets(filteredBets)
  }, [sortMethod, bets]);

  const betModalHandler = () => {
    setShowBetModal(!showBetModal);
  };

  const sortModalHandler = () => {
    setShowSortModal(!showSortModal);
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
      <StatBar bets={sortedBets} />
      <BetFeed setBets={setBets} bets={sortedBets} />
      <FooterBar
        showSortModal={sortModalHandler}
        showBetModal={betModalHandler}
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
