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
import IconOcticons from 'react-native-vector-icons/Octicons';
import { Logout } from '../../redux/action/authenticateAction/AuthenticateAction'
import { withGlobalContext } from '../../GlobalContextProvider';
import { dataStatus } from "../../utility/config"
class DrawContent extends React.Component {
  constructor(props) {
    super(props);
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
                name="money"
                backgroundColor=""
                color="#ff4d94"
                size={30}
                style={{ marginLeft: 10 }}
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
                color="#ff4d94"
                size={30}
                style={{ marginLeft: 10, marginRight: 15 }}
              />
              <Text style={{ fontSize: 20, marginLeft: 15, marginTop: "1%" }}>Hợp đồng</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bodyText}>
            <TouchableOpacity
              style={styles.touch}
              onPress={() => this.props.navigation.navigate('Messages')}>
              <Icon
                name="facebook-messenger"
                backgroundColor=""
                color="#ff4d94"
                size={30}
                style={{ marginLeft: 10, marginRight: 10 }}
              />
              <Text style={{ fontSize: 20, marginLeft: 12, marginTop: "1%" }}>Trò chuyện</Text>
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
                size={25}
                style={{ margin: "3%" }}
              />
              <Text style={{ fontSize: 20, margin: "3%" }}>Đổi Mật Khẩu</Text>
            </TouchableOpacity>

          </View>
          <View style={styles.footerText}>
            <TouchableOpacity
              style={styles.touch}
              onPress={this.onhandleLogout}>
              <Icon
                name="sign-out-alt"
                backgroundColor=""
                color="#99b3ff"
                size={25}
                style={{ margin: "3%" }}
              />
              <Text style={{ fontSize: 20, margin: "3%" }}>Đăng Xuất</Text>
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
    flex: 8,
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
function mapStateToProps(state) {
  return {
    logoutStatus: state.AuthenticateReducer.logoutStatus
  };
}
export default withGlobalContext(connect(mapStateToProps, { Logout })(DrawContent))
