import React, { Component } from "react";
import 'react-native-gesture-handler';
import BillScreenStack from '../dashboard/BillScreenStack'
import ContractScreenStack from '../dashboard/ContractScreenStack';
import ChangePasswordStack from '../dashboard/ChangePasswordStack';
import MessagesStack from '../dashboard/MessagesStack';
import AssessmentStack from "../dashboard/AssessmentStack";

import DrawerContent from './DrawerContent'
import { createDrawerNavigator } from '@react-navigation/drawer';
class DrawerNavigation extends React.Component {
  render() {
    const Drawer = createDrawerNavigator();
    return (
      <Drawer.Navigator screenOptions={{headerShown:false}}  drawerContent={(props) => <DrawerContent {...props} />}>
        <Drawer.Screen name="Bill" component={BillScreenStack} />
        <Drawer.Screen name="Contract" component={ContractScreenStack} />
        <Drawer.Screen name="ChangePassword" component={ChangePasswordStack} />
        <Drawer.Screen name="Messages" component={MessagesStack} />
        <Drawer.Screen name="Assessment" component={AssessmentStack} />
      </Drawer.Navigator>
    );
  }
}
export default DrawerNavigation;