import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Modal } from 'react-native';
import moment from 'moment';
import { formatNumber } from 'react-native-currency-input';

import { connect } from 'react-redux';
import { dataStatus } from '../../utility/config'
import { getListBillCustomer, getInfoBill } from '../../redux/action/bill/BillAction';
import { withGlobalContext } from '../../GlobalContextProvider';
import axios from "axios";
const momo = require('../../image/MoMo_Logo.png')
const atm = require('../../image/atm_logo.png')
const zalo = require('../../image/zalo_logo.png')
const viettel = require('../../image/Viettel_pay_logo.png')
import { url_image, URL } from "../../utility/config"
import { Platform, DeviceEventEmitter, NativeModules, NativeEventEmitter } from 'react-native';
import RNMomosdk from "react-native-momosdk";
const RNMomosdkModule = NativeModules.RNMomosdk;
const EventEmitter = new NativeEventEmitter(RNMomosdkModule);

class PaymentScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      select: 0,
      modalVisible: false,

      merchantname: "Nhà trọ Huy",
      merchantcode: "MOMO8SGC20220101",
      merchantNameLabel: "Nhà trọ Huy",
      billdescription: "Tiền phòng tháng " + moment(this.props.billDetail.data.EndDate).format('DD-MM-YYYY'),
      amount: this.props.billDetail.data.TotalBill,
      enviroment: "0", //"0": SANBOX , "1": PRODUCTION
    }
  }
  componentDidMount() {
    EventEmitter.addListener('RCTMoMoNoficationCenterRequestTokenReceived', (response) => {
      try {
        console.log("<MoMoPay>Listen.Event::" + JSON.stringify(response));
        if (response && response.status == 0) {
          //SUCCESS: continue to submit momoToken,phonenumber to server
          let fromapp = response.fromapp; //ALWAYS:: fromapp==momotransfer
          let momoToken = response.data;
          let phonenumber = response.phonenumber;
          let message = response.message;
          let orderId = response.refOrderId;
        } else {
          //let message = response.message;
          //Has Error: show message here
        }
      } catch (ex) { }
    });
    //OPTIONAL
    EventEmitter.addListener('RCTMoMoNoficationCenterRequestTokenState', (response) => {
      console.log("<MoMoPay>Listen.RequestTokenState:: " + response.status);
      // status = 1: Parameters valid & ready to open MoMo app.
      // status = 2: canOpenURL failed for URL MoMo app 
      // status = 3: Parameters invalid
    })
  }
  currentNumber = (value) => {
    return formatNumber(value, {
      suffix: ' VND',
    })
  }
  Payment = async () => {
    let jsonData = {};
    jsonData.partner = "merchant"
    jsonData.enviroment = this.state.enviroment; //SANBOX OR PRODUCTION
    jsonData.action = "gettoken"; //DO NOT EDIT
    jsonData.merchantname = this.state.merchantname; //edit your merchantname here
    jsonData.merchantcode = this.state.merchantcode; //edit your merchantcode here
    jsonData.merchantnamelabel = this.state.merchantNameLabel;
    jsonData.description = this.state.billdescription;
    jsonData.amount = this.state.amount;//order total amount
    jsonData.orderId = this.props.billDetail.data._id;
    jsonData.orderLabel = "Ma don hang";
    //jsonData.appScheme = "momocgv20170101";// iOS App Only , match with Schemes Indentify from your  Info.plist > key URL types > URL Schemes
    if (Platform.OS === 'android') {
      let dataPayment = await RNMomosdk.requestPayment(jsonData);
      this.momoHandleResponse(dataPayment);
    } else {
      RNMomosdk.requestPayment(jsonData);
    }
  }
  async momoHandleResponse(response) {
    try {
      if (response && response.status == 0) {
        //SUCCESS continue to submit momoToken,phonenumber to server
        let fromapp = response.fromapp; //ALWAYS:: fromapp == momotransfer
        let momoToken = response.data;
        let phonenumber = response.phonenumber;
        let message = response.message;
        axios.post(`${url_image}/bill/${this.props.billDetail.data._id}/confirmPayment`, { fromapp, momoToken, phonenumber, message }).then((res) => {
          console.log(res)
          if ("error" in res.data) {
            this.showModal()
          } else {
            this.props.getInfoBill(res.data.billId)
            this.props.getListBillCustomer()
            this.props.navigation.goBack()
          }
        })
      } else {
        this.showModal()
        //let message = response.message;
        //Has Error: show message here
      }
    } catch (ex) { }
  }
  showModal = () => {
    this.setState({ modalVisible: true })
    setTimeout(() => {
      this.setState({
        modalVisible: false,
      });
      this.props.navigation.goBack()
    }, 3000);
  }
  render() {
    const item = this.props.route.params;
    return (
      <View style={{ flex: 1, backgroundColor: '#e6e6e6' }}>
        <Modal animationType="fade" transparent={true} visible={this.state.modalVisible}>
          <View style={styles.centeredView} >
            <View style={styles.modalView}>
              <Text>Thanh toán thất bại</Text>
            </View>
          </View>
        </Modal>
        <View style={{ backgroundColor: "#fff", flex: 1 }}>
          <Text style={{ marginTop: "3%", marginLeft: "3%" }}>CHỌN KÊNH THANH TOÁN</Text>
          <ScrollView
            style={{ marginBottom: "3%" }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            <TouchableOpacity
              style={(this.state.select === 1) ? styles.touchable_select : styles.touchable}
              onPress={() => this.setState({ select: 1 })}>
              <Image source={momo} style={styles.image_logo} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.touchable}>
              <Image source={zalo} style={styles.image_logo} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.touchable}>
              <Image source={atm} style={styles.image_logo} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.touchable}>
              <Image source={viettel} style={styles.image_logo} />
            </TouchableOpacity>
          </ScrollView>
        </View>
        <View style={{ flex: 4 }}>
          <ScrollView>
            <View style={styles.current}>
              <Text style={{ marginTop: "5%", marginLeft: "3%" }}>TỔNG SỐ TIỀN THANH TOÁN</Text>
              <Text style={{ marginTop: "4%", marginLeft: "3%", color: "#ff3333", fontSize: 30 }}>{this.currentNumber(item.TotalBill)}</Text>
            </View>
            <View style={styles.info}>
              <View style={{ margin: "3%" }}>
                <View style={styles.text_contract}>
                  <Text style={{ fontSize: 17 }}>Tên phòng:</Text>
                  <Text style={{ fontSize: 17 }}>{item.RoomNumber}</Text>
                </View>
                <View style={styles.text_contract}>
                  <Text style={{ fontSize: 17 }}>Ngày tạo hóa đơn:</Text>
                  <Text style={{ fontSize: 17 }}>{moment(item.DateCreate).format('DD-MM-YYYY')}</Text>
                </View>
                <View style={styles.text_contract}>
                  <Text style={{ fontSize: 17 }}>Ngày thanh toán:</Text>
                  <Text style={{ fontSize: 17 }}>{moment(new Date()).format('DD-MM-YYYY')}</Text>
                </View>
              </View>
            </View>
          </ScrollView>
          {this.state.select === 1 &&
            <TouchableOpacity style={styles.button} onPress={() => this.Payment()}>
              <Text style={{ color: "white", fontSize: 17 }}>THANH TOÁN QUA MOMO</Text>
            </TouchableOpacity>}
          {this.state.select === 0 &&
            <TouchableOpacity style={styles.button_2} disabled>
              <Text style={{ color: "white", fontSize: 17 }}>THANH TOÁN QUA MOMO</Text>
            </TouchableOpacity>}
        </View>

      </View>
    );
  }
}
const styles = StyleSheet.create({
  touchable: {
    height: 60,
    width: 60,
    marginLeft: 10,
    borderWidth: 0.5,
    borderColor: "#cccc",
    borderRadius: 5,
    marginTop: "3%"
  },
  touchable_select: {
    height: 60,
    width: 60,
    marginLeft: 10,
    borderWidth: 3,
    borderColor: "#0099ff",
    borderRadius: 5,
    marginTop: "3%"
  },
  current: {
    backgroundColor: "white",
    borderRadius: 10,
    height: 100,
    marginTop: "3%",
    marginLeft: "5%",
    marginBottom: "5%",
    marginRight: "5%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.30,
    elevation: 13,
  },
  info: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginTop: "3%",
    marginLeft: "5%",
    marginBottom: "5%",
    marginRight: "5%",
  },
  image_logo: {
    flex: 1, width: null, height: null, resizeMode: 'cover', margin: "15%"
  },
  text_contract: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderColor: "#ddd",
    marginTop: '3%',
    marginRight: '4%',
    marginLeft: '4%',
    marginBottom: '4%',
  },
  button: {
    height: "13%",
    width: '90%',
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
    margin: "5%"
  },
  button_2: {
    height: "13%",
    width: '90%',
    backgroundColor: "#000",
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
    margin: "5%"
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',

  },
  modalView: {
    marginLeft: "5%",
    marginRight: "5%",
    marginTop: "30%",
    marginBottom: "30%",
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    elevation: 5,
    zIndex: 100,
    flex: 1,
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

function mapStateToProps(state) {
  return {
    billDetail: state.BillReducer.billDetail,
  };
}
export default withGlobalContext(connect(mapStateToProps, { getInfoBill, getListBillCustomer })(PaymentScreen));