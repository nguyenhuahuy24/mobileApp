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
const data = [{
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
export default class SearchScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list_home: data,
      showX: false,
      global_search: "",
      modalOfTP: false,
      modalOfQuan: false,
      modalOfPhuong: false,
      listTP: [],
      listQuan: [],
      listPhuong: [],
      tp: "",
      quan: "",
      phuong: "",
      checkboxTP: false,
      checkboxQuan: false,
      checkboxPhuong: false,
    }
  }

  handleSearch = value => {
    if (value === "" || !value) {
      this.setState({ global_search: value, showX: false, bill_list: data });
    }
    else {

      this.setState({ global_search: value, showX: true });
      //hàm serach
      // let arrayTemp = [];
      // for (let i = 0; i < data.length; i++) {
      //   if (moment(data[i].DateCreate).format('MM-YYYY').toLowerCase().includes(value.toLowerCase())) {
      //     arrayTemp.push(data[i]);
      //   }
      // }
      // this.setState({bill_list: arrayTemp})
    }
  };
  ToDetail = ({ item }) => {
    this.props.navigation.navigate('SearchDetail')
    //this.props.getInfoBill(item._id)
  }
  statusBodyTemplate = (rowData) => {
    if (rowData === "1") {
      return <Text style={styles.product_status_1}>{"Còn Phòng"}</Text>;
    }
    if (rowData === "0") { return <Text style={styles.product_status_0}>{"Hết Phòng"}</Text>; }
  }
  renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => this.ToDetail({ item })}>
      <View style={styles.body_item}>
        <View style={{ margin: "2%" }}>
          <Text style={styles.name_item}>Tên nhà trọ: {item.House_Name}</Text>
          <Text style={styles.label_item}> - Số điện thoại: {item.Phone}</Text>
          <Text style={styles.label_item}> - Địa chỉ: {item.Address}</Text>
          <Text style={{ fontSize: 17 }}> - Tình trạng: {this.statusBodyTemplate(item.Status)}</Text>

        </View>
      </View>
    </TouchableOpacity>
  );
  renderTPItem = ({ item }) => (
    <View style={{ borderColor: '#e5e5e5', borderRadius: 5, flexDirection: 'row', elevation: 1, margin: 2, backgroundColor: "#ffff" }}>
      <TouchableOpacity style={{ flex: 1, margin: "2%", width: "100%" }} onPress={() => {
        this.setState({ modalOfManager: false })
      }} >
        <Text style={{ fontSize: 17 }}>Thành phố</Text>
      </TouchableOpacity>
    </View>
  );
  renderQuanItem = ({ item }) => (
    <View style={{ flexDirection: 'row', borderTopWidth: 1 }}>
      <TouchableOpacity style={{ flex: 1, margin: "3%", width: "100%" }} onPress={() => {
        this.setState({ modalOfType: false })
      }} >
        <Text style={{ fontSize: 17 }}>Quận</Text>
      </TouchableOpacity>
    </View>
  );
  renderPhuongItem = ({ item }) => (
    <View style={{ flexDirection: 'row', borderTopWidth: 1 }}>
      <TouchableOpacity style={{ flex: 1, margin: "3%", width: "100%" }} onPress={() => {
        this.setState({ modalOfType: false })
      }} >
        <Text style={{ fontSize: 17 }}>Phường</Text>
      </TouchableOpacity>
    </View>
  );
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#e5e5e5' }}>
        {/* modal Thanh pho */}
        <Modal
          animationType="slide"
          visible={this.state.modalOfTP}
          onRequestClose={() => {
            this.setState({ modalOfTP: false });
          }}>
          {/* header modal */}
          <View style={{ backgroundColor: "#e32f45" }}>
            <Text
              style={{
                fontSize: 22,
                margin: "2%",
                textAlign: 'center',
                fontWeight: 'bold',
                color: '#ffffff'
              }}>
              Chọn Tỉnh/Thành Phố
            </Text>
          </View>
          <View style={{ backgroundColor: "#e5e5e5" }}>
            <View style={styles.inputField}>
              <View style={{ justifyContent: "center", marginLeft: "2%" }}>
                <Icon
                  name="search"
                  backgroundColor=""
                  color="grey"
                  size={22}
                />
              </View>
              <TextInput
                name="search"
                style={styles.TextSearch}
                placeholder="Tìm Tỉnh/Thành Phố..."
                value={this.state.global_search}
                onChangeText={value => this.handleSearch(value)}
              />
              <View>
                {this.state.showX ? (<TouchableOpacity onPress={() => this.setState({ global_search: '', showX: false })}>
                  <Icon
                    name="times"
                    backgroundColor=""
                    color="grey"
                    size={20}
                    style={{ marginTop: 9, marginRight: 7 }}
                  />
                </TouchableOpacity>) : null}
              </View>
            </View>


          </View>
          {/* body */}
          <View style={{ flex: 9, backgroundColor: "#e5e5e5" }}>
            <SafeAreaView >
              <FlatList
                data={this.state.listTP}
                renderItem={this.renderTPItem}
                keyExtractor={(item, index) => `${index}`}
              />
            </SafeAreaView>
          </View>

          {/* footer modal */}
          <View style={{ borderTopWidth: 1, alignItems: 'center', flex: 1 }}>
            <TouchableOpacity
              style={{
                backgroundColor: '#4876FF',
                marginTop: '2%',
                width: '70%',
                borderRadius: 10
              }}
              onPress={() => this.setState({ modalOfTP: false })}>
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
        </Modal>
        {/* modal quận */}
        <Modal
          animationType="slide"
          visible={this.state.modalOfQuan}
          onRequestClose={() => {
            this.setState({ modalOfQuan: false });
          }}>
          {/* header modal */}
          <View style={{ backgroundColor: "#e32f45" }}>
            <Text
              style={{
                fontSize: 22,
                margin: "2%",
                textAlign: 'center',
                fontWeight: 'bold',
                color: '#ffff'
              }}>
              Quận/Huyện
            </Text>
          </View>
          <View style={{ backgroundColor: "#e5e5e5" }}>
            <View style={styles.inputField}>
              <View style={{ justifyContent: "center", marginLeft: "2%" }}>
                <Icon
                  name="search"
                  backgroundColor=""
                  color="grey"
                  size={22}
                />
              </View>
              <TextInput
                name="search"
                style={styles.TextSearch}
                placeholder="Tìm Quận/Huyện..."
                value={this.state.global_search}
                onChangeText={value => this.handleSearch(value)}
              />
              <View>
                {this.state.showX ? (<TouchableOpacity onPress={() => this.setState({ global_search: '', showX: false })}>
                  <Icon
                    name="times"
                    backgroundColor=""
                    color="grey"
                    size={20}
                    style={{ marginTop: 9, marginRight: 7 }}
                  />
                </TouchableOpacity>) : null}
              </View>
            </View>


          </View>
          {/* body */}
          <View style={{ flex: 9, backgroundColor: "#e5e5e5" }}>
            <SafeAreaView >
              <FlatList
                data={this.state.listQuan}
                renderItem={this.renderQuanItem}
                keyExtractor={(item, index) => `${index}`}
              />
            </SafeAreaView>
          </View>

          {/* footer modal */}
          <View style={{ borderTopWidth: 1, alignItems: 'center', flex: 1 }}>
            <TouchableOpacity
              style={{
                backgroundColor: '#4876FF',
                marginTop: '2%',
                width: '70%',
              }}
              onPress={() => this.setState({ modalOfQuan: false })}>
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
        </Modal>
        {/* modal phường */}
        <Modal
          animationType="slide"
          visible={this.state.modalOfPhuong}
          onRequestClose={() => {
            this.setState({ modalOfPhuong: false });
          }}>
          {/* header modal */}
          <View style={{ backgroundColor: "#e32f45" }}>
            <Text
              style={{
                fontSize: 22,
                margin: "2%",
                textAlign: 'center',
                fontWeight: 'bold',
                color: '#fff'
              }}>
              Phường/Xã
            </Text>
          </View>
          <View style={{ backgroundColor: "#e5e5e5" }}>
            <View style={styles.inputField}>
              <View style={{ justifyContent: "center", marginLeft: "2%" }}>
                <Icon
                  name="search"
                  backgroundColor=""
                  color="grey"
                  size={22}
                />
              </View>
              <TextInput
                name="search"
                style={styles.TextSearch}
                placeholder="Tìm phường/xã..."
                value={this.state.global_search}
                onChangeText={value => this.handleSearch(value)}
              />
              <View>
                {this.state.showX ? (<TouchableOpacity onPress={() => this.setState({ global_search: '', showX: false })}>
                  <Icon
                    name="times"
                    backgroundColor=""
                    color="grey"
                    size={20}
                    style={{ marginTop: 9, marginRight: 7 }}
                  />
                </TouchableOpacity>) : null}
              </View>
            </View>


          </View>
          {/* body */}
          <View style={{ flex: 9, backgroundColor: "#e5e5e5" }}>
            <SafeAreaView >
              <FlatList
                data={this.state.listPhuong}
                renderItem={this.renderPhuongItem}
                keyExtractor={(item, index) => `${index}`}
              />
            </SafeAreaView>
          </View>

          {/* footer modal */}
          <View style={{ borderTopWidth: 1, alignItems: 'center', flex: 1 }}>
            <TouchableOpacity
              style={{
                backgroundColor: '#4876FF',
                marginTop: '2%',
                width: '70%',
              }}
              onPress={() => this.setState({ modalOfPhuong: false })}>
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
        </Modal>
        <Text
          style={{ fontSize: 18, fontWeight: 'bold', margin: '1%' }}
        >Lựa chọn khu vực cần tìm kiếm:</Text>


        {/* THanh phố */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <CheckBox
            value={this.state.checkboxTP}
            tintColors={{ true: "blue" }}
            onChange={() => this.setState({ checkboxTP: true })}

          />
          <Text style={{ marginRight: '2%' }}>Khu vực Tỉnh/Thành:</Text>
          <View style={styles.inputField_drop}>
            <Text
              style={styles.TextInput}
              value={this.state.tp}
            />
            <TouchableOpacity style={{ marginRight: "2%" }} onPress={() => { this.setState({ modalOfTP: true }) }} >
              <Icon
                name="angle-down"
                backgroundColor=""
                color="#e32f45"
                size={30}
                style={{ marginTop: 5 }}
              />
            </TouchableOpacity>
          </View>


        </View>
        {/* quận huyện */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <CheckBox
            value={this.state.checkboxQuan}
            tintColors={{ true: "blue" }}
            onChange={() => this.setState({ checkboxQuan: true })}
          />
          <Text>Khu vực Quận/Huyện: </Text>
          <View style={styles.inputField_drop}>
            <Text
              style={styles.TextInput}
              value={this.state.quan}
            />
            <TouchableOpacity style={{ marginRight: "2%" }} onPress={() => { this.setState({ modalOfQuan: true }) }} >
              <Icon
                name="angle-down"
                backgroundColor=""
                color="#e32f45"
                size={30}
                style={{ marginTop: 5 }}
              />
            </TouchableOpacity>
          </View>


        </View>
        {/* Phuong xa */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <CheckBox
            value={this.state.checkboxPhuong}
            tintColors={{ true: "blue" }}
            onChange={() => this.setState({ checkboxPhuong: true })}
          />
          <Text style={{ marginRight: '2%' }}>Khu vực Phường/Xã:</Text>
          <View style={styles.inputField_drop}>
            <Text
              style={styles.TextInput}
              value={this.state.phuong}
            />
            <TouchableOpacity style={{ marginRight: "2%" }} onPress={() => { this.setState({ modalOfPhuong: true }) }} >
              <Icon
                name="angle-down"
                backgroundColor=""
                color="#e32f45"
                size={30}
                style={{ marginTop: 5 }}
              />
            </TouchableOpacity>
          </View>


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
  list: {
    flex: 1,
    backgroundColor: '#ffff',
    margin: '2%',
    marginBottom: '19%',
    borderRadius: 10,
    borderWidth: 1
  },

  inputField: {
    margin: "1%",
    borderColor: '#e5e5e5',
    borderRadius: 5,
    elevation: 1,
    height: 40,
    flexDirection: 'row',
    backgroundColor: "#ffff"
  },
  inputField_drop: {
    margin: "1%",
    borderColor: '#e5e5e5',
    borderRadius: 5,
    elevation: 1,
    height: 40,
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    width: "50%"
  },
  TextInput: {
    color: '#000000',
    borderColor: 'black',
    flex: 1,
    paddingRight: 15,

  },
  dropdown: {
    marginTop: "1%",
    marginLeft: "1%",
    marginRight: "1%",
    flexDirection: 'row',
  },
  input: {
    borderBottomWidth: 1,
    flexDirection: 'row',
    backgroundColor: "#ffff",

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
    margin: '2%',
    backgroundColor: '#ffff',
    borderColor: '#c5c5c5',
    borderRadius: 15,
    borderWidth: 1
  },
  name_item: {
    fontSize: 19, color: "#ff1a1a", fontWeight: 'bold'
  },
  label_item: {
    fontSize: 17, marginBottom: '2%'
  },
});