import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import * as Font from 'expo-font';
import { AppLoading } from 'expo';

import Header from "./components/Header";
import StartGameScreen from './sreens/StartGameScreen';
import GameScreen from './sreens/GameSreen';
import GameOverScreen from './sreens/GameOverScreen';

import DefaltStyle from "./constants/styles";


const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
  });
};

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded)
    return <AppLoading
      startAsync={fetchFonts}
      onFinish={() => setDataLoaded(true)}
      onError={(erro) => console.log(erro)} />


  const startGameHandler = selectedNumber => {
    setUserNumber(selectedNumber);
  }

  const GameOverHandler = numOfRounds => {
    setGuessRounds(numOfRounds);
  };

  const RestartGameHandler = () => {
    setGuessRounds(0);
    setUserNumber(null);
  };

  let content = <StartGameScreen onStartGame={startGameHandler} />
  if (userNumber && guessRounds <= 0)
    content = <GameScreen userChoice={userNumber} onGameOver={GameOverHandler} />
  else if (guessRounds > 0)
    content = <GameOverScreen onRestartGame={RestartGameHandler} guessRounds={guessRounds} userNumber={userNumber} />

  return (
    <View style={DefaltStyle.screen}>
      <Header title="Guess a Number" />
      <GameOverScreen onRestartGame={RestartGameHandler} guessRounds={guessRounds} userNumber={userNumber} />
      {/* {content} */}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
