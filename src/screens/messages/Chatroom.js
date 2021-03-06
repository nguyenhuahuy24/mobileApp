import React from 'react';
import { View, Text, Button, StyleSheet, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import UserAvatar from 'react-native-user-avatar';
import axios from 'axios';
import { URL, url_image } from '../../utility/config'
import { getAvartar } from '../../utility/common'
import { connect } from 'react-redux';
import _ from "underscore"
class Chatroom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: ""
        }
    }
    componentDidMount() {
        const friendId = this.props.item.Members.find((m) => m !== this.props.customer.customerInfo._id);
        axios.get(URL + "/user/" + friendId).then((response) => {
            this.setState({ user: response.data })
            
        })
    }
    render() {
        return (
            <View style={{ width: "98%", backgroundColor: '#ffff' }}>
                <View style={{ margin: "2%", flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', flex: 1 }}>
                        <View style={{ marginTop: "1%" }}>
                        { this.state.user != "" &&
                            
                            <UserAvatar
                                size={60} bgColors={['#ffff']}
                                name="Avishay Bar"
                                src={getAvartar(this.state.user?.Image)}
                            />
                        }
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: "center", marginLeft: 20 }}>
                            <Text style={{ fontSize: 20, marginLeft: "2%", fontWeight: "500" }}>{this.state.user?.Name} (Chủ nhà)</Text>
                        </View>
                    </View>

                </View>
            </View>
        )
    }
}
function mapStateToProps(state) {
    return {
        customer: state.AuthenticateReducer.user.data
    };
}
export default connect(mapStateToProps, {})(Chatroom);
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffff',
        flex: 1

    },
});