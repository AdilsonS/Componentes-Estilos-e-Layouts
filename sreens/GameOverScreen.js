import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const GameOverScreen = props => {
  return (
    <View style={styles.screen}>
      <Text>The game is OVER</Text>
      <Text>Number of rounds: {props.guessRounds}</Text>
      <Text>Number was: {props.userNumber}</Text>
      <Button title="Restart Game" onPress={props.onRestartGame} />
    </View>)
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default GameOverScreen;