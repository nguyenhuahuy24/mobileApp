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
      username: "",
      password: "",
    };
  }
  onLogin = () => {
    this.props.navigation.navigate('DrawerNavigation');
  };
  render() {
    return (
      <View style={{ backgroundColor: '#F9F9F9', flex: 1 }}>
        <View style={styles.header}>
          <Text style={styles.title}>Nhà trọ hạnh phúc</Text>
          <Text style={styles.title} >Login</Text>
        </View>
        <View style={styles.body}>
          <View style={styles.input_wrap}>
            <Text style={{ marginLeft: 10, color: "#D3D3D3" }}>Số điện thoại</Text>
            <TextInput style={styles.input} keyboardType={"phone-pad"} />
          </View>
          <View style={styles.input_wrap}>
            <Text style={{ marginLeft: 10, color: "#D3D3D3" }}>Mật khẩu</Text>
            <TextInput style={styles.input} secureTextEntry={true} />
          </View>
          <TouchableOpacity style={styles.button} onPress={this.onLogin}>
            <Text style={{ color: "white", fontSize: 17 }}>LOGIN</Text>
          </TouchableOpacity>

        </View>
        <View style={styles.footer}></View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  header: {
    flex: 2,
    justifyContent: 'center',
  },
  body: {
    flex: 3, paddingTop: 20
  },
  footer: {
    flex: 0.5,
  },
  title: {
    marginLeft: 20,
    marginTop: 20,
    width: "90%",
    height: 34,
    color: "#555555",
    fontFamily: "Metropolis",
    fontSize: 34,
    lineHeight: 34
  },
  input_wrap: {
    marginTop: 10,
    flexDirection: "column",
    backgroundColor: "white",
    marginHorizontal: 10,
    borderColor: '#E5E5E5',
    borderRadius: 5,
    elevation: 5,
    shadowColor: '#BEBEBE',
    justifyContent: 'center'
  },
  input: {
    marginLeft: 10,
    paddingTop: -5,
    fontSize: 18,
    width: "80%"
  },

  button: {
    width: "90%",
    height: 48,
    backgroundColor: "#DB3022",
    borderRadius: 25,
    marginHorizontal: 20,
    marginTop: 68,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.30,

    elevation: 13,
  }
});
