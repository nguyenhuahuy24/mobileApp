import React, { Component } from "react";
import {  View,Text,StyleSheet, TouchableOpacity,SafeAreaView,ScrollView,RefreshControl} from 'react-native';
import {formatNumber } from 'react-native-currency-input';

import { connect } from 'react-redux';
import { dataStatus } from '../../utility/config'
import { withGlobalContext } from '../../GlobalContextProvider';
import { getContract } from '../../redux/action/contract/ContractAction';


class ContractScreen extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {
      contract: "",
      show: false,
      global_search: "",
      refresh:false
    }
  }
  componentDidMount() {
    this.props.getContract();

  }
  getData=()=>{
    this.setState({refresh:true})
    this.props.getContract();
    setTimeout(
      function () {
          this.setState({refresh:false})
      }
        .bind(this),
      2000
    );
  }
  componentDidUpdate(prevProps) {
    if (this.props.contract !== prevProps.contract) {
      if (this.props.contract.status === dataStatus.SUCCESS) {
        if(Object.values(this.props.contract.data).length !==0 ){
          let Contract = this.props.contract.data[0]
          let data=[]
          data.push({
            _id: Contract._id,
            AddressHouse: Contract.AddressHouse,
            Deposit: Contract.Deposit,
            RentalPeriod: Contract.RentalPeriod,
            Status:Contract.Status,
            // test
            DateCreate: Contract.DateCreate,
            ArrivalDate: Contract.ArrivalDate,
            ExpirationDate: Contract.ExpirationDate,
            HouseName: Contract.House.Name,
            RoomName: Contract.RoomName,
            //lessor
            Lessor_Name: Contract.Lessor.Name,
            Lessor_Phone: Contract.Lessor.Phone,
            Lessor_PermanentAddress: Contract.Lessor.PermanentAddress,
            Lessor_DateCmnd: Contract.Lessor.DateCmnd,
            Lessor_PlaceCmnd:Contract.Lessor.PlaceCmnd,
            Lessor_Cmnd: Contract.Lessor.Cmnd,
            Lessor_Age: Contract.Lessor.Age,
            //Renter
            Renter_Name: Contract.Renter.Name,
            Renter_Phone: Contract.Renter.Phone,
            Renter_PermanentAddress: Contract.Renter.PermanentAddress,
            Renter_DateCmnd: Contract.Renter.DateCmnd,
            Renter_PlaceCmnd:Contract.Renter.PlaceCmnd,
            Renter_Cmnd: Contract.Renter.Cmnd,
            Renter_Age: Contract.Renter.Age,
          })
          console.log("data: ",data[0])
          this.setState({contract:data[0],show:true})
        
        }
        else{
          this.setState({show:false})
        }
      }
   
    }
  }
  ToDetail = ()=>
  {
     this.props.navigation.navigate('ContractDetail',this.state.contract)
  }
  currentNumber =(value)=>{
      return formatNumber(value, {
      separator: ',',
      suffix: ' VND',
    })
 }
  statusBodyTemplate=(rowData)=> {
    if (rowData === 3) {
       return <Text style={styles.product_status_0}>{"Chờ bên thuê nhà xác nhận"}</Text>;
    }
    if (rowData === 1) {return  <Text style={styles.product_status_1}>{"Đã xác nhận"}</Text>; }
  }
  render(){
   
    return (
      
     <SafeAreaView style={{ flex: 1}} >
      <ScrollView
        contentContainerStyle={{flex:1}}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refresh}
            onRefresh={()=>this.getData()}
          />
        }
      >
        <View style={{ flex: 1}}>
      {this.state.show===false && 
        <View style={{flex:1,justifyContent:'center',alignItems:"center"}}>
        <Text style={{fontSize:30,fontWeight:'500'}}>CHƯA CÓ HỢP ĐỒNG</Text>
      </View>}
      {this.state.show===true && <View style={styles.body}>
        <TouchableOpacity style={styles.modal}>
            <Text style={{fontSize:20, fontWeight:'bold',margin:'2%'}}>Thông tin hợp động</Text>
            <View style={styles.text_contract}>
              <Text style={{fontSize:17}}>Bên thuê:</Text>
              <Text style={{fontSize:17}}>{this.state.contract.Renter_Name}</Text>
            </View>
            <View style={styles.text_contract}>
              <Text style={{fontSize:17}}>Tiền cọc:</Text>
              <Text style={{fontSize:17}}>{this.currentNumber(this.state.contract.Deposit)}</Text>
            </View>
            <View style={styles.text_contract}>
              <Text style={{fontSize:17}}>Thời gian hợp đồng:</Text>
              <Text style={{fontSize:17}}>{this.state.contract.RentalPeriod}</Text>
            </View>
            <View style={styles.text_contract}>
              <Text style={{fontSize:17,flex:1}}>Địa chỉ nhà thuê:</Text>
              <Text style={{fontSize:17,flex:1}}>{this.state.contract.AddressHouse}</Text>
            </View>
            <View style={styles.text_status}>
              <Text style={{fontSize:17,flex:1}}>Trạng thái hợp đồng:</Text>
              <Text style={{fontSize:17,flex:1}}>{this.statusBodyTemplate(this.state.contract.Status)}</Text>
            </View>
        </TouchableOpacity>
       
          <TouchableOpacity style={styles.button} onPress={()=>this.ToDetail()}>
            <Text style={{ color: "white", fontSize: 17 }}>XEM CHI TIẾT {this.state.contract.Status==3 &&
            <Text>& XÁC NHẬN</Text>
            }</Text>
          </TouchableOpacity>
      
      </View>}
      
    </View>
      </ScrollView>
    </SafeAreaView>
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
  product_status_0: {
    backgroundColor: '#FFCDD2',
    color: '#C63737',
  },
  product_status_1: {
    backgroundColor: '#C8E6C9',
    color: '#256029',
} 
})
function mapStateToProps(state) {
  return {
    contract: state.ContractReducer.contract,
  };
}
export default withGlobalContext(connect(mapStateToProps, { getContract, })(ContractScreen));