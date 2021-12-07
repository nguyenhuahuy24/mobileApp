import React, { Component } from "react";

import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View, StyleSheet,Modal,Linking,TouchableOpacity } from 'react-native'

import HomeScreen from '../../screens/home/HomeScreen';
import SearchScreen from '../../screens/home/SearchScreen';
import SearchScreenStack from '../dashboard/SearchScreenStack';
import LoginScreen from '../../screens/login/LoginScreen'
import DrawerNavigation from '../drawer/DrawerNavigation'
import { withGlobalContext } from '../../GlobalContextProvider';
import { connect } from 'react-redux';
import { checkLogout } from '../../utility/common'
import NetInfo from '@react-native-community/netinfo';
import Icon from 'react-native-vector-icons/Feather';
import LinkingSettings from 'react-native-linking-settings';
class RootNavigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isConnectInternet: true,
        }
    }
    componentDidMount(){
    this.NetInfoSubscribtion = NetInfo.addEventListener(
      this._handleConnectivityChange,
      );
  }
  componentWillUnmount(){
    this.NetInfoSubscribtion && this.NetInfoSubscribtion();
  }
  _handleConnectivityChange=(state)=>{
    this.setState({
      conn_status: state.isConnected, 
    })
   
  }
  ToSetting=()=>{
    LinkingSettings.openSettings('WIFI_SETTINGS');
  }
    render() {
        const isSignin = this.props.global.isSignin
        const Stack = createStackNavigator();
        const Tab = createBottomTabNavigator();
         if(this.state.conn_status===false){
           
        return (
                <View style={styles.container}>
                  <Icon
                  name="wifi-off"
                  backgroundColor=""
                  color="grey"
                  size={40}
                  
                />
                 <Text style={{marginTop:'3%'}}>Kết nối Wifi/3G/GPRS bị gián đoạn </Text>
                <Text style={{marginTop:'1%'}}>Quý khách vui lòng kiểm tra lại kết nối</Text>
                <TouchableOpacity style={styles.button} onPress={()=>this.ToSetting()}>
                    <Text style={{fontSize:20,color:"white"}}> Cài đặt</Text>
                </TouchableOpacity>
                </View>
            )
         }
         return (
         
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {
                    isSignin ? <Stack.Screen name="DrawerNavigation" component={DrawerNavigation} /> : <Stack.Screen name="Home">{() => (
                        <Tab.Navigator
                            screenOptions={{
                                tabBarStyle: {
                                    position: 'absolute',
                                    bottom: '2%',
                                    left: '2%',
                                    right: '2%',
                                    elevation: 3,
                                    backgroundColor: '#ffff',
                                    borderRadius: 15,
                                    borderColor: '#000000',
                                    height: 60,

                                },
                                tabBarShowLabel: false,
                                tabBarActiveTintColor: 'tomato',
                                tabBarInactiveTintColor: 'gray',

                            }}>
                            <Tab.Screen name="HomeScreen" component={HomeScreen} options={{
                                tabBarIcon: ({ focused }) => (
                                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                        <Icon
                                            name="home"
                                            size={25}
                                            style={{ color: focused ? '#e32f45' : '#748c94' }}
                                        />
                                        <Text style={{ color: focused ? '#e32f45' : '#748c94' }}>
                                            Trang Chủ
                                        </Text>
                                    </View>
                                ),
                                headerShown: false
                            }} />
                            <Tab.Screen name="SearchScreen" component={SearchScreenStack} options={{
                                tabBarIcon: ({ focused }) => (
                                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                        <Icon
                                            name="search"
                                            size={25}
                                            style={{ color: focused ? '#DB3022' : '#748c94' }}
                                        />
                                        <Text style={{ color: focused ? '#DB3022' : '#748c94' }}>
                                            Tìm Kiếm
                                        </Text>
                                    </View>
                                ),
                                headerShown: false

                            }} />
                            <Tab.Screen name="Login" component={LoginScreen} options={{

                                tabBarIcon: ({ focused }) => (
                                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                        <Icon
                                            name="user"
                                            size={25}
                                            style={{ color: focused ? '#e32f45' : '#748c94' }}
                                        />
                                        <Text style={{ color: focused ? '#e32f45' : '#748c94' }}>
                                            Đăng Nhập
                                        </Text>
                                    </View>
                                ),
                                headerShown: false

                            }} />
                        </Tab.Navigator>)}
                    </Stack.Screen>
                }
            </Stack.Navigator>
         
           
        );
    }
}


export default withGlobalContext(RootNavigation)
const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
    },
    button: {
    height:"10%",
    width:'30%',
    backgroundColor: "#DB3022",
    borderRadius: 10,
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
    margin:"8%"
  },

})