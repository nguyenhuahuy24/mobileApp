import React from 'react';
import { View, Text, Button, StyleSheet, FlatList,SafeAreaView,TouchableOpacity } from 'react-native';
import UserAvatar from 'react-native-user-avatar';
const Messages = [
  {
    id: '1',
    userName: 'Huy Phạm',
    userImg: "https://i.pinimg.com/736x/fa/02/02/fa0202572e8aa734cedb154c413a4846.jpg",
    messageTime: '4 mins ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
];

export default class MessagesScreen extends React.Component {
  constructor(props) {
    super(props);
    
  }
  toChat= (item)=>{
     this.props.navigation.navigate('Chat',{userName: item.userName})
  }
 renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() =>this.toChat(item)}>
      <View style={{flex:1,backgroundColor:'#ffff'}}>
        <View style={{margin:"2%",flexDirection:'row',justifyContent:'space-between'}}>
                        <View style={{flexDirection: 'row', flex:1}}>
                            <View style={{marginTop:"1%"}}>
                                <UserAvatar 
                                size={60} bgColors={['#ffff']} 
                                name="Avishay Bar" 
                                src={item.userImg}
                                />
                            </View>
                            <View style={{flex:1}}>
                                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                    <Text style={{fontSize: 18,marginLeft:"2%"}}>{item.userName}</Text>
                                    <Text style={{fontSize: 13}}>{item.messageTime}</Text>
                                </View>
                                
                                <Text style={{fontSize: 15,marginLeft:"2%"}}>{item.messageText}</Text>
                        </View>
                        </View>
           
        </View>
      </View>
    </TouchableOpacity>
  )
  render()
   {
    return (
      <View style={styles.container}>
         <SafeAreaView>
             <FlatList
                  data={Messages}
                  renderItem={this.renderItem}
                  keyExtractor={(item, index) => index.toString()}
                />
          </SafeAreaView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor:'#ffff',
    flex:1
    
  },
});