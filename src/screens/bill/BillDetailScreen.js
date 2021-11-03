import React, { Component } from "react";
import { View, Text, StyleSheet} from 'react-native';
import moment from 'moment';
import {formatNumber } from 'react-native-currency-input';
export default class BillDetailScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
  }
}
statusBodyTemplate=(rowData)=> {
    if (rowData === "1") {
       return <Text style={styles.product_status_1}>{"Đã thanh toán"}</Text>;
    }
    if (rowData === "0") {return  <Text style={styles.product_status_0}>{"Chưa thanh toán"}</Text>; }
  }
 currentNumber =(value)=>{
      return formatNumber(value, {
      suffix: ' VND',
    })
 }
  render() {
    const {item}=this.props.route.params
    return (
      <View style={{ flex: 1, backgroundColor: '#e6e6e6',alignItems:'center', }}>
          <View style={styles.body}>
            <Text style={{fontSize:20, fontWeight:'bold',margin:'2%'}}>Chi tiết hóa đơn</Text>
            <View style={styles.text_contract}>
              <Text style={{fontSize:17}}>Ngày tính tiền:</Text>
              <Text style={{fontSize:17}}>{moment(item.DateCreate).format('DD-MM-YYYY')}</Text>
            </View>
            <View style={styles.text_contract}>
              <Text style={{fontSize:17}}>Tên phòng:</Text>
              <Text style={{fontSize:17}}>{item.RoomNumber}</Text>
            </View>
            <View style={styles.text_contract}>
              <Text style={{fontSize:17}}>Tiền phòng:</Text>
              <Text style={{fontSize:17}}>{this.currentNumber(item.RoomPrice)}</Text>
            </View>
            <View style={styles.text_contract}>
              <Text style={{fontSize:17}}>Chỉ số Nước sử dụng:</Text>
              <Text style={{fontSize:17}}>{item.AmountOfWater}</Text>
            </View>
            <View style={styles.text_contract}>
              <Text style={{fontSize:17}}>Tiền nước:</Text>
              <Text style={{fontSize:17}}>{this.currentNumber(item.WaterFee)}</Text>
            </View>
            <View style={styles.text_contract}>
              <Text style={{fontSize:17}}>Chỉ số Điện sử dụng:</Text>
              <Text style={{fontSize:17}}>{item.AmountOfElectric}</Text>
            </View>
            <View style={styles.text_contract}>
              <Text style={{fontSize:17}}>Tiền điện:</Text>
              <Text style={{fontSize:17}}>{this.currentNumber(item.ElectricFee)}</Text>
            </View>
            <View style={styles.text_contract}>
              <Text style={{fontSize:17,flex:1}}>Các phí dịch vụ khác:</Text>
              <Text style={{fontSize:17,flex:1}}>{item.OtherCosts}</Text>
            </View>
            <View style={styles.text_contract}>
              <Text style={{fontSize:17}}>Tình trạng:</Text>
              <Text style={{fontSize:17}}>{this.statusBodyTemplate(item.Status)}</Text>
            </View>
            <View style={styles.text_bill}>
              <Text style={{fontSize:20,fontWeight:'bold',flex:1}}>Tổng tiền:</Text>
              <Text style={{fontSize:20}}>{this.currentNumber(item.TotalBill)}</Text>
            </View>
          </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  body: {
    width:'90%',
    height:'85%',
    borderRadius: 7,
    backgroundColor:'#ffffff',
    marginTop:'5%',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 8,
    elevation: 10,
    },
 text_contract:{
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderStyle:'dashed',
    borderBottomWidth:0.5,
    marginTop:'3%',
    marginRight:'4%',
    marginLeft:'4%',
    marginBottom:'4%',
  },
  text_bill:{
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop:'1%',
    marginRight:'4%',
    marginLeft:'4%',
    marginBottom:'4%'
  },
  
 
  product_status_0: {
    backgroundColor: '#FFCDD2',
    color: '#C63737',
  },
  product_status_1: {
    backgroundColor: '#C8E6C9',
    color: '#256029',
} 
});

