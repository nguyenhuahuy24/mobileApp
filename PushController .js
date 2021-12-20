import React, { Component } from "react";
import PushNotification from "react-native-push-notification";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class PushController extends Component {
    componentDidMount() {
        PushNotification.configure({
            // (optional) Called when Token is generated (iOS and Android)
            onRegister: async function (token) {
                console.log("TOKEN:", token);
                await AsyncStorage.setItem('token-device', token.token)
            },
            // (required) Called when a remote or local notification is opened or received
            onNotification: function (notification) {
                console.log("NOTIFICATION:", notification);
                // process the notification here
            },
            // Android only
            senderID: "726632924375",
            // iOS only
            permissions: {
                alert: true,
                badge: true,
                sound: true
            },
            popInitialNotification: true,
            requestPermissions: true
        });
    }
    render() {
        return null;
    }
}