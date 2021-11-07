import React, { Component } from "react";
import {  View,Text,StyleSheet, TouchableOpacity} from 'react-native';
import {formatNumber } from 'react-native-currency-input';

const item = {
    AddressHouse: "123/12a đường Dương Đình Hội, Phường phước Long, Quận 9, Tp Hồ Chí Minh",
    ArrivalDate: "2021-10-27T17:00:00.000Z",
    DateCreate: "2021-10-31T06:33:05.243Z",
    Deposit: "1000000",
    ExpirationDate: "2023-10-27T17:00:00.000Z",
    House: "test house",
    Rent: "200000",
    RentalPeriod: "2 năm",
    Renter: "Nguyễn Huy",
    Room: "2",
    Status: "1",
    _id: "617e38b7dbf6e92364465740"
  }
export default class ContractScreen extends React.Component
{
  
  ToDetail=()=>
  {
    this.props.navigation.navigate('ContractDetail',{item})
  }
  currentNumber =(value)=>{
      return formatNumber(value, {
      separator: ',',
      suffix: ' VND',
    })
 }
  statusBodyTemplate=(rowData)=> {
    if (rowData === "3") {
       return <Text style={styles.product_status_1}>{"Chờ bên thuê nhà xác nhận"}</Text>;
    }
    if (rowData === "1") {return  <Text style={styles.product_status_0}>{"Đã xác nhận"}</Text>; }
  }
  render(){
   
    return (
      <View style={{ flex: 1}}>
      <View style={styles.header}>
          <Text style={{fontSize:27, fontWeight:'bold'}}>Tóm lượt hợp động</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.modal}>
            <Text style={{fontSize:20, fontWeight:'bold',margin:'2%'}}>Thông tin hợp động</Text>
            <View style={styles.text_contract}>
              <Text style={{fontSize:17}}>Bên thuê:</Text>
              <Text style={{fontSize:17}}>{item.Renter}</Text>
            </View>
            <View style={styles.text_contract}>
              <Text style={{fontSize:17}}>Tiền cọc:</Text>
              <Text style={{fontSize:17}}>{this.currentNumber(item.Deposit)}</Text>
            </View>
            <View style={styles.text_contract}>
              <Text style={{fontSize:17}}>Thời gian hợp đồng:</Text>
              <Text style={{fontSize:17}}>{item.RentalPeriod}</Text>
            </View>
            <View style={styles.text_contract}>
              <Text style={{fontSize:17,flex:1}}>Địa chỉ nhà thuê:</Text>
              <Text style={{fontSize:17,flex:1}}>{item.AddressHouse}</Text>
            </View>
            <View style={styles.text_status}>
              <Text style={{fontSize:17,flex:1}}>Trạng thái hợp đồng:</Text>
              <Text style={{fontSize:17,flex:1}}>{this.statusBodyTemplate(item.Status)}</Text>
            </View>
        </View>
       
          <TouchableOpacity style={styles.button} onPress={this.ToDetail}>
            <Text style={{ color: "white", fontSize: 17 }}>XEM CHI TIẾT {item.Status=='3' &&
            <Text>& XÁC NHẬN</Text>
            }</Text>
          </TouchableOpacity>
      
      </View>
    </View>
    );
  }
}
const styles = StyleSheet.create({
  header:{
    
     margin:'3%'
  },
  body:{
    flex:1,
    backgroundColor:'#e6e6e6',
    alignItems:'center',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  modal:{
    height:'68%',
    width:'90%',
    margin:'2%',
    backgroundColor:'#ffffff',
    borderRadius: 7,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 8.25,
    elevation: 10,
    
  },
  text_contract:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderStyle:'dashed',
    borderBottomWidth:0.5,
    marginTop:'3%',
    marginRight:'4%',
    marginLeft:'4%',
    marginBottom:'4%'
    
  },
  text_status:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop:'2%',
    marginRight:'4%',
    marginLeft:'4%',
    marginBottom:'4%'
  },
  button: {
    height:"10%",
    width:'90%',
    backgroundColor: "#DB3022",
    borderRadius: 25,
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
    marginBottom:'6%'
  },
  product_status_1: {
    color: '#C63737',
  },
  product_status_0: {
    color: '#256029',
} 
})