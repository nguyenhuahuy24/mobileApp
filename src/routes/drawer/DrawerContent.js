import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Alert,
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Fontisto';
import { Logout } from '../../redux/action/authenticateAction/AuthenticateAction'
import { withGlobalContext } from '../../GlobalContextProvider';
import { dataStatus,UserInfo } from "../../utility/config"
class DrawContent extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      userProfile:this.props.user.data.customerInfo,
    }
  }
  
  componentDidUpdate(prevProps) {
    if (this.props.logoutStatus !== prevProps.logoutStatus) {
      if (this.props.logoutStatus.status === dataStatus.SUCCESS) {
        const { setSignin } = this.props.global;
        setSignin();
      } else {
        Alert.alert("Error", this.props.logoutStatus.messge)
      }
    }
  }
  onhandleLogout = () => {
    this.props.Logout()
  };
  goToBillScreen = () => {
    this.props.navigation.navigate('Bill');
  };
  goToContractScreen = () => {
    this.props.navigation.navigate('Contract');
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        {/* header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Welcome to Nhà Trọ Huy</Text>
          <Text
            style={{
              marginTop: 10,
              textAlign: 'center',
              fontStyle: 'italic',
              marginBottom: 15,
              fontSize:20,
            }}>Xin chào !!! {this.state.userProfile.Name}
          </Text>
        </View>
        {/* body */}
        <View style={styles.body}>
          <View style={styles.bodyText}>
            <TouchableOpacity
              style={styles.touch}
              onPress={this.goToBillScreen}>
              <Icon
                name="usd"
                backgroundColor=""
                color="#99b3ff"
                size={30}
                style={{ marginLeft: "5%",marginRight: 20 }}
              />
              <Text style={{ fontSize: 20, marginLeft: 15, marginTop: "1%" }}>Hóa đơn</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bodyText}>
            <TouchableOpacity
              style={styles.touch}
              onPress={this.goToContractScreen}>
              <Icon
                name="file-text-o"
                backgroundColor=""
                color="#99b3ff"
                size={30}
                style={{ marginLeft: "4%",marginRight: 15}}
              />
              <Text style={{ fontSize: 20, marginLeft: 15, marginTop: "1%" }}>Hợp đồng</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bodyText}>
            <TouchableOpacity
              style={styles.touch}
              onPress={() => this.props.navigation.navigate('Messages')}>
              <Icon2
                name="messenger"
                backgroundColor=""
                color="#99b3ff"
                size={30}
                style={{ marginLeft: "4%",marginRight: 10}}
              />
              <Text style={{ fontSize: 20, marginLeft: 15, marginTop: "1%" }}>Trò chuyện</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bodyText}>
            <TouchableOpacity
              style={styles.touch}
              onPress={() => this.props.navigation.navigate('Assessment')}>
              <Icon
                name="star"
                backgroundColor=""
                color="#99b3ff"
                size={30}
                style={{ marginLeft: "4%",marginRight: 15}}
              />
              <Text style={{ fontSize: 20, marginLeft: 15, marginTop: "1%" }}>Đánh giá</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* footer */}
        <View style={styles.footer}>
          <View style={styles.footerText}>
            <TouchableOpacity
              style={styles.touch}
              onPress={() => this.props.navigation.navigate('ChangePassword')}>
              <Icon
                name="cog"
                backgroundColor=""
                color="#99b3ff"
                size={30}
                style={{ margin: "5%" }}
              />
              <Text style={{ fontSize: 20, margin: "5%" }}>Đổi Mật Khẩu</Text>
            </TouchableOpacity>

          </View>
          <View style={styles.footerText}>
            <TouchableOpacity
              style={styles.touch}
              onPress={this.onhandleLogout}>
              <Icon
                name="power-off"
                backgroundColor=""
                color="#99b3ff"
                size={30}
                style={{ margin: "5%" }}
              />
              <Text style={{ fontSize: 20, margin: "5%" }}>Đăng Xuất</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
};
const styles = StyleSheet.create({

  header: {
    flex: 1,
    marginBottom:"3%"
  },
  body: {
    flex: 7,
    borderTopWidth: 1,

  },
  footer: {
    flex: 2,
    borderTopWidth: 1
  },
  footerText: {
    marginTop: 5,
    marginHorizontal: 1,
    flexDirection: 'row',
  },
  bodyText: {
    marginTop: '7%',
    marginHorizontal: 1,
    flexDirection: 'row',
  },
  headerText: {
    marginTop: "5%",
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
function mapStateToProps(state) {
  return {
    user: state.AuthenticateReducer.user,
    logoutStatus: state.AuthenticateReducer.logoutStatus
  };
}
export default withGlobalContext(connect(mapStateToProps, { Logout })(DrawContent))
