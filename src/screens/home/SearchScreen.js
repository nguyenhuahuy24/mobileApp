import React, { Component } from "react";
import Icon from 'react-native-vector-icons/FontAwesome';

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
import { connect } from 'react-redux';
import { getHouse } from '../../redux/action/house/HouseAction'
import axios from "axios";

const { height, width } = Dimensions.get('window');

class SearchScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showX: false,
      Province: "",
      District: "",
      page: 1,
      limit: 5,
      showListProvince: true,
      showListDistrict: false,
      modalLocation: false,
      listProvince: [],
      listDistrict: [],
      searchString: ""
    }
  }
  componentDidMount() {
    axios.get(`https://provinces.open-api.vn/api/p/`)
      .then(res => this.setState({ listProvince: res.data }))
  }
  handleSearch = (value, name) => {
    if (value === "" || !value) {
      this.setState({ showX: false });
    }
    else {
      if (name === "TP") {
        this.setState({ TP_search: value, showX: true });
      }
      if (name === "Quan") {
        this.setState({ Quan_search: value, showX: true });
      }
      if (name === "Phuong") {
        this.setState({ Phuong_search: value, showX: true });
      }
    }
  };
  ToDetail = ({ item }) => {
    this.props.navigation.navigate('SearchDetail')
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
          <Text style={styles.name_item}>Tên nhà trọ: {item.Name}</Text>
          <Text style={styles.label_item}> - Số điện thoại: {item.UserId.Phone}</Text>

        </View>
      </View>
    </TouchableOpacity>
  );
  renderModalLocation = ({ item }) => (
    <TouchableOpacity style={{ flex: 1, margin: "2%", width: "100%", alignItems: "center" }} onPress={() => this.clickItem(item)}>
      <Text style={{ fontSize: 17 }}>{item.name}</Text>
    </TouchableOpacity>
  );
  clickItem = (item) => {
    if (this.state.showListProvince === true) {
      axios.get(`https://provinces.open-api.vn/api/p/${item.code}?depth=2`)
        .then(res => { this.setState({ Province: item.name, listDistrict: res.data.districts }) })
    }
    else (this.setState({ District: item.name }))
  }
  onSearch = () => {
    const { Province, District, page, limit } = this.state
    this.setModalVisible()
    this.setState({ searchString: `${Province}, ${District}` })
    this.props.getHouse(Province, District, page, limit)
  }
  setModalVisible = () => {
    this.setState({ modalLocation: false })
  };
  choseProvince = () => {
    this.setState({ showListProvince: true, showListDistrict: false })
  }
  choseDistrict = () => {
    this.setState({ showListProvince: false, showListDistrict: true })
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#f2f2f2' }}>
        {/* modal Thanh pho */}
        <Modal animationType="slide" transparent={true} visible={this.state.modalLocation}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              {/* header modal */}
              <Text
                style={{
                  fontSize: 20,
                  marginTop: 5,
                  paddingBottom: '3%',
                  color: "#555555",
                  textAlign: 'center',
                  fontWeight: 'bold',

                }}>
                Chọn khu vực
              </Text>

              <View style={{ flexDirection: "row", height: 40, marginTop: 5, alignItems: "center", marginVertical: 2 }}>
                <Text style={{ fontSize: 15, width: "30%" }}>Tỉnh/Thành </Text>
                <TouchableOpacity style={{ marginLeft: 3, width: "70%", height: "100%" }} onPress={() => this.choseProvince()}>
                  <TextInput style={{ borderWidth: 0.5, borderRadius: 8, textAlign: "center", color: "black" }} editable={false} value={this.state.Province}></TextInput>
                </TouchableOpacity>
              </View>

              <View style={{ flexDirection: "row", height: 40, marginTop: 5, alignItems: "center", marginVertical: 2 }}>
                <Text style={{ fontSize: 15, width: "30%" }}>Quận/Huyện </Text>
                <TouchableOpacity style={{ marginLeft: 3, width: "70%", height: "100%" }} onPress={() => this.choseDistrict()}  >
                  <TextInput style={{ borderWidth: 0.5, borderRadius: 8, textAlign: "center", color: "black" }} editable={false} value={this.state.District}></TextInput>
                </TouchableOpacity>
              </View>
              {/* body */}
              <View style={{ flex: 1, marginTop: 15, alignItems: "center" }}>
                <FlatList
                  data={this.state.showListProvince ? this.state.listProvince : this.state.showListDistrict ? this.state.listDistrict : this.state.listProvince}
                  renderItem={this.renderModalLocation}
                  keyExtractor={(item, index) => `${index}`}
                  style={{ width: "100%", height: "100%" }}
                  showsVerticalScrollIndicator={false}
                />
              </View>
              {/* footer modal */}
              <View style={{ borderTopWidth: 1, alignItems: 'center', borderColor: "#E5E5E5", }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#e32f45',
                    borderRadius: 10,
                    marginTop: '5%',
                    width: '70%',
                  }}
                  onPress={() => this.onSearch()}>
                  <Text
                    style={{
                      fontSize: 20,
                      paddingTop: '3%',
                      marginBottom: '3%',
                      textAlign: 'center',
                      color: 'white',
                    }}>
                    Tìm kiếm
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={{ position: "absolute", bottom: 0, top: 0, left: 0, right: 0, zIndex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }}
            onTouchStart={() => this.setModalVisible()}
          />
        </Modal>

        <Text
          style={{ fontSize: 18, fontWeight: 'bold', margin: '2%' }}
        >Lựa chọn khu vực cần tìm kiếm:</Text>
        {/* Location*/}
        <View style={{ marginLeft: "3%", flexDirection: 'row', alignItems: 'center' }}>
          <View style={styles.inputField_drop}>
            <TextInput
              style={styles.Text_name}
              placeholder={"Tìm quận, thành phố..."}
              editable={false}
            >{this.state.searchString}</TextInput>
            <TouchableOpacity style={{ alignItems: "center", marginRight: 10 }} onPress={() => { this.setState({ modalLocation: true }) }} >
              <Icon
                name="angle-down"
                backgroundColor=""
                color="#e32f45"
                size={30}
              />
            </TouchableOpacity>
          </View>
          {/* List House */}
        </View>
        <View style={styles.list}>
          <SafeAreaView>
            <FlatList
              data={this.props.listHouse.data}
              renderItem={this.renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </SafeAreaView>
        </View>
      </View >
    );
  }
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: '#ffff',
    margin: '2%',
    marginBottom: '23%',
    borderRadius: 5,
    borderWidth: 0.5
  },

  inputField: {
    margin: "1%",
    borderRadius: 5,
    height: 40,
    flexDirection: 'row',
    borderWidth: 0.5,
    borderColor: "#c5c5c5"

  },
  inputField_drop: {
    borderColor: '#e5e5e5',
    borderRadius: 5,
    borderWidth: 1,
    elevation: 0.1,
    height: 40,
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    width: "98%",
    alignItems: "center"
  },
  TextInput: {
    color: '#000000',
    borderColor: 'black',
    flex: 1,
    marginLeft: "2%",
    width: "100%"
  },
  Text_name: {
    color: '#000000',
    borderColor: 'black',
    flex: 1,
    width: "100%",
    height: "100%",

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
    elevation: 5,
    margin: '2%',
    backgroundColor: '#ffff',
    borderColor: '#c5c5c5',
    borderRadius: 10,
    borderWidth: 0.5
  },
  name_item: {
    fontSize: 19, color: "#ff1a1a", fontWeight: 'bold'
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
    marginBottom: "30%",
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    elevation: 5,
    zIndex: 100,
    flex: 1,
  },
});

function mapStateToProps(state) {
  return {
    listHouse: state.HouseReducer.listHouse
  };
}
export default connect(mapStateToProps, { getHouse })(SearchScreen);