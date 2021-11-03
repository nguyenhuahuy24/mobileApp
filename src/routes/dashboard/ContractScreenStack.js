import 'react-native-gesture-handler';
import ContractScreen from '../../screens/contract/ContractScreen';
import * as React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import ContractDetailScreen from '../../screens/contract/ContractDetailScreen';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();
const NavigationDrawerStructure = (props) => {
  //Structure for the navigatin Drawer
  const toggleDrawer = () => {
    //Props to open/close the drawer
    props.navigationProps.toggleDrawer();
  };

  return (
    <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity onPress={toggleDrawer}>
        {/*Donute Button Image */}
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
export default class ContractScreenStack extends React.Component {
  render() {
    return (
      <Stack.Navigator >
        <Stack.Screen
          name="ContractScreen"
          component={ContractScreen}
          options={{
            title: 'Hợp Đồng', //Set Header Title
            headerLeft: () => (
              <NavigationDrawerStructure navigationProps={this.props.navigation} />
            ),
            headerStyle: {
              backgroundColor: '#DB3022', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
        <Stack.Screen 
            name="ContractDetail" 
            component={ContractDetailScreen} 
            options={{
                    // title: this.props.projectDetail.data.name,
            title: "Bill Detail",
            headerStyle: {
            backgroundColor: '#DB3022',},
            headerTintColor: '#fff',
            headerTitleStyle: {
            fontWeight: 'bold',
            },
            }} />
      </Stack.Navigator>
    );
  }
}