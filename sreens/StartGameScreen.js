import React from 'react';
import { View, StyleSheet, Text, TextInput, Button } from 'react-native';

import Card from '../components/Card';

const confirAction = () => {

};
const restAction = () => {

};

const StartGameScreen = props => {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Start a new game</Text>
      <Card style={styles.inputContainer}>
        <TextInput style={styles.input} />
        <View style={styles.buttonContainer}>
          <Button style={styles.button} title="Reset" color='red' onPress={restAction()} />
          <Button style={styles.button} title="Confirm" color='green' onPress={confirAction()} />
        </View>
      </Card>
    </View>
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

  },

  inputContainer: {
    backgroundColor:'white',
    width: 300,
    maxWidth: '80%',
    },

  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 15
  },
});

export default StartGameScreen;