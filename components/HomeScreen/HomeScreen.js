import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { ref, onValue } from "firebase/database";
import { auth, db } from "../../firebase";
import BetFeed from "./BetFeed";
import FooterBar from "./FooterBar";
import NewBetModal from "./NewBetModal";
import SortModal from "./SortModal";
import StatBar from "./StatBar";
import { selectBets } from "../../betsSlice";
import { useSelector } from "react-redux";
import * as Haptics from "expo-haptics";

const Home = () => {
  const reduxBets = useSelector(selectBets);
  const [showBetModal, setShowBetModal] = useState(false);
  const [showSortModal, setShowSortModal] = useState(false);
  const [sortedBets, setSortedBets] = useState(sortedBets || reduxBets);
  const [resultFilter, setResultFilter] = useState(resultFilter || "all");
  const [sortMethod, setSortMethod] = useState(sortMethod || "date");
  const userId = auth.currentUser.uid;
  const fireBets = ref(db, "/bets/" + userId);

  const resultFilterHandler = (status, bets) => {
    if (status === "all") {
      return [...bets];
    }
    if (status === "winner") {
      const wonBets = [...bets].filter((bet) => bet.result === "winner");
      return wonBets;
    }
    if (status === "pending") {
      const pendingBets = [...bets].filter((bet) => bet.result === "pending");
      return pendingBets;
    }
    if (status === "loser") {
      const lostBets = [...bets].filter((bet) => bet.result === "loser");
      return lostBets;
    }
  };

  const sortMethodHandler = (status, bets) => {
    if (sortMethod === "date") {
      const sortedArray = [...sortedBets].sort((a, b) => b.date - a.date);
      return sortedArray;
    }
    if (sortMethod === "alphabetical") {
      const sortedArray = [...sortedBets].sort((a, b) => {
        return a.person.localeCompare(b.person);
      });
      return sortedArray;
    }
  };

  useEffect(() => {
    onValue(fireBets, (snapshot) => {
      const fireData = snapshot.val();
      if (fireData) {
        const arrayBets = Object.values(fireData).sort(
          (a, b) => b.date - a.date
        );
        setSortedBets(arrayBets);
      } else {
        setSortedBets([]);
      }
    });
  }, []);

  useEffect(() => {
    const filteredBets = resultFilterHandler(resultFilter, reduxBets);
    setSortedBets(filteredBets);
  }, [resultFilter, reduxBets, setSortedBets]);

  useEffect(() => {
    const filteredBets = sortMethodHandler(sortMethod, reduxBets);
    setSortedBets(filteredBets);
  }, [sortMethod, reduxBets]);

  const betModalHandler = () => {
    if (!showBetModal) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    setShowBetModal(!showBetModal);
  };

  const sortModalHandler = () => {
    if (!showSortModal) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    setShowSortModal(!showSortModal);
  };

  const sortBetsAlphabetically = () => {
    setSortMethod("alphabetical");
  };

  const sortBetsChronologically = () => {
    setSortMethod("date");
  };

  const filterAllBets = () => {
    setResultFilter("all");
  };

  const filterWonBets = () => {
    setResultFilter("winner");
  };

  const filterPendingBets = () => {
    setResultFilter("pending");
  };

  const filterLostBets = () => {
    setResultFilter("loser");
  };

  return (
    <View style={styles.app}>
      <StatBar
        bets={sortedBets}
        sortMethod={sortMethod}
        resultFilter={resultFilter}
      />
      <BetFeed bets={sortedBets} showBetModal={betModalHandler} />
      <FooterBar
        showSortModal={sortModalHandler}
        showBetModal={betModalHandler}
      />
      <NewBetModal closeModal={betModalHandler} showModal={showBetModal} />
      <SortModal
        showModal={showSortModal}
        closeModal={sortModalHandler}
        sortBetsAlphabetically={sortBetsAlphabetically}
        sortBetsChronologically={sortBetsChronologically}
        filterAllBets={filterAllBets}
        filterWonBets={filterWonBets}
        filterPendingBets={filterPendingBets}
        filterLostBets={filterLostBets}
        resultFilter={resultFilter}
        sortMethod={sortMethod}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  app: {
    backgroundColor: "black",
    flex: 1,
  },
});

export default Home;
