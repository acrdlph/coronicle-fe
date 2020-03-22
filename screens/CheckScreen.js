import React, { useState } from 'react';
import { ActivityIndicator, Platform, StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';
import axios from 'axios';

import { get_saved_coordinates } from "../persistence/db_save_locations";
import { BigButton } from '../components/BigButton';

const CheckScreen = (props) => {

  [loading, setLoading] = useState(false);
  console.log("loading check response ", loading)


  const sendSavedCoordinates = async () => {
    try {
      setLoading(true);
      const dbResult = await get_saved_coordinates();
      console.log("***RESULT:", dbResult.rows._array);
      // const beResponse = await axios.post('http://localhost:15000/checktrace', dbResult.rows._array);
      // to mock request:
      setTimeout(() => {
        console.log("mock sending request");
        setLoading(false);
        // TODO: set contact to true or false based on beResponse
        props.navigation.navigate("Response", { contact: true });
      }, 1000);
      // navigate to response screen (and pass outcome as navigation parameter)

    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  return (
    <View style={styles.container}>

      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

        <View style={styles.getStartedContainer}>
          <Text style={styles.getStartedText}>
            Finde heraus, ob du in Kontakt warst.
            </Text>

          <Text style={{ fontSize: 50 }}>📡🗺️✅</Text>
          <BigButton text='Bewegungsdaten abgleichen' onPress={sendSavedCoordinates} loading={loading} color='#E6E6E6'/>
          <Text style={styles.developmentModeText}>
            Deine Daten werden mit der Bewegungshistorie von infizierten Personen abgeglichen.(Aber nicht gespeichert!)
              </Text>
        </View>


      </ScrollView>
    </View>
  );
}

CheckScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFEE73',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 50,
    height: '90%'
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    height: '100%',
    marginHorizontal: 50,
    marginVertical: 50
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});

export default CheckScreen;