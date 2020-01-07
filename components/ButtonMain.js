import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import Colors from '../constants/colors';

const ButtonMain = props => {
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={props.onPress}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{props.children}</Text>
      </View>
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.acent,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30
  },

  buttonText: {
    color: Colors.white,
    fontFamily: 'open-sans'
  }
});

export default ButtonMain;