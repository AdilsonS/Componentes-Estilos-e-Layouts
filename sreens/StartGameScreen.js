import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Card from '../components/Card';
import MyInput from '../components/Input';
import ButtonMain from '../components/ButtonMain';
import Colors from '../constants/colors';
import DefaultStyle from '../constants/styles';


const StartGameScreen = props => {
  const [enteredValue, setEnteredValue] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();
  const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width / 4);

  useEffect(() => {
    const updateLayout = () => {
      setButtonWidth(Dimensions.get('window').width / 4);
    };
    Dimensions.addEventListener('change', updateLayout);

    return () => {
      Dimensions.removeEventListener('change', updateLayout);
    }
  });



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
          <ButtonMain onPress={() => props.onStartGame(selectedNumber)}>
            <Ionicons name='md-power' size={24} color='white' />
          </ButtonMain>
          {/* <Button title='Start Game' color={Colors.acent} onPress={() => props.onStartGame(selectedNumber)} /> */}
        </View>
      </Card>


  return (
    <ScrollView>
      <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={30}>
        <TouchableWithoutFeedback onPress={closeKeyBoard}>
          <View style={[styles.screen, DefaultStyle.screen]}>
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
                <View style={{ width: buttonWidth }} ><Button title="Reset" color={Colors.primary} onPress={restAction} /></View>
                <View style={{ width: buttonWidth }}><Button title="Confirm" color={Colors.blue} onPress={confirAction} /></View>
              </View>
            </Card>
            {confirmedOutput}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  )
};

const styles = StyleSheet.create({
  screen: {
    padding: 10,
  },

  title: {
    fontSize: 20,
    marginVertical: 10,

  },

  input: {
    textAlign: 'center',
    width: '30%'
  },

  inputContainer: {
    backgroundColor: Colors.white,
    width: '80%',
    //width: 300,
    maxWidth: '95%',
    //maxWidth: '80%',
  },

  button: {
    width: Dimensions.get('window').width / 4
    //width: '40%',

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