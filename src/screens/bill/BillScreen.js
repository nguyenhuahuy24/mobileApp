import React, { Component } from "react";
import Icon from 'react-native-vector-icons/FontAwesome';
import {Alert,BackHandler, View, Text, TouchableOpacity, FlatList, StyleSheet, TextInput, SafeAreaView,SectionList } from 'react-native';
import moment from 'moment';
import {formatNumber } from 'react-native-currency-input';
import {Logout} from '../../redux/action/authenticateAction/AuthenticateAction'
import { connect } from 'react-redux';
import { dataStatus } from '../../utility/config'
import { withGlobalContext } from '../../GlobalContextProvider';
import { getListBillCustomer, getInfoBill } from '../../redux/action/bill/BillAction';


 class BillScreen extends React.Component
{
  
  constructor(props) {
    super(props);
    this.state = {
      bill_list: [],
      save_list:[],
      showX: false,
      global_search: "",
      isLoading:false,
    }
  }
  componentDidMount() {
    this.getData();
    // this.backHandler = BackHandler.addEventListener(
    //   "hardwareBackPress",
    //   this.backAction
    // );
  }
  

  // componentWillUnmount() {
  //   this.backHandler.remove();
  // }
  getData = ()=>{
    this.setState({isLoading:true})
    this.props.getListBillCustomer()
    this.setState({isLoading:false})
  }
  componentDidUpdate(prevProps) {
    if (this.props.bill !== prevProps.bill) {
      if (this.props.bill.status === dataStatus.SUCCESS) {
        let bills = Object.values(this.props.bill.data)
        let list=[]
        bills.forEach(bill => {
          list.push(bill)
        })
        this.setState({bill_list:list,save_list:list})
      }
      
    }
    if(this.props.billDetail !== prevProps.billDetail)
    {
      if(this.props.billDetail.status === dataStatus.SUCCESS)
      {
        this.props.navigation.navigate('BillDetail')
      }
    }
  }
  backAction = () => {
    Alert.alert("Thoát Khỏi Ứng Dụng!", "Bạn có muốn thoát không?", [
      {
        text: "NO",
        onPress: () => null,
        style: "cancel"
      },
      { text: "YES", onPress: () => this.props.Logout()}
    ]);
    return true;
  };
  currentNumber =(value)=>{
      return formatNumber(value, {
      separator: ',',
      suffix: ' VND',
    })
 }
  handleSearch = value => {
    if(value ===""|| !value)
    {
      this.setState({global_search:value,showX:false,bill_list:this.state.save_list});
    }
    else{

      this.setState({global_search: value,showX:true});
        //hàm serach
        let arrayTemp = [];
        for (let i = 0; i < this.state.bill_list.length; i++) {
          if (moment(this.state.bill_list[i].EndDate).format('MM-YYYY').toLowerCase().includes(value.toLowerCase())) {
            arrayTemp.push(this.state.bill_list[i]);
          }
        }
        this.setState({bill_list: arrayTemp})
    }
  };
  
  ToDetail=({item})=>
  {
    this.props.getInfoBill(item._id)
  }
  
  statusBodyTemplate=(rowData)=> {
    if (rowData === 1) {
       return <Text style={styles.product_status_1}>{"Đã thanh toán"}</Text>;
    }
    if (rowData === 0) {return  <Text style={styles.product_status_0}>{"Chưa thanh toán"}</Text>; }
  }
  renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => this.ToDetail({item})}>
      <View style={styles.body}>
        <View style={{ margin:"2%"}}>
          <Text style={styles.name_bill}>Hóa đơn tháng {moment(item.EndDate).format('MM-YYYY')}</Text>
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
                  refreshing={this.state.isLoading}
                  onRefresh={this.getData}
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
    fontSize: 19,  color: "#ff1a1a", fontWeight:'bold'
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
function mapStateToProps(state) {
  return {
    bill: state.BillReducer.bill,
    billDetail: state.BillReducer.billDetail,
    logoutStatus: state.AuthenticateReducer.logoutStatus

  };
}
export default withGlobalContext(connect(mapStateToProps, { getListBillCustomer,getInfoBill,Logout })(BillScreen));