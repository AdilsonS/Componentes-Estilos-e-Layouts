import React, { useState } from 'react';
import { View, StyleSheet, Text, Button, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';

import Card from '../components/Card';
import Colors from '../constants/colors';
import MyInput from '../components/Input';

const StartGameScreen = props => {
  const [enteredValue, setEnteredValue] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();

  const confirAction = () => {
    closeKeyBoard();
    const chosenNumber = parseInt(enteredValue);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert(
        'Invalid number',
        'Number has to be number between 1 and 99',
        [{ text: 'OK', style: 'destructive', onPress: restAction }]
      )
      return;
    }

    setConfirmed(true);
    setSelectedNumber(chosenNumber);
    setEnteredValue('');
  };

  const restAction = () => {
    closeKeyBoard();
    setEnteredValue('');
    setConfirmed(false);
  };

  const numberInputHandler = inputText => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ''));
  };

  const closeKeyBoard = () => {
    Keyboard.dismiss();
  };

  let confirmedOutput
  if (confirmed)
    confirmedOutput =
      <Card style={styles.msgAlert}>
        <Text>Chose number</Text>
        <Text style={styles.txtAlert}>{selectedNumber}</Text>
        <View style={styles.buttonStart}>
          <Button title='Start Game' color={Colors.acent} onPress={() => props.onStartGame(selectedNumber)} />
        </View>
      </Card>


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
            <View style={styles.button} ><Button title="Reset" color={Colors.primary} onPress={restAction} /></View>
            <View style={styles.button}><Button title="Confirm" color={Colors.blue} onPress={confirAction} /></View>
          </View>
        </Card>
        {confirmedOutput}
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

  msgAlert: {
    padding: '2%',
    width: '50%',
    alignItems: 'center',
  },

  txtAlert: {
    fontSize: 18,
    color: Colors.primary
  },

  buttonStart: {
    padding: '5%'
  }
});

export default StartGameScreen;