import React, { Component } from "react";
import Icon from 'react-native-vector-icons/FontAwesome';
import CheckBox from '@react-native-community/checkbox';
import { formatNumber } from 'react-native-currency-input';


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
  ScrollView,
  Image,
  Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import { getListRoom } from '../../redux/action/house/HouseAction'
import { url_image } from "../../utility/config";

const windowHeight = Dimensions.get('window').height

class SearchDetailScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      list_image: [],
      detail: "",
    }
  }
  componentDidMount() {
    const { houseInfo } = this.props.route.params
    this.props.getListRoom(houseInfo._id)
  }
  currentNumber = (value) => {
    return formatNumber(value, {
      separator: ',',
      suffix: ' VND',
    })
  }
  ToDetail = (item) => {
    this.setState({ detail: item.Details, list_image: item.Image, modalVisible: true })
  }
  statusBodyTemplate = (rowData) => {
    if (rowData === "1") {
      return <Text style={styles.product_status_1}>{"Trống"}</Text>;
    }
    if (rowData === "0") { return <Text style={styles.product_status_0}>{"Đã thuê"}</Text>; }
  }
  renderItem = ({ item }) => (
    <View style={styles.body_item}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => this.ToDetail(item)}
      >
        <View style={{ width: "100%", height: windowHeight / 6 }}>
          <Image
            style={{
              flex: 1,
              width: null,
              height: null,
              resizeMode: "stretch",
              borderRadius: 5
            }}
            source={{ uri: `${url_image}/uploads/images/${item.Image[0]}` }}></Image>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.label_item}>Phòng số: {item.RoomNumber}</Text>
          <Text style={[styles.label_item]}>DT: {item.Length * item.Width} m2</Text>
        </View>
        <Text style={styles.label_item}>Giá phòng:  {this.currentNumber(item.Price)}</Text>
      </TouchableOpacity>
    </View>
  );
  renderImage = ({ item }) => (
    <View style={{ height: 280, width: 280, marginLeft: 15 }}>
      <Image source={{ uri: `${url_image}/uploads/images/${item}` }} style={{ flex: 1, width: null, height: null, resizeMode: 'cover' }} />
    </View>
  );
  emptyComponent = () => {
    return (
      <View style={{ height: '100%', alignItems: "center", justifyContent: "center" }}>
        <Text style={{ textAlign: 'center', color: '#e5e5e5e5', fontSize: 22, fontWeight: 'bold', marginTop: 20 }}> Danh sách trống </Text>
      </View>
    )
  }
  render() {
    const { houseInfo } = this.props.route.params
    return (
      <View style={{ backgroundColor: '#f2f2f2' }}>
        <Modal animationType="fade" transparent={true} visible={this.state.modalVisible}>
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
                Hình ảnh của Phòng
              </Text>
              {/* body */}
              <View>
                <FlatList
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  data={this.state.list_image}
                  renderItem={this.renderImage}
                  keyExtractor={(item, index) => `${index}`}
                />
              </View>
              <View style={styles.modal_detail}>
                <Text style={{ fontWeight: 'bold', fontSize: 17 }}>Mô tả chi tiết: </Text>
                <Text style={{ fontSize: 17, flex: 1 }}>{this.state.detail}</Text>
              </View>
            </View>
          </View>
          <View style={{ position: "absolute", bottom: 0, top: 0, left: 0, right: 0, zIndex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }}
            onTouchStart={() => this.setState({ modalVisible: false })}
          />
        </Modal>
        <View style={{ marginBottom: 10, marginLeft: 10, width: '98%' }}>
          <View style={styles.houseInfo_item}>
            <Icon color="#457b9d" name="map-marker" size={20} style={{ marginRight: 5 }} />
            <Text style={styles.houseInfo_text} >{houseInfo.Address + ', ' + houseInfo.Ward + ', ' + houseInfo.District + ', ' + houseInfo.Province}</Text>
          </View>
          <View style={styles.houseInfo_item}>
            <Icon color="#457b9d" name="phone" size={20} style={{ marginRight: 5 }} />
            <Text style={styles.houseInfo_text}>  {houseInfo.UserId?.Phone + " - " + houseInfo.UserId?.Name}</Text>
          </View>
          <View style={styles.houseInfo_item}>
            <Icon color="#457b9d" name="envelope" size={20} style={{ marginRight: 5 }} />
            <Text style={styles.houseInfo_text}> {houseInfo.UserId?.Email}</Text>
          </View>
          <View style={styles.houseInfo_item}>
            <Icon color="#457b9d" name="bed" size={20} style={{ marginRight: 5 }} />
            <Text style={styles.houseInfo_text}>{"Số phòng trống: " + this.props.listRoom.data.length + '/' + houseInfo.Rooms.length}</Text>
          </View>
        </View>
        <View style={styles.viewFlatList}>
          <FlatList
            style={{ width: "100%", height: "90.5%" }}
            numColumns={2}
            data={this.props.listRoom.data}
            columnWrapperStyle={{ justifyContent: "space-between", marginBottom: 10, marginHorizontal: 8 }}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={this.emptyComponent}
          />
        </View>
      </View>
    );
  }
}
function mapStateToProps(state) {
  return {
    listRoom: state.HouseReducer.listRoom
  };
}
export default connect(mapStateToProps, { getListRoom })(SearchDetailScreen);
const styles = StyleSheet.create({

  viewFlatList: {
    alignItems: "center",
    justifyContent: "center"
  },
  body_item: {
    width: "49%",
    // elevation: 5,
    //backgroundColor: '#ffff',
    // borderColor: '#c5c5c5',
    // borderRadius: 10,
    // borderWidth: 0.5
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

  name_item: {
    fontSize: 19, color: "#ff1a1a", fontWeight: 'bold'
  },
  label_item: {
    fontSize: 15,
    fontWeight: '400'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center'
  },
  modalView: {
    marginLeft: "3%",
    marginRight: "3%",
    marginTop: "30%",
    marginBottom: "38%",
    backgroundColor: 'white',
    borderRadius: 20,

    elevation: 5,
    zIndex: 100,
    flex: 1,
  },
  houseInfo_item: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  houseInfo_text: {
    fontSize: 15,
    fontWeight: '500',
    flexWrap: "wrap",
    width: "90%"
  },
  modal_detail: {
    marginLeft: "5%",
    marginTop: "2%",
    marginRight: "3%",
    marginBottom: "3%",
    flexDirection: 'row',
    flex: 1
  }
});