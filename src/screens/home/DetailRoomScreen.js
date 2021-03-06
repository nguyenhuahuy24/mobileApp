
import React, { Component } from "react";
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    Image
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const images = [
    require('../../image/home/3.png'),
    require('../../image/home/1.png'),
    require('../../image/home/4.png'),
    require('../../image/home/14.jpg')
];
import SwipeSlide from "./Home/SwipeSlide";
import { url_image } from '../../utility/config'

class DetailRoomScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }

    }
    renderImage = ({ item }) => {
        <View style={{ width: "100%", marginLeft: 15 }}>
            {/* <Image source={{ uri: `${url_image}/uploads/images/${item}` }}  /> */}
            <Image source={item} />

        </View>
    }
    render() {
        const { roomInfo } = this.props.route.params
        return (
            <View style={{ flex: 1, backgroundColor: '#e5e5e5', alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ flex: 1 }} >
                    <SwipeSlide image={roomInfo.Image} />
                </View>
                <View style={{ flex: 2, width: "100%" }} >
                    <View style={{ flexDirection: "row" }}>
                        <Icon name="map-marker" size={19} style={{ marginTop: 2, color: "#005f73" }} />
                        <Text style={{ fontSize: 16, width: "90%", marginLeft: 3 }} numberOfLines={2} ellipsizeMode={"tail"} >Địa chỉ: {`${roomInfo.HouseId.Address}, ${roomInfo.HouseId.Ward}, ${roomInfo.HouseId.District}, ${roomInfo.HouseId.Province}`}</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <Icon name="account-box" size={19} style={{ marginTop: 2, color: "#005f73" }} />
                        <Text style={{ fontSize: 16, width: "90%", marginLeft: 3 }} numberOfLines={2} ellipsizeMode={"tail"} >Liên hệ: {roomInfo.HouseId.UserId.Name} - {roomInfo.HouseId.UserId.Phone}</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <Icon name="email" size={19} style={{ marginTop: 2, color: "#005f73" }} />
                        <Text style={{ fontSize: 16, width: "90%", marginLeft: 3 }} numberOfLines={2} ellipsizeMode={"tail"} >Email: {roomInfo.HouseId.UserId.Email}</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <Icon name="image-size-select-small" size={19} style={{ marginTop: 2, color: "#005f73" }} />
                        <Text style={{ fontSize: 16, width: "90%", marginLeft: 3 }} numberOfLines={2} ellipsizeMode={"tail"} >Chiều dài: {roomInfo.Length}m - Chiều rộng: {roomInfo.Width}m</Text>
                    </View>
                    <Text style={{ fontSize: 16, width: "90%", marginLeft: 3, fontWeight: "500" }} numberOfLines={2} ellipsizeMode={"tail"} >Mô tả chi tiết: </Text>
                    <View style={{ marginHorizontal: 10 }}>
                        <Text style={{ fontSize: 16, width: "90%", flexWrap: "wrap" }} numberOfLines={2} ellipsizeMode={"tail"} >{roomInfo.Details}</Text>
                    </View>

                </View>
            </View >
        )
    }
}
export default DetailRoomScreen