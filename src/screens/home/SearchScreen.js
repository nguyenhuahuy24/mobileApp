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
  Dimensions,
  ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import { getHouse } from '../../redux/action/house/HouseAction'
import axios from "axios";
import _ from 'underscore';

const { height, width } = Dimensions.get('window');

class SearchScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showX: false,
      Province: "",
      District: "",
      page: 1,
      limit: 6,
      showListProvince: true,
      showListDistrict: false,
      modalLocation: false,
      listProvince: [],
      listDistrict: [],
      searchString: "",
      isRefreshingFooter: false,
      listHouse: []
    }
    this.shouldLoadMore = false
  }
  componentDidMount() {
    axios.get(`https://provinces.open-api.vn/api/p/`)
      .then(res => this.setState({ listProvince: res.data }))
  }
  componentDidUpdate(prevProps) {
    const { data } = this.props.listHouse
    if (!_.isEqual(data, prevProps.listHouse.data)) {
      if (data.length < this.state.page * this.state.limit) {
        this.shouldLoadMore = false
      }
      else {
        this.shouldLoadMore = true
        this.setState({ page: this.state.page + 1 })
      }
    }
  }

  gotoDetail = (item) => {
    this.props.navigation.navigate('SearchDetail', { houseInfo: item })
  }
  statusBodyTemplate = (rowData) => {
    if (rowData === "1") {
      return <Text style={styles.product_status_1}>{"Còn Phòng"}</Text>;
    }
    if (rowData === "0") { return <Text style={styles.product_status_0}>{"Hết Phòng"}</Text>; }
  }
  renderItem = ({ item }) => (
    <View style={styles.body_item}>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => this.gotoDetail(item)}>
        <View style={{ margin: "2%" }}>
          <View style={{ flexDirection: "row" }}>
            <Icon color="#457b9d" name="map-marker" size={25} style={{ marginRight: 5 }} />
            <Text style={styles.name_item} >{`${item.Address}, ${item.Ward}, ${item.District}, ${item.Province}`}</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon color="#457b9d" name="home" size={20} style={styles.icon} />
            <Text style={{ fontSize: 16 }}> Tên nhà trọ: {item.Name}</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon color="#457b9d" name="phone" size={20} style={styles.icon} />
            <Text style={styles.label_item}>  {item.UserId.Phone + " - " + item.UserId.Name}</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon color="#457b9d" name="bed" size={20} style={styles.icon} />
            <Text style={styles.label_item}>{"Tổng số phòng: " + item.Rooms.length}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
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
    const { Province, District } = this.state
    const Page = 1
    const Limit = 5
    this.setModalVisible()
    this.setState({ searchString: `${Province}, ${District}`, page: Page, limit: Limit })
    this.props.getHouse(Province, District, Page, Limit, [])
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
  emptyComponent = () => {
    return (
      <View style={{ height: '100%', alignItems: "center", justifyContent: "center" }}>
        <Text style={{ textAlign: 'center', color: '#e5e5e5e5', fontSize: 22, fontWeight: 'bold', marginTop: 20 }}> Danh sách trống </Text>
      </View>
    )
  }
  onLoadMore = () => {
    if (this.shouldLoadMore) {
      this.setState({ isRefreshingFooter: true })
      const { Province, District, page, limit } = this.state
      this.props.getHouse(Province, District, page, limit, this.props.listHouse.data)
      this.shouldLoadMore = false;
    }
    else {
      this.setState({ isRefreshingFooter: false })
    }
  };
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#f2f2f2' }}>
        <Modal animationType="fade" transparent={true} visible={this.state.modalLocation}>
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
                  <TextInput style={{ borderWidth: 0.5, borderRadius: 5, textAlign: "center", color: "black" }} editable={false} placeholder={"Bấm vào để chọn"} value={this.state.Province}></TextInput>
                </TouchableOpacity>
              </View>

              <View style={{ flexDirection: "row", height: 40, marginTop: 5, alignItems: "center", marginVertical: 2 }}>
                <Text style={{ fontSize: 15, width: "30%" }}>Quận/Huyện </Text>
                <TouchableOpacity style={{ marginLeft: 3, width: "70%", height: "100%" }} onPress={() => this.choseDistrict()}  >
                  <TextInput style={{ borderWidth: 0.5, borderRadius: 5, textAlign: "center", color: "black" }} editable={false} placeholder={"Bấm vào để chọn"} value={this.state.District}></TextInput>
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
                  ListEmptyComponent={<View style={{ alignItems: "center" }}><Text style={{ marginTop: 20, color: '#e5e5e5e5', fontSize: 20 }}>Chưa chọn tỉnh/ thành phố</Text></View>}
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
        <View style={{ alignItems: "center" }} >
          {/* Location*/}
          <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 7 }}>
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
        </View>
        <View style={styles.list}>
          <FlatList
            data={this.props.listHouse.data}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index}
            onEndReached={this.onLoadMore}
            onEndReachedThreshold={0.1}
            ListEmptyComponent={this.emptyComponent}
            ListFooterComponent={
              <ActivityIndicator size="large" animating={this.state.isRefreshingFooter} color="black" style={{ alignSelf: 'center' }} />
            }
          />
        </View>
      </View >
    );
  }
}

const styles = StyleSheet.create({
  list: {
    marginTop: 1,
    height: "82%"
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
    //borderWidth: 1,
    elevation: 4,
    height: 43,
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
    margin: '2%',
    backgroundColor: '#ffff',
    borderColor: '#c5c5c5',
    borderRadius: 10,
    borderWidth: 0,
    elevation: 3
  },
  name_item: {
    fontSize: 16,
    color: "#457b9d",
    fontWeight: 'bold',
    flexWrap: "wrap",
    //backgroundColor: "blue",
    width: '90%'
  },
  label_item: {
    fontSize: 16
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
  icon: {
    marginLeft: 30,
    marginRight: 5
  }
});

function mapStateToProps(state) {
  return {
    listHouse: state.HouseReducer.listHouse
  };
}
export default connect(mapStateToProps, { getHouse })(SearchScreen);