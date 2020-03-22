import React, { useState, useEffect } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';

import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { BigButton } from '../components/BigButton';

export const LOCATION_TASK_NAME = 'background-location-task';

export default function TrackScreen() {

  [trackingOn, setTrackingOn] = useState(false);
  [permission, setPermission] = useState(false);

  [intervalState, setIntervalState] = useState(null);
  [loading, setLoading] = useState(false);

  console.log(trackingOn)


  const handleToggleTracking = async () => {
    setLoading(true);
    if (trackingOn) {
      setTrackingOn(false);
      Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
      console.log("tracking is off");
      setLoading(false);
    } else {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      setLoading(false);
      if (status !== 'granted') {
        setPermission(false);
      } else {
        setPermission(true);
        saveLocationHistory();
        setLoading(false);
      }
    }
  };

  const saveLocationHistory = async () => {
    setTrackingOn(true);
    Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
      accuracy: Location.Accuracy.Balanced,
      timeInterval: 10000,
      distanceInterval: 10
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        {/* <View style={styles.welcomeContainer}>
          {/* <Image
            source={
              __DEV__
                ? require('../assets/images/robot-dev.png')
                : require('../assets/images/robot-prod.png')
            }
            style={styles.welcomeImage}
          />

        </View> */}

        <View style={styles.getStartedContainer}>

          <Text style={styles.getStartedText}>
            {trackingOn ? "Deine Bewegungen werden aufgezeichnet": "Gemeinsam tracken wir den Virus!"}
          </Text>

          {trackingOn ?
            <Text style={{ fontSize: 70 }}>✊🛡️📱</Text>
            : <Text style={{ fontSize: 70 }}>🦠🤝❓</Text>

          }

            <BigButton onPress={handleToggleTracking} loading={loading} text={trackingOn ? "Aufzeichnung stoppen" : "Bewegungen aufzeichnen"} color={trackingOn ? '#E6E6E6' : '#FF8552'}/>
          <Text style={styles.developmentModeText}>
            Deine Daten werden nur auf deinem Endgerät gespeichert. Wann immer du willst, kannst du sie mit den
            bei uns abliegenden Daten von infizierten Personen abgleichen.
          </Text>
        </View>

        {/* <View style={styles.helpContainer}>
          <TouchableOpacity onPress={handleHelpPress} style={styles.helpLink}>
            <Text style={styles.helpLinkText}>Help, it didn’t automatically reload!</Text>
          </TouchableOpacity>
        </View> */}
      </ScrollView>

      {/* <View style={styles.tabBarInfoContainer}>
        <Text style={styles.tabBarInfoText}>This is a tab bar. You can edit it in:</Text>

        <View style={[styles.codeHighlightContainer, styles.navigationFilename]}>
          <MonoText style={styles.codeHighlightText}>navigation/BottomTabNavigator.js</MonoText>
        </View>
      </View> */}
    </View>
  );
}

TrackScreen.navigationOptions = {
  header: null,
};

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/workflow/development-mode/');
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/get-started/create-a-new-app/#making-your-first-change'
  );
}

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
