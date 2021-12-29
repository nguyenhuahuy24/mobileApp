import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Image,
  SafeAreaView
} from 'react-native';
import Icon2 from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


import { formatNumber } from 'react-native-currency-input';

import { dataStatus, url_image } from '../../utility/config'
import SwipeSlide from "./Home/SwipeSlide";
import { connect } from 'react-redux';
import { getHouseTop, getRoomPost } from '../../redux/action/house/HouseAction'

const { height, width } = Dimensions.get('window');
class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading:false,
      listTopHome:"",
      listRoom:""
    }

  }
  componentDidMount() {
    this.props.getHouseTop()
    this.props.getRoomPost()
  }
  componentDidUpdate(prevProps){
    if(this.props.houseTopRate !== prevProps.houseTopRate){
      if(this.props.houseTopRate.status === dataStatus.SUCCESS){
        this.setState({listTopHome:this.props.houseTopRate.data})
      }
    }
    if(this.props.roomRelatePost !== prevProps.roomRelatePost){
      if(this.props.roomRelatePost.status === dataStatus.SUCCESS){
        this.setState({listRoom:this.props.roomRelatePost.data})
      }
    }
  }
  getData = ()=>{
    // setTimeout(
    //   function () {
    //     this.setState({ isLoading: true });

    //   }
    //     .bind(this),
    //   2000
    // );
    this.setState({isLoading:true})
    this.props.getHouseTop()
    this.props.getRoomPost()
    this.setState({isLoading:false})
  }
  pressHouse = (item) => {
    this.props.navigation.navigate('DetailHouseScreen', { houseInfo: item })
  }
  pressRoom = (item) => {
    this.props.navigation.navigate('DetailRoomScreen', { roomInfo: item })
  }
  currentNumber = (value) => {
    return formatNumber(value, {
      separator: ',',
    })
  }
  renderItem = ({ item }) => {
    return (
      <View style={{ width: width / 2.7, marginLeft: 3 }} >
        <TouchableOpacity activeOpacity={0.7} style={{ width: "100%", height: "100%", justifyContent: "center" }} onPress={() => this.pressHouse(item)} >
          <View style={{ alignItems: "center" }}>
            <Icon2 name="home" size={50} style={{ color: "#005f73" }} />
          </View>
          <View style={{ borderRadius: 3, borderColor: '#cccc', alignItems: "center" }}>
            <Text style={{ color: "#fca311" }}>({Number(item.score).toFixed(1)}/5 điểm | {item.NumberOfReview} lượt)</Text>

            <Text style={{ fontSize: 13, fontWeight: "500" }} numberOfLines={3} ellipsizeMode={"tail"} >{<Text style={{ fontWeight: "bold" }}>Địa chỉ:</Text>} {`${item.Address}, ${item.Ward}, ${item.District}, ${item.Province}`}</Text>

          </View>
        </TouchableOpacity>
      </ View >
    )
  }
  renderListRoom = ({ item }) => {
    return (
      <View style={styles.body_item}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => this.pressRoom(item)}
          style={{ borderColor: "#ccc", borderRadius: 5 }}>
          <View style={{ width: "100%", height: height / 6, position: "relative" }}>
            <Image
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: "stretch",
                borderRadius: 5
              }}
              source={{ uri: `${url_image}/uploads/images/${item.Image[0]}` }}></Image>
            <Text style={[styles.label_item], { position: 'absolute', bottom: 0, backgroundColor: "#e5e5e5", borderTopRightRadius: 6 }}>Giá: {this.currentNumber(item.Price)} </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Icon name="map-marker" size={15} style={{ marginTop: 2, color: "#005f73" }} />
            <Text style={{ fontSize: 13, fontWeight: "500", width: "90%", marginLeft: 3 }} numberOfLines={2} ellipsizeMode={"tail"} >{`${item.HouseId.Address}, ${item.HouseId.Ward}, ${item.HouseId.District}, ${item.HouseId.Province}`}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Icon name="texture-box" size={15} style={{ marginTop: 2, color: "#005f73" }} />
            <Text style={{ fontSize: 13, fontWeight: "500", marginLeft: 3 }}>DT: {item.Length * item.Width} m2</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  ListHeader = () => {
    return (
      <View style={{ flex: 2.5, width: "100%" }}>
        <SwipeSlide image="" />
        <Text style={{ fontSize: 18, marginLeft: 10, color: "#555555", fontWeight: "700" }}>Top 6 nhà trọ có điểm đánh giá cao</Text>
        <FlatList
          horizontal
          data={this.state.listTopHome}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
        />
        <Text style={{ fontSize: 18, marginLeft: 10, color: "#555555", fontWeight: "700" }}>Phòng mới đăng</Text>
      </View>
    )
  }
  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#f2f2f2', alignItems: 'center', justifyContent: 'center', marginBottom: "18%" }}>
        <View style={{ flex: 5, width: "100%", }}>
          <FlatList
            style={{ height: "90.5%" }}
            numColumns={2}
            data={this.state.listRoom}
            columnWrapperStyle={{ justifyContent: "space-between", marginBottom: 10, marginHorizontal: 8 }}
            ListHeaderComponent={this.ListHeader}
            renderItem={this.renderListRoom}
            refreshing={this.state.isLoading}
            onRefresh={this.getData}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </SafeAreaView>
    );
  }
}
function mapStateToProps(state) {
  return {
    houseTopRate: state.HouseReducer.houseTopRate,
    roomRelatePost: state.HouseReducer.roomRelatePost

  };
}
export default connect(mapStateToProps, { getHouseTop, getRoomPost })(HomeScreen);
const styles = StyleSheet.create({

  viewFlatList: {
    alignItems: "center",
    justifyContent: "center"
  },
  body_item: {
    width: "49%",
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
    fontWeight: '500'
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