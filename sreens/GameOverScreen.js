import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  Dimensions,
  ScrollView
} from 'react-native';

import ButtonMain from '../components/ButtonMain';
import DefaultStyle from '../constants/styles';
import Colors from '../constants/colors';


const GameOverScreen = props => {
  const [deviceWidth, setDeviceWidth] = useState(Dimensions.get('window').width);
  const [deviceHeight, setDeviceHeight] = useState(Dimensions.get('window').height);

  useEffect(() => {
    const updateLayout = () => {
      setDeviceWidth(Dimensions.get('window').width);
      setDeviceHeight(Dimensions.get('window').height);
    };
    Dimensions.addEventListener('change', updateLayout);

    return () => {
      Dimensions.removeEventListener('change', updateLayout);
    }
  });

  let titleSize = styles.titleBig
  if (deviceWidth < 400)
    titleSize = styles.titleSmall;

  return (
    <ScrollView>
      <View style={[styles.screen, DefaultStyle.screen]}>
        <Text style={[styles.title, titleSize]}>The game is OVER</Text>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require('../assets/success.png')}
            //source={{uri:'https://images.unsplash.com/photo-1535224206242-487f7090b5bb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'}}
            //fadeDuration={1000}
            resizeMode="cover" />
        </View>
        <View style={styles.resultContainer}>
          <Text style={[styles.text, { marginVertical: deviceHeight / 100, }]}>
            Your phhone need<Text style={styles.numbers}> {props.guessRounds} </Text>
            rounds to guess the number<Text style={styles.numbers}> {props.userNumber} </Text>
          </Text>
        </View>
        <ButtonMain onPress={props.onRestartGame}> New Game</ButtonMain>
      </View>
    </ScrollView>
  )
};

const styles = StyleSheet.create({
  screen: {
    justifyContent: 'center',
  },

  text: {
    fontFamily: 'open-sans',
    //marginVertical: 5,
    //marginVertical: Dimensions.get('window').height / 100,
    textAlign: 'center'
  },
  numbers: {
    color: Colors.primary
  },

  title: {
    fontFamily: 'open-sans-bold',
    padding: '1%'
  },

  titleBig: {
    fontSize: 20,
  },
  titleSmall: {
    fontSize: 16,
  },

  imageContainer: {
    // width: '80%',
    // height: '50%',
    height: Dimensions.get('window').height * 0.45,
    width: Dimensions.get('window').width * 0.8,
    //borderRadius: 200,
    borderRadius: Dimensions.get('window').width * 0.8 / 2,
    borderWidth: 5,
    borderColor: Colors.black,
    overflow: 'hidden',
    //marginVertical: 30
    marginVertical: Dimensions.get('window').height / 40
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