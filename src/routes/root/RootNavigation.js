import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Text,View,StyleSheet} from 'react-native'

import HomeScreen from '../../screens/home/HomeScreen';
import SearchScreen from '../../screens/home/SearchScreen';
import LoginScreen from '../../screens/login/LoginScreen'
import DrawerNavigation from '../drawer/DrawerNavigation'
export default class RootNavigation extends React.Component {
    render() {
        const Stack = createStackNavigator();
        const Tab = createBottomTabNavigator();
        return (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Home">{()=>(
                    <Tab.Navigator 
                        
                        screenOptions={{
                        tabBarStyle:{
                         position: 'absolute',
                        bottom:'2%',
                        left:'2%',
                        right:'2%',
                        elevation:1,
                        backgroundColor:'#ffff',
                        borderRadius:15,
                        borderColor:'#000000',
                        height:60,
                        
                        },
                        tabBarShowLabel:false,
                        tabBarActiveTintColor: 'tomato',
                        tabBarInactiveTintColor: 'gray',
                        headerShown: false
                        }}>
                        <Tab.Screen name="HomeScreen" component={HomeScreen} options={{
                    tabBarIcon:({focused}) => (
                        <View style ={{alignItems: 'center',justifyContent:'center'}}>
                            <Icon
                                name="home" 
                                size={25}
                                style={{color: focused ? '#e32f45' : '#748c94'}}
                            />
                            <Text style={{color: focused ? '#e32f45' : '#748c94' }}>
                                Trang Chủ
                            </Text>
                        </View>
                    ),
                }} />
                <Tab.Screen name="SearchScreen" component={SearchScreen} options={{
                    tabBarIcon:({focused}) => (
                        <View style ={{alignItems: 'center',justifyContent:'center'}}>
                            <Icon
                                name="search" 
                                size={25}
                                style={{color: focused ? '#e32f45' : '#748c94'}}
                            />
                            <Text style={{color: focused ? '#e32f45' : '#748c94' }}>
                                Tìm Kiếm
                            </Text>
                        </View>
                    ),
                }} />
                <Tab.Screen name="Login" component={LoginScreen} options={{
                    
                    tabBarIcon:({focused}) => (
                        <View style ={{alignItems: 'center',justifyContent:'center'}}>
                            <Icon
                                name="user" 
                                size={25}
                                style={{color: focused ? '#e32f45' : '#748c94'}}
                            />
                            <Text style={{color: focused ? '#e32f45' : '#748c94' }}>
                                Đăng Nhập
                            </Text>
                        </View>
                    ),
                   
                }} />
                    </Tab.Navigator>)}
                </Stack.Screen>
            
            <Stack.Screen name="DrawerNavigation" component={DrawerNavigation} />
                
            </Stack.Navigator>
        );
    }
}
