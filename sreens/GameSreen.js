import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';

import Card from '../components/Card';
import Colors from '../constants/colors';

const generateRandom = (min, max, exlude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exlude)
    return generateRandom(min, max, exlude)
  else
    return rndNum;
}

const GameScreen = props => {
  const [currentGuess, setCurrentGuess] = useState(generateRandom(1, 100, props.userChoice));
  const [rounds, setRounds] = useState(0);

  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const { userChoice, onGameOver } = props;

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(rounds);
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
      currentLow.current = currentGuess;
    else
      return;

    const nextNumber = generateRandom(currentLow.current, currentHigh.current, currentGuess);
    setCurrentGuess(nextNumber);
    setRounds(curRounds => curRounds + 1);
  }

  return (
    <View style={styles.screen}>
      <Card style={styles.card}>
        <Text>Oponent's Guess</Text>
        <Text>{currentGuess}</Text>
        <View style={styles.butons}>
          <Text style={[styles.arrow, styles.rotate]} onPress={nextGuessHandler.bind(this, 'greater')}>V</Text>
          <Text style={styles.arrow} onPress={nextGuessHandler.bind(this, 'lower')}>V</Text>
        </View>
      </Card>
    </View>

  )
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
  },

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
  }

});

export default GameScreen;