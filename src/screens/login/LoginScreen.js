/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      username:"",
      password: "",
    
    };
  }
  changeText(value, type) {
    switch (type) {
      case 'url':
        this.setState({
          url: value,
        });
        break;
      case 'password':
        this.setState({
          password: value,
        });
        break;
      case 'username':
        this.setState({
          username: value,
        });
        break;
      default:
        break;
    }
  };
  render(){
    return (
      <View style={{ backgroundColor: '#FFFFFF', flex: 1 }}>     
        <View>
          
          <View style={styles.inputField}>
            <TouchableOpacity>
              <Icon
                name="user-circle"
                backgroundColor=""
                color="grey"
                size={20}
                style={{ marginTop: 15, marginLeft: 20 }}
              />
            </TouchableOpacity>

            <TextInput
              style={styles.TextInput}
              placeholder="User Name Email"
              value={this.state.username}
              onChangeText={value => this.changeText(value, 'username')}
            />
          </View>
          <View style={styles.inputField}>
            <Icon.Button
              name="lock"
              backgroundColor=""
              color="grey"
              style={{ marginTop: 7, marginLeft: 15 }}
            />
            <TextInput
              style={styles.TextInput}
              placeholder="Password"
              value={this.state.password}
              onChangeText={value => this.changeText(value, 'password')}
              secureTextEntry={true}
            />
          </View>

             <TouchableOpacity
                    style={styles.BtnLogin}
                    onPress={this.props.navigation.navigate('DrawerNavigation')}
                    >
                    <Text style={{color: 'white', textAlign: 'center', fontSize: 20}}>
                      Login
                    </Text>
                  </TouchableOpacity>

                  <View
                    style={{marginTop: 15, marginHorizontal: 30, flexDirection: 'row'}}>
                    <Text justifyContent='center'>Forget password?</Text>
                  </View>
        </View>
      </View>
    );
  }
 
  
  
}
const styles = StyleSheet.create({
  imgStyle: {
    width: '90%',
    height: '16%',
    marginTop: '20%',
    marginLeft: '5%',
    marginBottom: '5%',
    resizeMode: 'stretch',
  },

  inputField: {
    marginTop: '5%',
    marginHorizontal: 30,
    borderColor: '#E5E5E5',
    borderRadius: 15,
    borderWidth: 1,
    flexDirection: 'row',
  },
  TextInput: {
    color: '#000000',
    borderColor: '#E5E5E5',
    borderRadius: 15,
    flex: 1,
    paddingRight: 50,
    textAlign: 'center',
  },
  BtnLogin: {
    width: '80%',
    backgroundColor: '#4876FF',
    marginTop: 30,
    marginHorizontal: 30,
    borderRadius: 15,
    borderWidth: 1,
    height: 50,
    justifyContent: 'center',
  },
  //modal
  centeredView: {
    flex: 1,
    justifyContent: 'center'
  },
  modalView: {
    margin: 15,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    elevation: 5,
    zIndex: 100
  },
  loginText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  }
});
