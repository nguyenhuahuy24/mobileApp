import 'react-native-gesture-handler';
import HomeScreen from '../../screens/home/HomeScreen';
import SearchDetailScreen from '../../screens/home/SearchDetailScreen';
import DetailRoomScreen from "../../screens/home/DetailRoomScreen"
import * as React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();
const NavigationDrawerStructure = (props) => {
    const toggleDrawer = () => {
        props.navigationProps.toggleDrawer();
    };

    return (
        <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={toggleDrawer}>
                <Image
                    source={{
                        uri:
                            'https://raw.githubusercontent.com/AboutReact/sampleresource/master/drawerWhite.png',
                    }}
                    style={{ width: 25, height: 25, marginLeft: 5 }}
                />
            </TouchableOpacity>
        </View>
    );
};
export default class HomeScreenStack extends React.Component {
    render() {
        return (
            <Stack.Navigator>
                <Stack.Screen
                    name="HomeScreen"
                    component={HomeScreen}
                    options={{
                        headerShown: false
                    }}

                />
                <Stack.Screen
                    name="DetailHouseScreen"
                    component={SearchDetailScreen}
                    options={{
                        headerTitleAlign: "center",
                        title: 'Thông tin nhà',
                        headerStyle: {
                            backgroundColor: '#e32f45',
                            height: 45
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                            fontSize: 22
                        },
                    }}
                />
                <Stack.Screen
                    name="DetailRoomScreen"
                    component={DetailRoomScreen}
                    options={{
                        headerTitleAlign: "center",
                        title: 'Thông tin phòng',
                        headerStyle: {
                            backgroundColor: '#e32f45',
                            height: 45
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                            fontSize: 22
                        },
                    }}
                />

            </Stack.Navigator>
        );
    }
}