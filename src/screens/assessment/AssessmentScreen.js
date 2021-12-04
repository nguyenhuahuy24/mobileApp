import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert
} from 'react-native';
import StarRating from 'react-native-star-rating';

export default class AssessmentScreen extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      Priority: "3.5",
     
    };
  }
onStarRatingPress(rating) {
    this.setState({
      Priority: String(rating)
    });
  }
sendAssessment (){
   Alert.alert("Đánh giá", "Cảm ơn bạn đã đánh giá "+this.state.Priority)
}
  render() {
    return (
      <View style={{flex: 1,backgroundColor:'#e5e5e5',alignItems:'center'}}>
        <View style={{width:"100%",margin:"5%",marginLeft:'25%'}}>
          <Text style={{fontSize:30,fontWeight:'400'}}>
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
           <Text style={{marginTop:"2%"}}>( 3.5 điểm / 10 lượt)</Text>       
          <TouchableOpacity style={styles.button} onPress={()=>this.sendAssessment()}>
            <Text style={{ color: "white", fontSize: 20 }}>Gửi đánh giá</Text>
          </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
 
  button: {
    height:"10%",
    width:'60%',
    backgroundColor: "#DB3022",
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.30,
    elevation: 13,
    margin:"8%"
  },

})
