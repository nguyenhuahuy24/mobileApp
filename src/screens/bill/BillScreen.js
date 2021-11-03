import React, { Component } from "react";
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, TextInput, SafeAreaView,SectionList } from 'react-native';
import moment from 'moment';
import {formatNumber } from 'react-native-currency-input';

const data =[{
      _id: 'abc123',
      RoomNumber: "1",
      Status: "0",
      TotalBill: "666666",
      OtherCosts: "Rác: 5000  Wifi: 50000 Trợ cấp: 200000000",
      WaterFee: "38500",
      ElectricFee: "50000",
      AmountOfElectric: "10",
      AmountOfWater:"11",
      RoomPrice:"1000000",
      DateCreate: "2021-10-31T08:13:21.551+00:00",
      StartDate: "2021-09-30T17:00:00.000+00:00",
      EndDate: "2021-10-31T17:00:00.000+00:00"
  },
    {
      _id: 'abc1asdasd123',
      RoomNumber: "1",
      Status: "1",
      TotalBill: "5000000",
      OtherCosts: "Rác: 5000  Wifi: 50000",
      WaterFee: "45656",
      ElectricFee: "50000",
      AmountOfElectric: "10",
      AmountOfWater:"11",
      RoomPrice:"1000000",
      DateCreate: "2021-09-30T08:13:21.551+00:00",
      StartDate: "2021-08-31T17:00:00.000+00:00",
      EndDate: "2021-09-30T17:00:00.000+00:00"
}
]
export default class BillScreen extends React.Component
{
  
  constructor(props) {
    super(props);
    this.state = {
      bill_list: data,
      showX: false,
      global_search: "",
    }
  }
  currentNumber =(value)=>{
      return formatNumber(value, {
      separator: ',',
      suffix: ' VND',
    })
 }
  handleSearch = value => {
    if(value ===""|| !value)
    {
      this.setState({global_search:value,showX:false,bill_list:data});
    }
    else{

      this.setState({global_search: value,showX:true});
        //hàm serach
        let arrayTemp = [];
        for (let i = 0; i < data.length; i++) {
          if (moment(data[i].DateCreate).format('MM-YYYY').toLowerCase().includes(value.toLowerCase())) {
            arrayTemp.push(data[i]);
          }
        }
        this.setState({bill_list: arrayTemp})
    }
  };
  
  ToDetail=({item})=>
  {
    //this.props.getDetailProject(item.id)
    this.props.navigation.navigate('BillDetail',{item})
  }
  
  statusBodyTemplate=(rowData)=> {
    if (rowData === "1") {
       return <Text style={styles.product_status_1}>{"Đã thanh toán"}</Text>;
    }
    if (rowData === "0") {return  <Text style={styles.product_status_0}>{"Chưa thanh toán"}</Text>; }
  }
  renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => this.ToDetail({item})}>
      <View style={styles.body}>
        <View style={{ margin:"2%"}}>
          <Text style={styles.name_bill}>Hóa đơn tháng {moment(item.DateCreate).format('MM-YYYY')}</Text>
          <Text style={styles.label_bill}>Phòng: {item.RoomNumber}</Text>
          <Text style={styles.label_bill}>Tổng tiền: {this.currentNumber(item.TotalBill)}</Text>
          <Text style={{ fontSize: 17 }}>Tình trạng: {this.statusBodyTemplate(item.Status)}</Text>
        
        </View>
      </View>
    </TouchableOpacity>
  );
  render() {
    
    return (
      <View style={{ backgroundColor: '#e5e5e5', flex: 1 }}>
        <View style={styles.inputField}>
          <View style={{justifyContent:"center",marginLeft: "2%"}}>
              <Icon
              name="search"
              backgroundColor=""
              color="grey"
              size={22}
              
            />

          </View>         
          <TextInput
            name="search"
            style={styles.TextInput}
            placeholder="Hóa đơn tháng cần tìm"
            value={this.state.global_search}
            onChangeText={value=>this.handleSearch(value)}
          />
            <View>
          {this.state.showX ? (<TouchableOpacity onPress={()=> this.handleSearch("") }>
            <Icon
              name="times"
              backgroundColor=""
              color="grey"
              size={20}
              style={{ marginTop: 9, marginRight: 7 }}
            />
          </TouchableOpacity>):null}
        </View>
        </View>
      
        <View style={{ flex: 1 }}>
          <SafeAreaView>
             <FlatList
                  data={this.state.bill_list}
                  renderItem={this.renderItem}
                  keyExtractor={(item, index) => index.toString()}
                />
          </SafeAreaView>
        </View>

      </View>
    );
  }
}
const styles = StyleSheet.create({
  body: {
    elevation: 1,
    margin:'2%',
    backgroundColor: '#ffff',
    borderColor: '#e5e5e5',
    borderRadius: 5,
  },
  name_bill: {
    fontSize: 19,  color: "#737373", fontWeight:'bold'
  },
  label_bill: {
    fontSize: 17, marginBottom: '2%'
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
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
  TextInput: {
    color: '#000000',
    borderColor: 'black',
    flex: 1,
    paddingRight: 15,
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