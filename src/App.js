import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigation from './routes/root/RootNavigation';
import {enableScreens} from 'react-native-screens';
enableScreens();
export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <RootNavigation />
      </NavigationContainer>
    );
  }
}
