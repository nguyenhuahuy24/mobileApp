import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, ScrollView, Text, Button, StyleSheet } from 'react-native';
import { Bubble, GiftedChat, Send } from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { URL, url_image } from '../../utility/config';
import axios from 'axios';
import { connect, useSelector } from 'react-redux';
import { io } from "socket.io-client";

const ChatScreen = ({ route, navigation, user }) => {
  const { roomchat } = route.params
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const socket = useRef();
  useEffect(() => {
    socket.current = io(url_image);
    socket.current.on("getMessage", (data) => {
      console.log("nhận message:", data)
      axios.get(URL + "/message/Id/" + data.messageId).then((res) => {
        console.log("MESSAGE", res.data)
        setMessages((previousMessages) =>
          GiftedChat.append(previousMessages, res.data),
        );
      })
      // const message = {
      //   sender: data.senderId,
      //   text: data.text,
      //   createdAt: Date.now(),
      // };
      // setMessages((previousMessages) =>
      //   GiftedChat.append(previousMessages, message),
      // );
    });
  }, []);


  useEffect(() => {
    socket.current.emit("addUser", user.customerInfo._id);
  }, [user]);
  useEffect(() => {
    const getMessageAPI = async () => {
      try {
        const res = await axios.get(URL + "/message/" + roomchat._id)
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessageAPI();

  }, [roomchat]);
  const onSend = useCallback((messages = []) => {
    const receiverId = roomchat.Members.find(
      (member) => member !== user.customerInfo._id
    );
    const message = {
      SenderId: user.customerInfo._id,
      Roomchat: roomchat._id,
      Text: messages[0].text
    }
    console.log(messages)
    axios.post(URL + "/message", message).then((res) => {
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, messages),
      );
      socket.current.emit("sendMessage", {
        senderId: user.customerInfo._id,
        receiverId: receiverId,
        text: messages[0].text,
        messageId: res.data._id
      });
    })

  }, []);

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View>
          <MaterialCommunityIcons
            name="send-circle"
            style={{ marginBottom: 5, marginRight: 5 }}
            size={32}
            color="#2e64e5"
          />
        </View>
      </Send>
    );
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#2e64e5',
          },
        }}
        textStyle={{
          right: {
            color: '#fff',
          },
        }}
      />
    );
  };

  const scrollToBottomComponent = () => {
    return (
      <FontAwesome name='angle-double-down' size={22} color='#333' />
    );
  }

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: user.customerInfo._id,
      }}
      renderBubble={renderBubble}
      alwaysShowSend
      renderSend={renderSend}
      scrollToBottom
      scrollToBottomComponent={scrollToBottomComponent}
    />
  );
};
function mapStateToProps(state) {
  return {
    user: state.AuthenticateReducer.user.data
  };
}
export default connect(mapStateToProps, {})(ChatScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});