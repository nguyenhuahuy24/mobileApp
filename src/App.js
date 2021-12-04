import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigation from './routes/root/RootNavigation';
import { enableScreens } from 'react-native-screens';
import Store from './redux/Store';
import { Provider } from 'react-redux';
import GlobalContextProvider from './GlobalContextProvider';
enableScreens();
export default class App extends React.Component {
  render() {
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
