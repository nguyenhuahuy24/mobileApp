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
const data = [
  {
    Rooms: [
      "617aa0c7c1580d46584f92af",
      "617aa0f7c1580d46584f92b2",
      "617aa129c1580d46584f92b4",
      "617aa145c1580d46584f92b6",
      "617aa161c1580d46584f92b8",
      "617aa18bc1580d46584f92ba"
    ],
    _id: "617a9bbdc1580d46584f92aa",
    Name: 'Max',
    Address: '65/24 đường Tăng Nhơn Phú',
    UserId: {
      _id: "5ff33bd0abc73325a8163c6d",
      Email: '17110246@student.hcmute.edu.vn',
      Name: 'Nguyễn Hứa huy',
      Phone: '0778908123'
    },
    District: 'Thành Phố Thủ Đức',
    Province: 'Thành Phố Hồ Chí Minh',
    Rating: 0,
    Ward: 'Phường Phước Long B'
  },
  {
    Rooms: [
      '617aa1bec1580d46584f92bc',
      "617aa206c1580d46584f92bf",
      "617aa257c1580d46584f92c1",
      "617aa27cc1580d46584f92c3"
    ],
    _id: "617a9e17c1580d46584f92ab",
    Name: 'Min',
    Address: '1, Đường Võ Văn Ngân',
    UserId: {
      _id: "5ff33bd0abc73325a8163c6d",
      Email: '17110246@student.hcmute.edu.vn',
      Name: 'Nguyễn Hứa huy',
      Phone: '0778908123'
    },
    District: 'Thành Phố Thủ Đức',
    Province: 'Thành Phố Hồ Chí Minh',
    Ward: 'Phường Linh Chiểu',
    Rating: 3
  },
  {
    Rooms: [
      "617aa0c7c1580d46584f92af",
      "617aa0f7c1580d46584f92b2",
      "617aa129c1580d46584f92b4",
      "617aa145c1580d46584f92b6",
      "617aa161c1580d46584f92b8",
      "617aa18bc1580d46584f92ba"
    ],
    _id: "617a9bbdc1580d46584f92aa",
    Name: 'Max',
    Address: '65/24 đường Tăng Nhơn Phú',
    UserId: {
      _id: "5ff33bd0abc73325a8163c6d",
      Email: '17110246@student.hcmute.edu.vn',
      Name: 'Nguyễn Hứa huy',
      Phone: '0778908123'
    },
    District: 'Thành Phố Thủ Đức',
    Province: 'Thành Phố Hồ Chí Minh',
    Rating: 0,
    Ward: 'Phường Phước Long B'
  },
  {
    Rooms: [
      "617aa0c7c1580d46584f92af",
      "617aa0f7c1580d46584f92b2",
      "617aa129c1580d46584f92b4",
      "617aa145c1580d46584f92b6",
      "617aa161c1580d46584f92b8",
      "617aa18bc1580d46584f92ba"
    ],
    _id: "617a9bbdc1580d46584f92aa",
    Name: 'Max',
    Address: '65/24 đường Tăng Nhơn Phú',
    UserId: {
      _id: "5ff33bd0abc73325a8163c6d",
      Email: '17110246@student.hcmute.edu.vn',
      Name: 'Nguyễn Hứa huy',
      Phone: '0778908123'
    },
    District: 'Thành Phố Thủ Đức',
    Province: 'Thành Phố Hồ Chí Minh',
    Rating: 0,
    Ward: 'Phường Phước Long B'
  },
  {
    Rooms: [
      "617aa0c7c1580d46584f92af",
      "617aa0f7c1580d46584f92b2",
      "617aa129c1580d46584f92b4",
      "617aa145c1580d46584f92b6",
      "617aa161c1580d46584f92b8",
      "617aa18bc1580d46584f92ba"
    ],
    _id: "617a9bbdc1580d46584f92aa",
    Name: 'Max',
    Address: '65/24 đường Tăng Nhơn Phú',
    UserId: {
      _id: "5ff33bd0abc73325a8163c6d",
      Email: '17110246@student.hcmute.edu.vn',
      Name: 'Nguyễn Hứa huy',
      Phone: '0778908123'
    },
    District: 'Thành Phố Thủ Đức',
    Province: 'Thành Phố Hồ Chí Minh',
    Rating: 0,
    Ward: 'Phường Phước Long B'
  },
  {
    Rooms: [
      "617aa0c7c1580d46584f92af",
      "617aa0f7c1580d46584f92b2",
      "617aa129c1580d46584f92b4",
      "617aa145c1580d46584f92b6",
      "617aa161c1580d46584f92b8",
      "617aa18bc1580d46584f92ba"
    ],
    _id: "617a9bbdc1580d46584f92aa",
    Name: 'Max',
    Address: '65/24 đường Tăng Nhơn Phú',
    UserId: {
      _id: "5ff33bd0abc73325a8163c6d",
      Email: '17110246@student.hcmute.edu.vn',
      Name: 'Nguyễn Hứa huy',
      Phone: '0778908123'
    },
    District: 'Thành Phố Thủ Đức',
    Province: 'Thành Phố Hồ Chí Minh',
    Rating: 0,
    Ward: 'Phường Phước Long B'
  },
  {
    Rooms: [
      "617aa0c7c1580d46584f92af",
      "617aa0f7c1580d46584f92b2",
      "617aa129c1580d46584f92b4",
      "617aa145c1580d46584f92b6",
      "617aa161c1580d46584f92b8",
      "617aa18bc1580d46584f92ba"
    ],
    _id: "617a9bbdc1580d46584f92aa",
    Name: 'Max',
    Address: '65/24 đường Tăng Nhơn Phú',
    UserId: {
      _id: "5ff33bd0abc73325a8163c6d",
      Email: '17110246@student.hcmute.edu.vn',
      Name: 'Nguyễn Hứa huy',
      Phone: '0778908123'
    },
    District: 'Thành Phố Thủ Đức',
    Province: 'Thành Phố Hồ Chí Minh',
    Rating: 0,
    Ward: 'Phường Phước Long B'
  },
  {
    Rooms: [
      "617aa0c7c1580d46584f92af",
      "617aa0f7c1580d46584f92b2",
      "617aa129c1580d46584f92b4",
      "617aa145c1580d46584f92b6",
      "617aa161c1580d46584f92b8",
      "617aa18bc1580d46584f92ba"
    ],
    _id: "617a9bbdc1580d46584f92aa",
    Name: 'Max',
    Address: '65/24 đường Tăng Nhơn Phú',
    UserId: {
      _id: "5ff33bd0abc73325a8163c6d",
      Email: '17110246@student.hcmute.edu.vn',
      Name: 'Nguyễn Hứa huy',
      Phone: '0778908123'
    },
    District: 'Thành Phố Thủ Đức',
    Province: 'Thành Phố Hồ Chí Minh',
    Rating: 0,
    Ward: 'Phường Phước Long B'
  }
]
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
  emptyComponent = () => {
    return (
      <View style={{ height: '100%', alignItems: "center", justifyContent: "center" }}>
        <Text style={{ textAlign: 'center', color: '#e5e5e5e5', fontSize: 22, fontWeight: 'bold', marginTop: 20 }}> Danh sách trống </Text>
      </View>
    )
  }
  // onLoadMore = () => {
  //   if (this.shouldLoadMore) {
  //     this.shouldLoadMore = true;
  //     this.props.getListTask(
  //       this.state.offset,
  //       this.state.limit,
  //       this.props.item.id,
  //       this.props.item.listTask.data,
  //     );
  //     this.shouldLoadMore = false;
  //     // this.setState({isRefreshingFooter : false })
  //   }
  //   else {
  //     this.setState({ isRefreshingFooter: false })
  //   }
  // };
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
          <FlatList
            //data={this.props.listHouse.data}
            style={styles.listHouse}
            data={this.props.listHouse.data}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index.toString()}
            // onEndReached={this.loadMoreData}
            // onEndReachedThreshold={0.1}
            //ItemSeparatorComponent={() => <View style={styles.separator} />}
            ListEmptyComponent={this.emptyComponent}
          />
        </View>
      </View >
    );
  }
}

const styles = StyleSheet.create({
  list: {
    backgroundColor: '#ffff',
    marginTop: 10,
    height: "78%"
  },
  listHouse: {

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
    margin: '2%',
    backgroundColor: '#ffff',
    borderColor: '#c5c5c5',
    borderRadius: 10,
    borderWidth: 1,

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