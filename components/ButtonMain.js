import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native';

import Colors from '../constants/colors';

const ButtonMain = props => {
  let ButtonComponent = TouchableOpacity;
  if (Platform === 'andoird' && Platform.Version >= 21)
    ButtonComponent = TouchableNativeFeedback;

  return (
    <ButtonComponent activeOpacity={0.5} onPress={props.onPress}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{props.children}</Text>
      </View>
    </ButtonComponent>
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