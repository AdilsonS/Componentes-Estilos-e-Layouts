import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

import DefaultStyle from '../constants/styles';

const GameOverScreen = props => {
  return (
    <View style={[styles.screen, DefaultStyle.screen]}>
      <Text>The game is OVER</Text>
      <Text>Number of rounds: {props.guessRounds}</Text>
      <Text>Number was: {props.userNumber}</Text>
      <Button title="Restart Game" onPress={props.onRestartGame} />
    </View>)
};

const styles = StyleSheet.create({
  screen: {
    justifyContent: 'center',
  }
});

export default GameOverScreen;