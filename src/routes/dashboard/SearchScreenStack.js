import 'react-native-gesture-handler';
import SearchScreen from '../../screens/home/SearchScreen'
import SearchDetailScreen from '../../screens/home/SearchDetailScreen';

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
export default class SearchScreenStack extends React.Component {
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={{
            headerShown: true,
            title: 'Tìm Kiếm Nhà Trọ',
            headerStyle: {
              backgroundColor: '#e32f45',
              height: 45
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 22
            },
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="SearchDetail"
          component={SearchDetailScreen}
          options={{
            headerTitleAlign: "center",
            title: 'Danh sách phòng',
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