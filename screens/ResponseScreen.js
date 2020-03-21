import React, { useState } from 'react';
import { ActivityIndicator, Platform, StyleSheet, Text, TouchableOpacity, View, Button, ShadowPropTypesIOS } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const ResponseScreen = (props) => {

    const handleOK = () => {
        props.navigation.goBack();
    }

    return (
        <View style={styles.container}>

            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

                <View style={styles.getStartedContainer}>

                    {props.route.params.infected ?
                        <View>
                            <Text style={{ fontSize: 30, textAlign: "center" }}>Danke für deine Solidarität!</Text>
                            <Text style={{ fontSize: 50, textAlign: "center" }}>🙅🥇👏</Text>
                        </View> :
                        props.route.params.contact ?
                            <View>
                                <Text style={{ fontSize: 30, textAlign: "center" }}>Möglicher Kontakt zum Virus!</Text>
                                <Text style={{ fontSize: 50, textAlign: "center" }}>💩🧐🏡</Text>
                            </View>
                            :
                            <View>
                                <Text style={{ fontSize: 30, textAlign: "center" }}>Kein Kontakt zum Virus!</Text>
                                <Text style={{ fontSize: 50, textAlign: "center" }}>👍🌈🏡</Text>
                            </View>
                    }



                    <Button title={"Okay!"} onPress={handleOK}></Button>
                    <Text style={styles.developmentModeText}>
                        Deine Daten werden mit der Bewegungshistorie von infizierten Personen abgeglichen.(Aber nicht gespeichert!)
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
}

ResponseScreen.navigationOptions = {
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
        marginHorizontal: 50,
        marginVertical: 200
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
        fontSize: 17,
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

export default ResponseScreen;
