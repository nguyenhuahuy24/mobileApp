import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ToastAndroid
} from 'react-native';
import StarRating from 'react-native-star-rating';
import axios from "axios";
import { connect } from "react-redux";
import { dataStatus, URL } from "../../utility/config";
import _ from 'underscore'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getRating, rating } from '../../redux/action/authenticateAction/AuthenticateAction'

class AssessmentScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Priority: 0,
    };
  }
  componentDidMount() {
    this.props.getRating()
  }
  componentDidUpdate(prevProps) {
    if (this.props.RatingStar !== prevProps.RatingStar) {
      if (this.props.RatingStar.status === dataStatus.SUCCESS) {
        if (!_.isEmpty(this.props.RatingStar.data)) {
          this.setState({ Priority: this.props.RatingStar.data.Rating })
        }
      }
    }
  }
  onStarRatingPress(rating) {
    this.setState({
      Priority: Number(rating)
    });
  }
  sendAssessment() {

    ToastAndroid.showWithGravity(
      "Đánh giá thành công!",
      ToastAndroid.LONG,
      ToastAndroid.CENTER
    );
    this.props.rating(this.state.Priority)

  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#e5e5e5', alignItems: 'center' }}>
        <View style={{ width: "100%", margin: "5%", alignItems: "center" }}>
          <Text style={{ fontSize: 30, fontWeight: '400' }}>
            Đánh giá nhà trọ của bạn
          </Text>
        </View>
        <StarRating
          starStyle={{ marginLeft: 5 }}
          disabled={false}
          maxStars={5}
          starSize={40}
          fullStarColor="#ffd11a"
          emptyStarColor="#ffd11a"
          rating={Number(this.state.Priority)}
          selectedStar={(rating) => this.onStarRatingPress(rating)}
        />
        <TouchableOpacity activeOpacity={0.9} style={styles.button} onPress={() => this.sendAssessment()}>
          <Text style={{ color: "white", fontSize: 20 }}>Gửi đánh giá</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  button: {
    height: "6%",
    width: '60%',
    backgroundColor: "#DB3022",
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    //elevation: 13,
    margin: "8%"
  },
})
function mapStateToProps(state) {
  return {
    RatingStar: state.AuthenticateReducer.rating
  };
}
export default connect(mapStateToProps, { getRating, rating })(AssessmentScreen);