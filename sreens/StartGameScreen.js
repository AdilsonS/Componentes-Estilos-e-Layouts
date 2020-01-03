import React, { useState } from 'react';
import { View, StyleSheet, Text, Button, TouchableWithoutFeedback, Keyboard } from 'react-native';

import Card from '../components/Card';
import Colors from '../constants/colors';
import MyInput from '../components/Input';

const StartGameScreen = props => {
  const [enteredValue, setEnteredValue] = useState('');

  const confirAction = () => { };
  const restAction = () => { };

  const numberInputHandler = inputText => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ''));
  }

  const closeKeyBoard = () => {
    Keyboard.dismiss();
   }

  return (
    <TouchableWithoutFeedback onPress={closeKeyBoard}>
      <View style={styles.screen}>
        <Text style={styles.title}>Start a new game</Text>
        <Card style={styles.inputContainer}>
          <MyInput style={styles.input}
            blurOnSubmit
            autoCapitalize='none'
            autoCorrect={false}
            keyboardType='number-pad'
            maxLength={2}
            onChangeText={numberInputHandler}
            value={enteredValue} />
          <View style={styles.buttonContainer}>
            <View style={styles.button} ><Button title="Reset" color={Colors.primary} onPress={restAction()} /></View>
            <View style={styles.button}><Button title="Confirm" color={Colors.acent} onPress={confirAction()} /></View>
          </View>
        </Card>
      </View>
    </TouchableWithoutFeedback>
  )
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },

  title: {
    fontSize: 20,
    marginVertical: 10
  },

  input: {
    textAlign: 'center',
    width: '30%'
  },

  inputContainer: {
    backgroundColor: Colors.white,
    width: 300,
    maxWidth: '80%',
  },

  button: {
    width: '40%',
  },

  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
});

export default StartGameScreen;