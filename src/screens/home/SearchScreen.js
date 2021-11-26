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
  FlatList,
  Dimensions
} from 'react-native';
const {height,width} = Dimensions.get('window');
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
    }]
const data_1 =[{
      _id: 'abc1asdasd123',
      Name: "Hồ Chí Minh",
      
    },
    {
      _id: 'abc1asdasd124',
      Name: "Hà Nội", 
    },
    {
      _id: 'abc1asdasd125',
      Name: "Quảng Ngãi", 
    },
    {
      _id: 'abc1asdasd126',
      Name: "Bình Định", 
    },
    {
      _id: 'abc1asdasd121',
      Name: "Cà Mau", 
    },
    {
      _id: 'abc1asdasd1261',
      Name: "Nha Trang", 
    },
    {
      _id: 'abc1asdasd1263',
      Name: "HUế", 
    },
    {
      _id: 'abc1asdasd1263',
      Name: "HUế", 
    },
    {
      _id: 'abc1asdasd1263',
      Name: "HUế", 
    },
    {
      _id: 'abc1asdasd1263',
      Name: "HUế", 
    },
    {
      _id: 'abc1asdasd1263',
      Name: "HUế", 
    },
    {
      _id: 'abc1asdasd1263',
      Name: "HUế", 
    },
    {
      _id: 'abc1asdasd1263',
      Name: "HUế", 
    },
    {
      _id: 'abc1asdasd1263',
      Name: "HUế", 
    },
    {
      _id: 'abc1asdasd1263',
      Name: "HUế", 
    },
    {
      _id: 'abc1asdasd1263',
      Name: "HUế", 
    },
    {
      _id: 'abc1asdasd1263',
      Name: "HUế", 
    },
    {
      _id: 'abc1asdasd1263',
      Name: "HUế", 
    },
    {
      _id: 'abc1asdasd1263',
      Name: "HUế", 
    },
    {
      _id: 'abc1asdasd1263',
      Name: "HUế", 
    },
    {
      _id: 'abc1asdasd1263',
      Name: "HUế", 
    }
    
]
export default class SearchScreen extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
      list_home:data,
      showX: false,
      TP_search: "",
      Quan_search: "",
      Phuong_search: "",
      modalOfTP: false,
      modalOfQuan:false,
      modalOfPhuong:false,
      listTP:data_1,
      listQuan:[],
      listPhuong:[],
      tp:"",
      quan:"",
      phuong:"",
      checkboxTP:false,
      checkboxQuan:false,
      checkboxPhuong:false,
    }
  }

  handleSearch = (value,name) => {
    if(value ===""|| !value)
    {
      this.setState({showX:false});
    }
    else{
      if(name==="TP"){
        this.setState({TP_search: value,showX:true});
      }
      if(name==="Quan"){
        this.setState({Quan_search: value,showX:true});
      }
      if(name==="Phuong"){
        this.setState({Phuong_search: value,showX:true});
      }       
    }
  };
  ToDetail=({item})=>
  {
    this.props.navigation.navigate('SearchDetail')
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
  renderTPItem = ({ item }) => (
    
      <TouchableOpacity style={{flex:1, margin: "2%",width:"100%",borderBottomWidth:1,}} onPress={() => {
        this.setState({  tp: item.Name,modalOfTP:false })
      }} >
        <Text style={{ fontSize: 17 }}>{item.Name}</Text>
      </TouchableOpacity>
   
  );
  setModalVisible = (name,value) => {
    if(name==="TP"){
      this.setState({modalOfTP:value})
    }
    if(name==="Quan"){
      this.setState({modalOfQuan:value})
    }
    else this.setState({modalOfQuan:value})


  };
  renderQuanItem = ({ item }) => (
    <View style={{ flexDirection: 'row', borderTopWidth: 1 }}>
      <TouchableOpacity style={{flex:1, margin: "3%",width:"100%" }} onPress={() => {
        this.setState({  modalOfType: false })
      }} >
        <Text style={{ fontSize: 17 }}>Quận</Text>
      </TouchableOpacity>
    </View>
  );
  renderPhuongItem = ({ item }) => (
    <View style={{ flexDirection: 'row', borderTopWidth: 1 }}>
      <TouchableOpacity style={{flex:1, margin: "3%",width:"100%" }} onPress={() => {
        this.setState({ modalOfType: false })
      }} >
        <Text style={{ fontSize: 17 }}>Phường</Text>
      </TouchableOpacity>
    </View>
  );
  render() {
    return (
      <View style={{flex: 1,backgroundColor:'#f2f2f2'}}>
      {/* modal Thanh pho */}
      
        <Modal animationType="slide" transparent={true} visible={this.state.modalOfTP}>
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
                Chọn Tỉnh/Thành
              </Text>
              <View style={styles.inputField}>
            <View style={{justifyContent:"center",marginLeft: "2%",}}>
                <Icon
                name="search"
                backgroundColor=""
                color="grey"
                size={22}
              />
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-between',flex:1}}>
                <TextInput
              name="search"
              style={styles.TextInput}
              placeholder="Tìm tỉnh/thành..."
              value={this.state.TP_search}
              onChangeText={value => this.handleSearch(value,"TP")}
            />
            <View>
                {this.state.showX ? (<TouchableOpacity onPress={()=> this.setState({TP_search:"",showX:false })}>
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
            
        </View>
              {/* body */}
              <View style={{flex:1}}>
                <FlatList
                  data={this.state.listTP}
                  renderItem={this.renderTPItem}
                  keyExtractor={(item, index) => `${index}`}
                />
              </View>
              {/* footer modal */}
              <View style={{ borderTopWidth: 1, alignItems: 'center',borderColor:"#E5E5E5", }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#4876FF',
                    borderRadius: 10,
                    marginTop: '5%',
                    width: '70%',
                  }}
                  onPress={() => this.setState({modalOfTP:false})}>
                  <Text
                    style={{
                      fontSize: 20,
                      paddingTop: '3%',
                      marginBottom: '3%',
                      textAlign: 'center',
                      color: 'white',
                    }}>
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={{position: "absolute", bottom:0,top:0,left:0,right:0,zIndex:1, backgroundColor:'rgba(0,0,0,0.5)'}} 
             // onTouchStart={() => this.setModalVisible("TP",!this.state.modalOfTP)} 

              />
        </Modal>
              {/* modal quận */}
           <Modal animationType="slide" transparent={true} visible={this.state.modalOfQuan}>
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
                Chọn Quận/Huyện
              </Text>
              <View style={styles.inputField}>
            <View style={{justifyContent:"center",marginLeft: "2%",}}>
                <Icon
                name="search"
                backgroundColor=""
                color="grey"
                size={22}
              />
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-between',flex:1}}>
                <TextInput
              name="search"
              style={styles.TextInput}
              placeholder="Tìm quận/huyện..."
              value={this.state.Quan_search}
              onChangeText={value => this.handleSearch(value,"Quan")}
            />
            <View>
                {this.state.showX ? (<TouchableOpacity onPress={()=> this.setState({Quan_search:'',showX:false })}>
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
            
        </View>
              {/* body */}
              <View style={{flex:1}}>
                <FlatList
                  data={this.state.listTP}
                  renderItem={this.renderTPItem}
                  keyExtractor={(item, index) => `${index}`}
                />
              </View>
              {/* footer modal */}
              <View style={{ borderTopWidth: 1, alignItems: 'center',borderColor:"#E5E5E5", }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#4876FF',
                    borderRadius: 10,
                    marginTop: '5%',
                    width: '70%',
                  }}
                  onPress={() => this.setState({modalOfQuan:false})}>
                  <Text
                    style={{
                      fontSize: 20,
                      paddingTop: '3%',
                      marginBottom: '3%',
                      textAlign: 'center',
                      color: 'white',
                    }}>
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={{position: "absolute", bottom:0,top:0,left:0,right:0,zIndex:1, backgroundColor:'rgba(0,0,0,0.5)'}} 
              //onTouchStart={() => this.setModalVisible("Quan",!this.state.modalOfQuan)} 

          />
        </Modal>
      {/* modal phường */}
              <Modal animationType="slide" transparent={true} visible={this.state.modalOfPhuong}>
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
                Chọn Phường/Xã
              </Text>
              <View style={styles.inputField}>
            <View style={{justifyContent:"center",marginLeft: "2%",}}>
                <Icon
                name="search"
                backgroundColor=""
                color="grey"
                size={22}
              />
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-between',flex:1}}>
                <TextInput
              name="search"
              style={styles.TextInput}
              placeholder="Tìm phường/xã..."
              value={this.state.Phuong_search}
              onChangeText={value => this.handleSearch(value,"Phuong")}
            />
            <View>
                {this.state.showX ? (<TouchableOpacity onPress={()=> this.setState({Phuong_search:'',showX:false })}>
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
            
        </View>
              {/* body */}
              <View style={{flex:1}}>
                <FlatList
                  data={this.state.listTP}
                  renderItem={this.renderTPItem}
                  keyExtractor={(item, index) => `${index}`}
                />
              </View>
              {/* footer modal */}
              <View style={{ borderTopWidth: 1, alignItems: 'center',borderColor:"#E5E5E5", }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#4876FF',
                    borderRadius: 10,
                    marginTop: '5%',
                    width: '70%',
                  }}
                  onPress={() => this.setState({modalOfPhuong:false})}>
                  <Text
                    style={{
                      fontSize: 20,
                      paddingTop: '3%',
                      marginBottom: '3%',
                      textAlign: 'center',
                      color: 'white',
                    }}>
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={{position: "absolute", bottom:0,top:0,left:0,right:0,zIndex:1, backgroundColor:'rgba(0,0,0,0.5)'}} 
                //onTouchStart={() => this.setModalVisible("Phuong",!this.state.modalOfPhuong)}
           />
        </Modal>
              <Text
                style={{fontSize:18,fontWeight:'bold',margin:'2%'}}
              >Lựa chọn khu vực cần tìm kiếm:</Text>
              
            
            {/* THanh phố */}
            <View style={{marginLeft:"3%",flexDirection:'row',alignItems:'center'}}>
              <CheckBox 
                    value = {this.state.checkboxTP}
                    tintColors={{true : '#e32f45'}} 
                    onChange={()=>this.setState({checkboxTP :true})}
                    
                />
                <Text style={{marginRight:'2%',color:'black',fontSize:15}}>Khu vực Tỉnh/Thành:</Text>
                <TouchableOpacity style={{marginRight:"2%",width:"100%"}} onPress={() => { this.setState({ modalOfTP: true }) }} >

                <View style={styles.inputField_drop}>
                    <Text
                    style={styles.Text_name}
                    
                    >{this.state.tp}</Text>
                  <Icon
                    name="angle-down"
                    backgroundColor=""
                    color="#e32f45"
                    size={30}
                    style={{ marginTop: 5,marginRight:5 }}
                  />
               
                </View>
            </TouchableOpacity>
                
               
            </View>
            {/* quận huyện */}
              <View style={{marginLeft:"3%",flexDirection:'row',alignItems:'center'}}>
              <CheckBox 
                    value = {this.state.checkboxQuan}
                    tintColors={{true : '#e32f45'}} 
                    onChange={()=>this.setState({checkboxQuan :true})}
                />
                <Text style={{marginRight:'1%',color:'black',fontSize:15}}>Khu vực Quận/Huyện:</Text>
                <TouchableOpacity style={{marginRight:"2%",width:"100%"}} onPress={() => { this.setState({ modalOfQuan: true }) }} >

                <View style={styles.inputField_drop}>
                    <Text
                    style={styles.Text_name}
                    
                    >{this.state.quan}</Text>
                  <Icon
                    name="angle-down"
                    backgroundColor=""
                    color="#e32f45"
                    size={30}
                    style={{ marginTop: 5,marginRight:5 }}
                  />
               
                </View>
            </TouchableOpacity>
                
               
            </View>
            {/* Phuong xa */}
              <View style={{marginLeft:"3%",flexDirection:'row',alignItems:'center'}}>
              <CheckBox 
                    value = {this.state.checkboxPhuong}
                    tintColors={{true : '#e32f45'}} 
                    onChange={()=>this.setState({checkboxPhuong :true})}
                />
                <Text style={{marginRight:'2%',color:'black',fontSize:15}}>Khu vực Phường/Xã: </Text>
            <TouchableOpacity style={{marginRight:"2%",width:"100%"}} onPress={() => { this.setState({ modalOfPhuong: true }) }} >

                <View style={styles.inputField_drop}>
                    <Text
                    style={styles.Text_name}
                    
                    >{this.state.phuong}</Text>
                  <Icon
                    name="angle-down"
                    backgroundColor=""
                    color="#e32f45"
                    size={30}
                    style={{ marginTop: 5,marginRight:5 }}
                  />
               
                </View>
            </TouchableOpacity>
               
            </View>
            <View style={styles.list}>
                <SafeAreaView>
                  <FlatList
                    data={this.state.list_home}
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
  list:{
    flex:1,
    backgroundColor:'#ffff',
    margin:'2%',
    marginBottom:'23%',
    borderRadius:5,
    borderWidth:0.5
  },
 
  inputField: {
    margin:"1%",
    borderRadius: 5,
    height: 40,
    flexDirection: 'row',
    borderWidth:0.5,
    borderColor:"#c5c5c5"
    
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
    marginLeft:"2%",
    width:"100%",
    
  },
  Text_name: {
    color: '#000000',
    borderColor: 'black',
    flex: 1,
    marginTop:'5%',
    marginLeft:"5%",
    width:"100%",
    
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
    elevation: 5,
    margin:'2%',
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
    justifyContent: 'center',
    
  },
  modalView: {
    marginLeft: "5%",
    marginRight: "5%",
    marginTop: "30%",
    marginBottom:"30%",
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    elevation: 5,
    zIndex: 100,
    flex:1,
  },
});
// 
