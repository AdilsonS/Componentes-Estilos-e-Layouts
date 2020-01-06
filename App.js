import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Header from "./components/Header";
import StartGameScreen from './sreens/StartGameScreen';
import GameScreen from './sreens/GameSreen';
import GameOverScreen from './sreens/GameOverScreen';

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);

  const startGameHandler = selectedNumber => {
    setUserNumber(selectedNumber);
    setGuessRounds(0);
  }

  const GameOverHandler = numOfRounds => {
    setGuessRounds(numOfRounds);
  };

  const RestartGameHandler = () => {
    setGuessRounds(0);
    setUserNumber(NaN);
  };

  let content = <StartGameScreen onStartGame={startGameHandler} />
  if (userNumber && guessRounds <= 0)
    content = <GameScreen userChoice={userNumber} onGameOver={GameOverHandler} />
  else if (guessRounds > 0)
    content = <GameOverScreen onRestartGame={RestartGameHandler} />

  return (
    <View style={styles.screen}>
      <Header title="Guess a Number" />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  }
});
