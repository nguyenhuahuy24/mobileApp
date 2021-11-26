import React, { Component } from "react";
import Icon from 'react-native-vector-icons/FontAwesome';
import CheckBox from '@react-native-community/checkbox';
import {formatNumber } from 'react-native-currency-input';

//import MapView from 'react-native-maps';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Modal,
  SafeAreaView,
  FlatList,
  ScrollView,
  Image
} from 'react-native';
const data =[{
      _id: 'abc1asdasd123',
      Room_Name: "1",
      Dai: "8",
      Rong: "11",
      Status: "1", 
      Total:"20000",
      Image:[
        require('../../image/room/room-1.jpg'),
        require('../../image/room/room-2.jpg'),
        require('../../image/room/room-3.jpg'),
        
      ]
    },
    {
      _id: 'abc1asdasd123',
      Room_Name: "2",
      Dai: "4",
      Rong: "5",
      Status: "0",     
      Total:"45000",
      Image:[
        require('../../image/room/room-4.jpg'),
        require('../../image/room/room-5.jpg'),
        require('../../image/room/room-3.jpg'),
        
      ]
    }
    
];

export default class SearchDetailScreen extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        list_room:data,
        modalVisible:false,
        list_image:[]
    }
  }

  currentNumber =(value)=>{
      return formatNumber(value, {
      separator: ',',
      suffix: ' VND',
    })
 }
  ToDetail=({item})=>
  {
    this.setState({list_image:item.Image,modalVisible:true})
  }
  statusBodyTemplate=(rowData)=> {
    if (rowData === "1") {
       return <Text style={styles.product_status_1}>{"Trống"}</Text>;
    }
    if (rowData === "0") {return  <Text style={styles.product_status_0}>{"Đã thuê"}</Text>; }
  }
  renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => this.ToDetail({item})}>
      <View style={styles.body_item}>
        <View style={{ margin:"2%"}}>
          <Text style={styles.name_item}>Phòng số: {item.Room_Name}</Text>
          <Text style={styles.label_item}> - Chiều dài: {item.Dai} (m)</Text>
          <Text style={styles.label_item}> - Chiều rộng: {item.Rong} (m)</Text>
          <Text style={styles.label_item}> - Giá phòng: {this.currentNumber(item.Total)}</Text>
          <Text style={{ fontSize: 17 }}> - Tình trạng: {this.statusBodyTemplate(item.Status)}</Text>
        
        </View>
      </View>
    </TouchableOpacity>
  );
   renderImage= ({ item }) => (  
      <View style={{height:280,width:280,marginLeft:15}}>
          <Image source={item} style={{flex:1,width:null,height:null,resizeMode:'cover'}} />
      </View>
  );
  render() {
    return (
      <View style={{flex: 1,backgroundColor:'#f2f2f2'}}>
        <Modal animationType="slide" transparent={true} visible={this.state.modalVisible}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              {/* header modal */}
              <Text
                style={{
                  fontSize: 20,
                  marginTop: 5,
                  paddingBottom: '3%',
                  color:"#555555",
                  textAlign: 'center',
                  fontWeight: 'bold',
                  
                }}>
                Hình ảnh của Phòng
              </Text>
           
              {/* body */}
              <View>
                <FlatList
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  data={this.state.list_image}
                  renderItem={this.renderImage}
                  keyExtractor={(item, index) => `${index}`}
                />
              </View>
            </View>
          </View>
          <View style={{position: "absolute", bottom:0,top:0,left:0,right:0,zIndex:1, backgroundColor:'rgba(0,0,0,0.5)'}} 
                onTouchStart={() => this.setState({modalVisible:false})}
           />
        </Modal>
        <Text style={{fontSize:18,fontWeight:'bold',margin:'1%'}}>*Nhấn vào Phòng để xem hình ảnh*</Text>
        <SafeAreaView>
             <FlatList
                  data={this.state.list_room}
                  renderItem={this.renderItem}
                  keyExtractor={(item, index) => index.toString()}
                />
          </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  list:{
    flex:1,
    backgroundColor:'#ffff',
    margin:'2%',
    marginBottom:'16%',
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
    elevation: 2,
    marginLeft:"2%",
    marginRight:"2%",
    marginBottom:"2%",
    backgroundColor: '#ffff',
    borderColor:'#c5c5c5',
    borderRadius: 10,
    borderWidth:0.5

  },
  name_item: {
    fontSize: 19,  color: "#ff1a1a", fontWeight:'bold'
  },
  label_item: {
    fontSize: 17, marginBottom: '2%'
  },
  centeredView: {
    flex: 1,
    justifyContent:'center'
  },
  modalView: {
    marginLeft: "3%",
    marginRight: "3%",
    marginTop: "30%",
    marginBottom:"48%",
    backgroundColor: 'white',
    borderRadius: 20,
    padding:5,
    elevation: 5,
    zIndex: 100,
    flex:1,
  },
});