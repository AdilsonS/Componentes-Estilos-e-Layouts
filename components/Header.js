import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

import Colors from '../constants/colors';
import colors from '../constants/colors';

const Header = props => {
  // let headerAux = styles.headerAndroid
  // if (Platform.OS === 'ios')
  //   headerAux = styles.headerIOS

  return (
    // <View style={[styles.headerBase, headerAux]}>
    <View style={{
      ...styles.headerBase,
      ...Platform.select({
        ios: styles.headerIOS,
        android: styles.headerAndroid
      })
    }}>
      <Text style={styles.headerTitle}>{props.title}</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  headerBase: {
    width: '100%',
    height: 70,
    paddingTop: 36,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: Platform.OS === 'android' ? Colors.primary : Colors.width,
    // borderBottomColor: Platform.OS === 'android' ? 'transparent' : Colors.blue,
    // borderBottomWidth: Platform.OS === 'android' ? 0 : 1
  },

  headerAndroid: {
    backgroundColor: Colors.primary,
    borderBottomColor: 'transparent',
    borderBottomWidth: 0
  },

  headerIOS: {
    backgroundColor: Colors.black,
    borderBottomColor: Colors.blue,
    borderBottomWidth: 1

  },

  headerTitle: {
    color: Colors.white,
    fontSize: 18,
    fontFamily: 'open-sans-bold'
  },
});

export default Header;