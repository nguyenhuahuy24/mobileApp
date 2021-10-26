import React from 'react';
import AuthenticationStack from '../authentication/AuthenticationStack';
import { createStackNavigator } from '@react-navigation/stack';
import DrawerNavigation from '../drawer/DrawerNavigation';

export default class RootNavigation extends React.Component {
    render() {
        const Stack = createStackNavigator();
        return (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Authentication" component={AuthenticationStack} />
                <Stack.Screen name="DrawerNavigation" component={DrawerNavigation} />
            </Stack.Navigator>
        );
    }
}
