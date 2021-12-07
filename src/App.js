import React, { Component } from "react";
import { NavigationContainer } from '@react-navigation/native';
import RootNavigation from './routes/root/RootNavigation';
import { enableScreens } from 'react-native-screens';
import Store from './redux/Store';
import { Provider } from 'react-redux';
import GlobalContextProvider from './GlobalContextProvider';
import { View, SafeAreaView, ActivityIndicator } from 'react-native';
import LoadingScreen from './screens/home/LoadingScreen'
enableScreens();
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,

    }
  }
  componentDidMount() {
    setTimeout(
      function () {
        this.setState({ isLoading: false });
      }
        .bind(this),
      2000
    );
  }
  render() {
    if (this.state.isLoading === true) {
      return (
        <LoadingScreen />
      );
    }
    return (
      <GlobalContextProvider>
        <Provider store={Store}>
          <NavigationContainer>
            <RootNavigation />
          </NavigationContainer>
        </Provider>
      </GlobalContextProvider>
    );

  }
}
