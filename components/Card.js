import React from 'react';
import { View, StyleSheet } from 'react-native';

import Colors from '../constants/colors';

const Card = props => {
  return (
    <View style={{ ...styles.card, ...props.style }}>
      {props.children}
    </View>
  )
};

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.3,
    elevation:8,
    padding:10,
    borderRadius:10
  }
});

export default Card;