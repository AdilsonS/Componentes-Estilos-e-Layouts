import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

import Colors from '../constants/colors';

const Input = props => {
  return (
    <TextInput {...props} style={{ ...styles.input, ...props.style }} />
  )
};

const styles = StyleSheet.create({
  input: {
    height: 30,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: Colors.blue,
    marginVertical: '1%'
  }
});

export default Input;