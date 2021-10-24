import 'react-native-gesture-handler';
import BillScreen from '../../screens/bill/BillScreen'
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
                    name="Project"
                    component={BillScreen}
                    options={{
                    title: 'Bill Screen',
                    headerLeft: () => (
                        <NavigationDrawerStructure navigationProps={this.props.navigation} />
                    ),
                    headerStyle: {
                        backgroundColor: '#61dafb',
                    },
                    headerTintColor: '#fff', 
                    headerTitleStyle: {
                        fontWeight: 'bold', 
                    },
                    }}
                />
                </Stack.Navigator>
            );
    }
            
}