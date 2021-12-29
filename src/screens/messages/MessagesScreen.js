import React from 'react';
import { View, Text, Button, StyleSheet, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import UserAvatar from 'react-native-user-avatar';
import axios from 'axios';
import { URL, url_image } from '../../utility/config'
import { getAvartar } from '../../utility/common'
import { connect } from 'react-redux';
import Chatroom from './Chatroom';
class MessagesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roomchat: {}
    }
  }
  componentDidMount() {
    axios.get(`${url_image}/roomchat/${this.props.customer.customerInfo._id}`).then((response) => {
      this.setState({ roomchat: response.data })
    })
  }
  toChat = (item) => {
    this.props.navigation.navigate('Chat', { roomchat: item })
  }
  renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={{ marginTop: 10, elevation: 2, alignItems: "center" }}
        onPress={() => this.toChat(item)}>
        <Chatroom item={item} />
      </TouchableOpacity>
    )
  }
  render() {
    console.log(this.state.roomchat)
    return (
      <View style={styles.container}>
        <SafeAreaView >
          <FlatList
            data={this.state.roomchat}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </SafeAreaView>
      </View>
    );
  }
}
function mapStateToProps(state) {
  return {
    customer: state.AuthenticateReducer.user.data
  };
}
export default connect(mapStateToProps, {})(MessagesScreen);
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f2f2f2',
    flex: 1
  },
});