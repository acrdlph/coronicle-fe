import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Platform, StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';
import axios from 'axios';

import { get_saved_coordinates } from "../persistence/db_save_locations";
import { BigButton } from '../components/BigButton';

const ReportScreen = (props) => {

  [loading, setLoading] = useState(false);
  console.log("loading check response ", loading)

  useEffect(()=> {
    setLoading(false)
  }, []);


  const sendSavedCoordinates = async () => {
    try {
      setLoading(true);
      const dbResult = await get_saved_coordinates();
      console.log("***RESULT:", dbResult.rows._array);
      // const beResponse = await axios.post('http://localhost:15000/infectedtrace', dbResult.rows._array);
      // to mock request:
      setTimeout(() => {
        console.log("mock sending request");
        setLoading(false);
        // TODO: set contact to true or false based on beResponse
        props.navigation.navigate("Response", { infected: true });
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
            Teile deine Bewegungen, um andere zu schützen.
            </Text>
          <Text style={{ fontSize: 50 }}>✋🏥😷</Text>
          <BigButton text='Anonymisierte Daten senden' onPress={sendSavedCoordinates} loading={loading} color='#FFEE73' />
          <Text style={styles.developmentModeText}>
            Dir wurde eine Infektion ärztlich bestätigt?
            Dann teile hiermit deine Bewegungshistorie, damit wir sie mit dem Verlauf anderer vergleichen können.
            Deine Daten bleiben bei uns und andere Nutzer erhalten nur die Information, ob sie mit dir in Kontakt gewesen sein könnten.
              </Text>
        </View>
      </ScrollView>
    </View>
  );
}

ReportScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
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

export default ReportScreen;