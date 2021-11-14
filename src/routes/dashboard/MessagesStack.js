import 'react-native-gesture-handler';
import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {View, TouchableOpacity, Image} from 'react-native';
import MessagesScreen from '../../screens/messages/MessagesScreen';
import ChatScreen from '../../screens/messages/ChatScreen';

// import ChatScreen from '../../screens/messages/ChatScreen';

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
export default class MessagesStack extends React.Component {
  
    render(){
             return (
            <Stack.Navigator >
                  <Stack.Screen
                      name="Messages"
                      component={MessagesScreen}
                      options={{
                      title: 'Trò chuyện', //Set Header Title
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
                        name="Chat" 
                        component={ChatScreen} 
                        options={({route})=>(
                          {
                                // title: this.props.projectDetail.data.name,
                        title: route.params.userName,
                        headerStyle: {
                        backgroundColor: '#DB3022',},
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                        fontWeight: 'bold',
                        },
                        }
                        )} />
            </Stack.Navigator>
        );
    }
}