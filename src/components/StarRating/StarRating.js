import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text
} from 'react-native';
import {SIZE} from "../../configs/Const";

type Props = {
    ratings: number
};

export default class StarRating extends Component<Props> {
    constructor(props){
        super(props)
    }
    render() {
        let ratings = this.props.ratings;
        let stars = [];
        for (var i = 1; i <= 5; i++) {
            let path = require('./star-filled.png');
            if (i > ratings) {
                path = require('./star-unfilled.png');
            }
            stars.push((<Image key={i} style={styles.image} source={path} />));
        }
        return (
            <View style={ styles.container }>
                { stars }
                <Text style={styles.text}>({ratings})</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: SIZE["16"],
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: 20,
        height: 20,
    },
    text: {
        fontSize: 18,
        marginLeft: 10,
        marginRight: 10
    }
});