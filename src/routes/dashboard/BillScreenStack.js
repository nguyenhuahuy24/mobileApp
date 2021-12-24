import 'react-native-gesture-handler';
import BillScreen from '../../screens/bill/BillScreen'
import BillDetailScreen from '../../screens/bill/BillDetailScreen';

import * as React from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();
const NavigationDrawerStructure = (props) => {
  const toggleDrawer = () => {
    props.navigationProps.toggleDrawer();
  };

  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity onPress={toggleDrawer}>
        <Image
          source={{
            uri:
              'https://raw.githubusercontent.com/AboutReact/sampleresource/master/drawerWhite.png',
          }}
          style={{width: 25, height: 25, marginLeft: 5}}
        />
      </TouchableOpacity>
    </View>
  );
};
export default class BillScreenStack extends React.Component {

    render(){
        return (
                <Stack.Navigator>
                <Stack.Screen
                    name="BillScreen"
                    component={BillScreen}
                    options={{
                    title: 'Hóa Đơn',
                    headerLeft: () => (
                        <NavigationDrawerStructure navigationProps={this.props.navigation} />
                    ),
                    headerStyle: {
                        backgroundColor: '#DB3022',
                    },
                    headerTintColor: '#fff', 
                    headerTitleStyle: {
                        fontWeight: 'bold', 
                    },
                    }}
                />
                <Stack.Screen 
                    name="BillDetail" 
                    component={BillDetailScreen} 
                    options={{
                    // title: this.props.projectDetail.data.name,
                     title: "Thông tin hóa đơn",
                     headerStyle: {
                    backgroundColor: '#DB3022',
                  },
                  headerTintColor: '#fff',
                  headerTitleStyle: {
                    fontWeight: 'bold',
                  },
                    
                    }} />
                </Stack.Navigator>
            );
    }
            
}