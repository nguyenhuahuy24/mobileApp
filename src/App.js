import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigation from './routes/root/RootNavigation';
import { enableScreens } from 'react-native-screens';
import Store from './redux/Store';
import { Provider } from 'react-redux';
import GlobalContextProvider from './GlobalContextProvider';
import NetInfo from "@react-native-community/netinfo";
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Feather';

enableScreens();
export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      conn_status: true,
    }

  }
  componentDidMount() {
    this.NetInfoSubscribtion = NetInfo.addEventListener(
      this._handleConnectivityChange,
    );
  }
  componentWillUnmount() {
    this.NetInfoSubscribtion && this.NetInfoSubscribtion();
  }
  _handleConnectivityChange = (state) => {
    this.setState({
      conn_status: state.isConnected,
    })
    console.log(state.isConnected)
  }
  render() {
    return (
      (this.state.conn_status) ? <GlobalContextProvider>
        <Provider store={Store}>
          <NavigationContainer>
            <RootNavigation />
          </NavigationContainer>
        </Provider>
      </GlobalContextProvider> :
        <View style={styles.container}>
          <Icon
            name="wifi-off"
            backgroundColor=""
            color="grey"
            size={40}
          />
          <Text style={{ marginTop: '3%' }}> Vui lòng kết nối internet !!! </Text>
        </View>
    )
    //   if (this.state.conn_status === true) {
    //     return (
    //       <GlobalContextProvider>
    //         <Provider store={Store}>
    //           <NavigationContainer>
    //             <RootNavigation />
    //           </NavigationContainer>
    //         </Provider>
    //       </GlobalContextProvider>
    //     );
    //   }
    //   else {
    //     return (
    //       <View style={styles.container}>
    //         <Icon
    //           name="wifi-off"
    //           backgroundColor=""
    //           color="grey"
    //           size={40}

    //         />
    //         <Text style={{ marginTop: '3%' }}> Vui lòng kết nối internet !!! </Text>

    //       </View>
    //     )
    //   }
    // }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    height: "10%",
    width: '60%',
    backgroundColor: "#DB3022",
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.30,
    elevation: 13,
    margin: "8%"
  },
})