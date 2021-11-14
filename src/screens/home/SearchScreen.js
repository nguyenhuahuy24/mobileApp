import React, { Component } from "react";
import Icon from 'react-native-vector-icons/FontAwesome';
//import MapView from 'react-native-maps';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
export default class SearchScreen extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
      
      showX: false,
      global_search: "",
    }
  }

  handleSearch = value => {
    
  };
  render() {
    return (
      <View style={{flex: 1,backgroundColor:'#e5e5e5',alignItems:'center',justifyContent:'center'}}>
            <View style={styles.inputField}>
              <View style={{justifyContent:"center",marginLeft: "2%"}}>
                  <Icon
                  name="search"
                  backgroundColor=""
                  color="grey"
                  size={22}
                  
                />

              </View>         
              <TextInput
                name="search"
                style={styles.TextInput}
                placeholder="Nhập địa chỉ cần tìm"
                value={this.state.global_search}
                onChangeText={value=>this.handleSearch(value)}
              />
                <View>
              {this.state.showX ? (<TouchableOpacity onPress={()=> this.handleSearch("") }>
                <Icon
                  name="times"
                  backgroundColor=""
                  color="grey"
                  size={20}
                  style={{ marginTop: 9, marginRight: 7 }}
                />
              </TouchableOpacity>):null}
            </View>
            </View>
            {/* <View style={{ flex: 1 }}>
              <MapView
                  style={styles.map}
                  initialRegion={{
                    latitude: 10.835294605639918,
                    longitude: 106.76624615559005,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}
                />
            </View> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  
 
  inputField: {
    margin:"1%",
    borderColor: '#e5e5e5',
    borderRadius: 5,
    elevation: 1,
    height: 40,
    flexDirection: 'row',
    backgroundColor:"#ffff"

  },
  TextInput: {
    color: '#000000',
    borderColor: 'black',
    flex: 1,
    paddingRight: 15,
  },
  map:{
    height:'100%',
    width:'100%'
  }
});