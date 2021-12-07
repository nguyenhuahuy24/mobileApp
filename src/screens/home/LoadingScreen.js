import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  Animated
} from 'react-native';
import LottieView from 'lottie-react-native';

export default class LoadingScreen extends React.Component {


constructor () {
        super()
            this.state={
                fadeAnim: new Animated.Value(0),
                loading: false
            
            }
  
    }
 componentDidMount () {
  this.fadeIn();
  setTimeout(
        function() {
            this.setState({loading: true});
        }
        .bind(this),
        200
      );
}
fadeIn = () => {
    Animated.timing(this.state.fadeAnim, {
      toValue: 1,
      duration: 1800,
      useNativeDriver: true,
    }).start();
  };

  render() {
    return (
      <View style={{flex: 1,alignItems:'center',justifyContent:'center'}}>
        
        <Animated.View style={[
            {
              opacity: this.state.fadeAnim
            }
          ]}>
            <Image source={require('../../image/logo.png')}/>
        </Animated.View>
            {this.state.loading ===true && <ActivityIndicator size="large" color="#DB3022" />}
      </View>
    );
  }
}

