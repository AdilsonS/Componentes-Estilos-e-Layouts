import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Dimensions
} from 'react-native';

import Card from '../components/Card';
import Colors from '../constants/colors';
import DefaultStyle from '../constants/styles';

const generateRandom = (min, max, exlude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exlude)
    return generateRandom(min, max, exlude)
  else
    return rndNum;
}

// const renderListItem = (numberOfRounds, value) => (
//   <View style={styles.listItem} key={value}>
//     <Text>#{numberOfRounds}</Text>
//     <Text>{value}</Text>
//   </View>
// );

const renderListItem = (listLength, itemData) => (
  <View style={styles.listItem}>
    <Text>#{listLength - itemData.index}</Text>
    <Text>{itemData.item}</Text>
  </View>
);

const GameScreen = props => {
  const initialGuess = generateRandom(1, 100, props.userChoice)
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  //const [rounds, setRounds] = useState(0);
  //const [pastGuesses, setPastGuesses] = useState([initialGuess]);
  const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
  const [avaliableDeviceHeight, setAvaliableDeviceHeight] = useState(Dimensions.get('window').height);
  const [avaliableDeviceWidth, setAavaliableDeviceWidth] = useState(Dimensions.get('window').width)
  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const { userChoice, onGameOver } = props;


  useEffect(() => {
    const updateLayout = () => {
      setAvaliableDeviceHeight(Dimensions.get('window').height);
      setAavaliableDeviceWidth(Dimensions.get('window').width);
    };
    Dimensions.addEventListener('change', updateLayout);

    return () => {
      Dimensions.removeEventListener('change', updateLayout);
    }
  });

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuesses.length);
    }
  }, [currentGuess, userChoice, onGameOver]);

  const nextGuessHandler = direction => {
    if ((direction === 'lower' && currentGuess < props.userChoice)
      || (direction === 'greater' && currentGuess > props.userChoice)) {
      Alert.alert("Don't lie!", "You know that this is wrong...", [{ text: "Sory", style: "cancel" }])
      return;
    }

    if (direction === "lower")
      currentHigh.current = currentGuess
    else if (direction === "greater")
      currentLow.current = currentGuess + 1;
    else
      return;

    const nextNumber = generateRandom(currentLow.current, currentHigh.current, currentGuess);
    setCurrentGuess(nextNumber);
    //setRounds(curRounds => curRounds + 1);
    setPastGuesses(curPastGuest => [nextNumber, ...curPastGuest]);

  }

  let listContainerStyle = styles.listContainerBig
  if (avaliableDeviceWidth < 350)
    listContainerStyle = styles.listContainerSmall

  if (avaliableDeviceHeight < 500) {
    return (
      <ScrollView>
        <View style={DefaultStyle.screen}>
          <Card style={styles.card}>
            <Text>Oponent's Gues</Text>
            <View style={[styles.butonContainer, { marginTop: avaliableDeviceHeight > 600 ? 10 : 3, }]}>

              <TouchableOpacity activeOpacity={0.5} onPress={nextGuessHandler.bind(this, 'lower')}>
                <View style={styles.containerArrow}>
                  <Text style={styles.arrow}>V</Text>
                </View>
              </TouchableOpacity>
              <View style={{ marginTop: avaliableDeviceHeight * 0.03 }}>
                <Text>{currentGuess}</Text>
              </View>
              <TouchableOpacity activeOpacity={0.5} onPress={nextGuessHandler.bind(this, 'greater')}>
                <View style={styles.containerArrow}>
                  <Text style={[styles.arrow, styles.rotate]}>V</Text>
                </View>
              </TouchableOpacity>

            </View>
          </Card>

          <View style={[listContainerStyle, { marginTop: avaliableDeviceHeight * 0.05 }]}>
            <FlatList
              keyExtractor={item => item}
              data={pastGuesses}
              renderItem={renderListItem.bind(this, pastGuesses.length)}
              contentContainerStyle={styles.list}
            />
          </View>

        </View>
      </ScrollView>
    )
  } else {
    return (
      <ScrollView>
        <View style={DefaultStyle.screen}>
          <Card style={styles.card}>
            <Text>Oponent's Guess</Text>
            <View>
              <Text>{currentGuess}</Text>
            </View>
            <View style={[styles.butonContainer, { marginTop: avaliableDeviceHeight > 600 ? 10 : 3, }]}>

              <TouchableOpacity activeOpacity={0.5} onPress={nextGuessHandler.bind(this, 'lower')}>
                <View style={styles.containerArrow}>
                  <Text style={styles.arrow}>V</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.5} onPress={nextGuessHandler.bind(this, 'greater')}>
                <View style={styles.containerArrow}>
                  <Text style={[styles.arrow, styles.rotate]}>V</Text>
                </View>
              </TouchableOpacity>

            </View>
          </Card>

          <View style={[listContainerStyle, { marginTop: avaliableDeviceHeight * 0.05 }]}>
            <FlatList
              keyExtractor={item => item}
              data={pastGuesses}
              renderItem={renderListItem.bind(this, pastGuesses.length)}
              contentContainerStyle={styles.list}
            />
          </View>

        </View>
      </ScrollView>
    )
  }
  //#region Layout fixo
  // return (
  //   <ScrollView>
  //     <View style={DefaultStyle.screen}>
  //       <Card style={styles.card}>
  //         <Text>Oponent's Guess</Text>
  //         <Text>{currentGuess}</Text>
  //         <View style={styles.butonContainer}>

  //           <TouchableOpacity activeOpacity={0.5} onPress={nextGuessHandler.bind(this, 'lower')}>
  //             <View style={styles.containerArrow}>
  //               <Text style={styles.arrow}>V</Text>
  //             </View>
  //           </TouchableOpacity>

  //           <TouchableOpacity activeOpacity={0.5} onPress={nextGuessHandler.bind(this, 'greater')}>
  //             <View style={styles.containerArrow}>
  //               <Text style={[styles.arrow, styles.rotate]}>V</Text>
  //             </View>
  //           </TouchableOpacity>

  //         </View>
  //       </Card>
  //       {/* <View style={styles.listContainer}> */}
  //       {/* <View style={Dimensions.get('window').width > 500 ? styles.listContainerBig : styles.listContainerSmall}> */}
  //       <View style={listContainerStyle}>
  //         {/* <ScrollView contentContainerStyle={styles.list}>
  //         {pastGuesses.map((guess, index) => renderListItem(pastGuesses.length - index, guess))}
  //       </ScrollView> */}

  //         <FlatList
  //           keyExtractor={item => item}
  //           data={pastGuesses}
  //           renderItem={renderListItem.bind(this, pastGuesses.length)}
  //           contentContainerStyle={styles.list}
  //         />
  //       </View>
  //     </View>
  //   </ScrollView>
  // )
  //#endregion
};

const styles = StyleSheet.create({
  card: {
    width: '80%'
  },

  butonContainer: {
    width: '50%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    //marginTop: Dimensions.get('window').height > 600 ? 10 : 3,
  },

  containerArrow: {
    width: 40,
    height: 40,
    backgroundColor: Colors.primary,
    borderRadius: 20
  },
  arrow: {
    fontSize: 30,
    textAlign: 'center',
    color: Colors.white
  },

  rotate: {
    backgroundColor: Colors.acent,
    borderRadius: 20,
    transform: [{ rotate: '-180deg' }]
  },

  // listContainer: {
  //   flex: 1,
  //   //width: '80%',
  //   //width: '70%',
  //   width: Dimensions.get('window').width > 500 ? '60%' : '80%',
  //   marginTop: '5%',
  // },

  listContainerBig: {
    width: '80%',
    //marginTop: '5%',
    flex: 1,
  },

  listContainerSmall: {
    width: '60%',
    //marginTop: '5%',
    flex: 1,
  },


  list: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    //alignItems: 'center'
  },

  listItem: {
    borderColor: Colors.black,
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    justifyContent: 'space-around',
    //width: '85%',
    width: '100%',
  }

});

export default GameScreen;