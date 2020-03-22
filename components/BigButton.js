import * as React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';

export function BigButton(props) {

    return <TouchableOpacity
        style={{
            borderWidth: 3,
            borderColor: 'rgba(0,0,0,0.2)',
            alignItems: 'center',
            justifyContent: 'center',
            width: '80%',
            height: '20%',
            backgroundColor: props.color,
            borderRadius: 100,
        }}
        onPress={props.onPress}
    >
        {props.loading ? <ActivityIndicator size="large" /> : <Text style={{fontSize: 16, fontStyle: 'italic', fontWeight: 'bold'}}>{props.text}</Text>}
    </TouchableOpacity>
}
