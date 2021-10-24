import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../../screens/login/LoginScreen'
export default class AuthenticationStack extends React.Component
{   
    render(){
        const Stack = createStackNavigator();
        return (   
            <Stack.Navigator >
                <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
        );
    }
};