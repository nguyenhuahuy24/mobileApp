import React, { Component } from "react";
import 'react-native-gesture-handler';
import BillScreenStack from '../dashboard/BillScreenStack'
import ContractScreenStack from '../dashboard/ContractScreenStack';
import DrawerContent from './DrawerContent'
import { createDrawerNavigator } from '@react-navigation/drawer';
class DrawerNavigation extends React.Component {
  render() {
    const Drawer = createDrawerNavigator();
    return (
      <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
        <Drawer.Screen name="Bill" component={BillScreenStack} />
        <Drawer.Screen name="Contract" component={ContractScreenStack} />
      </Drawer.Navigator>
    );
  }
}
export default DrawerNavigation;