import React, { Component } from "react";
import {
  View,
  Text,
} from 'react-native';
import SwipeSlide from "./Home/SwipeSlide";

export default class HomeScreen extends React.Component {

  render() {
    return (
      <View style={{flex: 1,backgroundColor:'#e5e5e5',alignItems:'center',justifyContent:'center'}}>
        <SwipeSlide />
        
      </View>
    );
  }
}

