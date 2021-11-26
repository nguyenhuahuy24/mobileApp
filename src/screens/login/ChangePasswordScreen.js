import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import { connect } from 'react-redux';
import { dataStatus } from '../../utility/config'
import { withGlobalContext } from '../../GlobalContextProvider';
import { changePassword} from '../../redux/action/authenticateAction/AuthenticateAction';

class ChangePasswordScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '', 
      re_password: '',
      
      //dieu kien hiển thị mk
      showPassword:true,
      showRe_Password:true,
      //dấu mắt
      hideXPass:false,
      hideXRe_Pass:false,
      //show mắt
      showXPass:false,
      showXRe_Pass:false,
    };
  }
  componentDidUpdate(prevProps) {
    if (this.props.changePasswordStatus !== prevProps.changePasswordStatus) {
      if (this.props.changePasswordStatus.status === dataStatus.SUCCESS) {
              Alert.alert("Đổi Mật Khẩu", "Thành Công")
              this.setState({
                password:'',
                re_password:'',
                showXPass:false,
                showXRe_Pass:false,
                hideXPass:false,
                hideXRe_Pass:false,
                showPassword:true,
                showRe_Password:true,})
      }
      else {
        Alert.alert("Error", this.props.changePasswordStatus.message)
      }
    }
  }
  changeText(value, type) {
      if (type === 'password') {
        if(value===""){
          this.setState({showXPass:false,hideXPass:false,showPassword:true});
        }
        else{
            if(this.state.hideXPass===true)
                this.setState({password: value});
            else 
                this.setState({password: value,showXPass:true});
        }
    } else {
          if(value===""){
              this.setState({showXRe_Pass:false,hideXRe_Pass:false,showRe_Password:true});
          }
          else{
              if(this.state.hideXRe_Pass===true){
                  this.setState({re_password: value});
              }
              else  
                  this.setState({re_password: value,showXRe_Pass:true});
              }
      }
  }
  handleShow = (value) => {
    if(value==='re_password'){
      this.setState({showRe_Password:false,showXRe_Pass:false,hideXRe_Pass:true})
    }
    else{
      this.setState({showPassword:false,showXPass:false,hideXPass:true})
    }
  };
  handleHide = (value) => {
    if(value==='re_password'){
      this.setState({showRe_Password:true,hideXRe_Pass:false,showXRe_Pass:true})
    }
    else{
      this.setState({showPassword:true,hideXPass:false,showXPass:true})
    }
  };
  resetPassword = () => {
    if (this.state.password === '' || this.state.re_password === '') {
      alert('Mật khẩu trống');
      return;
    }
    if (this.state.password === this.state.re_password) {
      alert('Mật Khẩu Mới Không Được Trùng Với Mật Khẩu Cũ');
      return;
    }
    else {
      let data ={oldPassword:this.state.password,newPassword:this.state.re_password}
      this.props.changePassword(data)
     
    }
  };

  render() {
    return (
      <View style={{flex: 1,backgroundColor:'#e5e5e5'}}>
        <View style={styles.body}>
          
          <View>
            <View style={styles.input_wrap}>
            <Text style={{ marginLeft: 10, color: "#4d4d4d",fontSize:15 }}>Mật Khẩu Cũ:</Text>
            <View style={styles.inputPassword}>
              <TextInput 
                style={styles.input}
                value={this.state.password}
                secureTextEntry={this.state.showPassword} 
                onChangeText={value => this.changeText(value, 'password')}
                />
                {this.state.showXPass ? (<TouchableOpacity onPress={()=> this.handleShow("password") }>
            <Icon
              name="eye"
              backgroundColor=""
              color="grey"
              size={20}
              style={{ marginTop: 9, marginLeft: 20 }}
            />
          </TouchableOpacity>):null}
            {this.state.hideXPass ? (<TouchableOpacity onPress={()=> this.handleHide("password") }>
            <Icon
              name="eye-slash"
              backgroundColor=""
              color="grey"
              size={20}
              style={{ marginTop: 9, marginLeft: 20 }}
            />
          </TouchableOpacity>):null}
            </View>
          </View>
          <View style={styles.input_wrap}>
            <Text style={{ marginLeft: 10, color: "#4d4d4d",fontSize:15 }}>Mật Khẩu Mới:</Text>
            
            <View style={styles.inputPassword}>
              <TextInput 
                style={styles.input}
                value={this.state.re_password}
                secureTextEntry={this.state.showRe_Password} 
                onChangeText={value => this.changeText(value, 're_password')}
                />
                {this.state.showXRe_Pass ? (<TouchableOpacity onPress={()=> this.handleShow("re_password") }>
            <Icon
              name="eye"
              backgroundColor=""
              color="grey"
              size={20}
              style={{ marginTop: 9, marginLeft: 20 }}
            />
          </TouchableOpacity>):null}
            {this.state.hideXRe_Pass ? (<TouchableOpacity onPress={()=> this.handleHide("re_password") }>
            <Icon
              name="eye-slash"
              backgroundColor=""
              color="grey"
              size={20}
              style={{ marginTop: 9, marginLeft: 20 }}
            />
          </TouchableOpacity>):null}
            </View>
          </View>
          <TouchableOpacity style={styles.button} onPress={()=>this.resetPassword()}>
            <Text style={{ color: "white", fontSize: 17 }}>Đổi Mật Khẩu</Text>
          </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    elevation: 1,
    margin:'2%',
    backgroundColor: '#ffff',
    borderColor: '#e5e5e5',
    borderRadius: 5,
    
  },
  text_header:{
    fontSize:27,
    fontWeight:'bold',
    width: '70%'
    
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
    marginTop: 48,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.30,
    marginBottom: '10%',
    elevation: 13,
  },
  inputPassword:{
    flexDirection: 'row',
  }
});
function mapStateToProps(state) {
  return {
    changePasswordStatus: state.AuthenticateReducer.changePasswordStatus,
  };
}
export default withGlobalContext(connect(mapStateToProps, { changePassword })(ChangePasswordScreen));