import 'react-native-gesture-handler';
import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {View, TouchableOpacity, Image} from 'react-native';
import AssessmentScreen from '../../screens/assessment/AssessmentScreen';
//TODO: Restructures this file.
const Stack = createStackNavigator();
const NavigationDrawerStructure = (props) => {
  //Structure for the navigatin Drawer
  const toggleDrawer = () => {
    //Props to open/close the drawer
    props.navigationProps.toggleDrawer();
  };

  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity onPress={toggleDrawer}>
        {/*Donute Button Image */}
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
//TODO:??? => Refactor.
export default class AssessmentStack extends React.Component {
    render(){
             return (
            <Stack.Navigator >
            <Stack.Screen
                name="AssessmentScreen"
                component={AssessmentScreen}
                options={{
                title: 'Đánh Giá', //Set Header Title
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
            </Stack.Navigator>
        );
    }
}