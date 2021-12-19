import React, { Component } from "react";
import {
    View,
    Text,
    ScrollView,
    SafeAreaView,
    StyleSheet,
    StatusBar,
    Dimensions,
    Image,
} from 'react-native';
const images = [
    require('../../../image/home/3.png'),
    require('../../../image/home/1.png'),
    require('../../../image/home/4.png'),
    require('../../../image/home/14.jpg')
];
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
export default class SwipeSlide extends React.Component {

    constructor() {
        super();
        this.state = {
            imgActive: 0,
        }

    }
    onChange = (nativeEvent) => {
        if (nativeEvent) {
            const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
            if (slide != this.state.imgActive) {
                this.setState({ imgActive: slide });
            }
        }
    }
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.wrap}>
                    <ScrollView
                        onScroll={({ nativeEvent }) => this.onChange(nativeEvent)}
                        showsHorizontalScrollIndicator={false}
                        pagingEnabled
                        horizontal
                        style={styles.wrap}
                    >
                        {
                            images.map((e, index) =>
                                <Image
                                    key={e}
                                    resizeMode="stretch"
                                    style={styles.wrap}
                                    source={e}
                                />
                            )
                        }

                    </ScrollView>
                    <View style={styles.wrapDot}>
                        {
                            images.map((e, index) =>
                                <Text
                                    key={e}
                                    style={this.state.imgActive == index ? styles.dotActive : styles.dot}
                                >
                                    ●
                                </Text>
                            )
                        }
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    container: {

    },
    wrap: {
        width: WIDTH,
        height: HEIGHT * 0.3,

    },
    wrapDot: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        alignSelf: 'center'
    },
    dotActive: {
        margin: 3,
        color: 'black'
    },
    dot: {
        margin: 3,
        color: 'white'
    }
})