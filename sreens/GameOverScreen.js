import React from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';

import ButtonMain from '../components/ButtonMain';
import DefaultStyle from '../constants/styles';
import Colors from '../constants/colors';

const GameOverScreen = props => {
  return (
    <View style={[styles.screen, DefaultStyle.screen]}>
      <Text style={styles.title}>The game is OVER</Text>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require('../assets/success.png')}
          //source={{uri:'https://images.unsplash.com/photo-1535224206242-487f7090b5bb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'}}
          //fadeDuration={1000}
          resizeMode="cover" />
      </View>
      <View style={styles.resultContainer}>
        <Text style={styles.text}>
          Your phhone need<Text style={styles.numbers}> {props.guessRounds} </Text>
          rounds to guess the number<Text style={styles.numbers}> {props.userNumber} </Text>
        </Text>
      </View>
      <ButtonMain onPress={props.onRestartGame}> New Game</ButtonMain>
    </View>)
};

const styles = StyleSheet.create({
  screen: {
    justifyContent: 'center',
  },

  text: {
    fontFamily: 'open-sans',
    marginVertical: 5,
    textAlign: 'center'
  },
  numbers: {
    color: Colors.primary
  },

  title: {
    fontSize: 18,
    fontFamily: 'open-sans-bold',
    padding: '1%'
  },

  imageContainer: {
    width: '80%',
    height: '50%',
    borderRadius: 200,
    borderWidth: 5,
    borderColor: Colors.black,
    overflow: 'hidden',
    marginVertical: 30
  },

  image: {
    width: '100%',
    height: '100%'
  },

  resultContainer: {
    width: '80%',
  },
});

export default GameOverScreen;