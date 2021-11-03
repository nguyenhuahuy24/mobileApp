
import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';
import IconOcticons from 'react-native-vector-icons/Octicons';

class DrawContentContent extends React.Component {
  constructor(props) {
    super(props);
  }

  onhandleLogout = () => {
    
  };
  goToBillScreen = () => {
    this.props.navigation.navigate('Bill');
  };
    goToContractScreen =  () => {
      this.props.navigation.navigate('Contract');
    };
  render() {

    return (
      <View style={{flex: 1}}>
        {/* header */}
        <View>
          
          <Text style={styles.headerText}>Welcome to Nhà Trọ Huy</Text>
          <Text
            style={{
              marginTop: 10,
              textAlign: 'center',
              fontStyle: 'italic',
              marginBottom: 15,
            }}>Xin chào !!! Customer
            {/* {userProfile.username}{' '} */}
          </Text>
        </View>
        {/* body */}
        <View style={styles.body}>
          <View style={styles.bodyText}>
            <TouchableOpacity
              style={styles.touch}
              onPress={this.goToBillScreen}>
              <Icon
                name="money-bill"
                backgroundColor=""
                color="#ff4d94"
                size={30}
                style={{marginLeft: 10}}
              />
              <Text style={{fontSize: 20, marginLeft: 15,marginTop:"1%"}}>Hóa đơn</Text>

            </TouchableOpacity>
            
          </View>
          <View style={styles.bodyText}>
            <TouchableOpacity
              style={styles.touch}
              onPress={this.goToContractScreen}>
              <Icon
                name="file-alt"
                backgroundColor=""
                color="#ff4d94"
                size={30}
                style={{marginLeft: 10,marginRight:15}}
              />
              <Text style={{fontSize: 20, marginLeft: 15,marginTop:"1%"}}>Hợp đồng</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* footer */}
        <View style={styles.footer}>
          <View style={styles.footerText}>
            <TouchableOpacity
              style={styles.touch}
              onPress={this.onhandleLogout}>
              <Icon
                name="sign-out-alt"
                backgroundColor=""
                color="#99b3ff"
                size={25}
                style={{marginLeft: 10}}
              />
              <Text style={{fontSize: 20, marginLeft: 15,marginTop:"1%"}}>Đăng Xuất</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
};
const styles = StyleSheet.create({

  header: {
    flex: 1
  },
  body: {
    flex: 10,
    borderTopWidth: 1,

  },
  footer: {
    flex: 1,
    borderTopWidth: 1
  },
  footerText: {
    marginTop: 5,
    marginHorizontal: 1,
    flexDirection: 'row',
  },
  bodyText: {
    marginTop: 5,
    marginHorizontal: 1,
    flexDirection: 'row',
  },
  headerText: {
    marginTop: 5,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  touch: {
    flexDirection: 'row',
    backgroundColor: '#FFFF',
    width: '100%',
    textAlign: 'center',
  },

});
export default DrawContentContent;
