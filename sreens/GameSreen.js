import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView, FlatList } from 'react-native';

import Card from '../components/Card';
import Colors from '../constants/colors';
import DefaultStyle from '../constants/styles';

const generateRandom = (min, max, exlude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exlude)
    return generateRandom(min, max, exlude)
  else
    return rndNum;
}

// const renderListItem = (numberOfRounds, value) => (
//   <View style={styles.listItem} key={value}>
//     <Text>#{numberOfRounds}</Text>
//     <Text>{value}</Text>
//   </View>
// );

const renderListItem = (listLength, itemData) => (
  <View style={styles.listItem}>
    <Text>#{listLength - itemData.index}</Text>
    <Text>{itemData.item}</Text>
  </View>
);

const GameScreen = props => {
  const initialGuess = generateRandom(1, 100, props.userChoice)
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  //const [rounds, setRounds] = useState(0);
  //const [pastGuesses, setPastGuesses] = useState([initialGuess]);
  const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const { userChoice, onGameOver } = props;

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuesses.length);
    }
  }, [currentGuess, userChoice, onGameOver])

  const nextGuessHandler = direction => {
    if ((direction === 'lower' && currentGuess < props.userChoice)
      || (direction === 'greater' && currentGuess > props.userChoice)) {
      Alert.alert("Don't lie!", "You know that this is wrong...", [{ text: "Sory", style: "cancel" }])
      return;
    }

    if (direction === "lower")
      currentHigh.current = currentGuess
    else if (direction === "greater")
      currentLow.current = currentGuess + 1;
    else
      return;

    const nextNumber = generateRandom(currentLow.current, currentHigh.current, currentGuess);
    setCurrentGuess(nextNumber);
    //setRounds(curRounds => curRounds + 1);
    setPastGuesses(curPastGuest => [nextNumber, ...curPastGuest]);

  }

  return (
    <View style={DefaultStyle.screen}>
      <Card style={styles.card}>
        <Text>Oponent's Guess</Text>
        <Text>{currentGuess}</Text>
        <View style={styles.butons}>
          <Text style={[styles.arrow, styles.rotate]} onPress={nextGuessHandler.bind(this, 'greater')}>V</Text>
          <Text style={styles.arrow} onPress={nextGuessHandler.bind(this, 'lower')}>V</Text>
        </View>
      </Card>

      <View style={styles.listContainer}>
        {/* <ScrollView contentContainerStyle={styles.list}>
          {pastGuesses.map((guess, index) => renderListItem(pastGuesses.length - index, guess))}
        </ScrollView> */}

        <FlatList
          keyExtractor={item => item}
          data={pastGuesses}
          renderItem={renderListItem.bind(this, pastGuesses.length)}
          contentContainerStyle={styles.list}
        />
      </View>
    </View>

  )
};

const styles = StyleSheet.create({
  card: {
    width: '80%'
  },

  butons: {
    width: '50%',

    justifyContent: 'space-between',
    flexDirection: 'row',

  },
  arrow: {
    fontSize: 30,
    width: '30%',
    textAlign: 'center',
    borderRadius: 50,
    backgroundColor: Colors.primary,
    color: Colors.white
  },
  rotate: {
    backgroundColor: Colors.acent,
    transform: [{ rotate: '-180deg' }]
  },

  listContainer: {
    flex: 1,
    //width: '80%',
    width: '70%',
    marginTop: '5%',
  },

  list: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    //alignItems: 'center'
  },

  listItem: {
    borderColor: Colors.black,
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    justifyContent: 'space-around',
    //width: '85%',
    width: '100%',
  }

});

export default GameScreen;