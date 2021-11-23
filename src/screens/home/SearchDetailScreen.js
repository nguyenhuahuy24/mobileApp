import React, { Component } from "react";
import Icon from 'react-native-vector-icons/FontAwesome';
import CheckBox from '@react-native-community/checkbox';

//import MapView from 'react-native-maps';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Modal,
  SafeAreaView,
  FlatList
} from 'react-native';
const data =[{
      _id: 'abc1asdasd123',
      House_Name: "Max",
      Phone: "09778908123",
      Address: "65/20, đường tang nhon phú, phường Phước Long B, Tp Thủ Đức, Tp Hồ Chí Minh",
      Status: "0", 
    },
    {
      _id: 'abc1asdasd123',
      House_Name: "Min",
      Phone: "09778908123",
      Address: "65/24, đường tang nhon phú, phường Phước Long B, Tp Thủ Đức, Tp Hồ Chí Minh",
      Status: "1",     
    }
    
]
export default class SearchDetailScreen extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
    
    }
  }


  ToDetail=({item})=>
  {
    //this.props.getInfoBill(item._id)
  }
  statusBodyTemplate=(rowData)=> {
    if (rowData === "1") {
       return <Text style={styles.product_status_1}>{"Còn Phòng"}</Text>;
    }
    if (rowData === "0") {return  <Text style={styles.product_status_0}>{"Hết Phòng"}</Text>; }
  }
  renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => this.ToDetail({item})}>
      <View style={styles.body_item}>
        <View style={{ margin:"2%"}}>
          <Text style={styles.name_item}>Tên nhà trọ: {item.House_Name}</Text>
          <Text style={styles.label_item}> - Số điện thoại: {item.Phone}</Text>
          <Text style={styles.label_item}> - Địa chỉ: {item.Address}</Text>
          <Text style={{ fontSize: 17 }}> - Tình trạng: {this.statusBodyTemplate(item.Status)}</Text>
        
        </View>
      </View>
    </TouchableOpacity>
  );
  
  render() {
    return (
      <View style={{flex: 1,backgroundColor:'#e5e5e5'}}>
        <Text> Detail</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  list:{
    flex:1,
    backgroundColor:'#ffff',
    margin:'2%',
    marginBottom:'19%',
    borderRadius:10,
    borderWidth:1
  },
 
  inputField: {
    margin:"1%",
    borderColor: '#e5e5e5',
    borderRadius: 5,
    elevation: 1,
    height: 40,
    flexDirection: 'row',
    backgroundColor:"#ffff"
  },
  inputField_drop: {
    margin:"1%",
    borderColor: '#e5e5e5',
    borderRadius: 5,
    elevation: 1,
    height: 40,
    flexDirection: 'row',
    backgroundColor:'#ffffff',
    width:"50%"
  },
  TextInput: {
    color: '#000000',
    borderColor: 'black',
    flex: 1,
    paddingRight: 15,
    
  }, 
  dropdown: {
    marginTop:"1%",
    marginLeft:"1%",
    marginRight:"1%",
    flexDirection: 'row',
  }, 
  input:{
      borderBottomWidth: 1,
      flexDirection: 'row',
      backgroundColor:"#ffff",
      
  },
  product_status_0: {
    backgroundColor: '#FFCDD2',
    color: '#C63737',
  },
  product_status_1: {
    backgroundColor: '#C8E6C9',
    color: '#256029',
  },
  body_item: {
    elevation: 1,
    margin:'2%',
    backgroundColor: '#ffff',
    borderColor:'#c5c5c5',
    borderRadius: 15,
    borderWidth:1
  },
  name_item: {
    fontSize: 19,  color: "#ff1a1a", fontWeight:'bold'
  },
  label_item: {
    fontSize: 17, marginBottom: '2%'
  },
});