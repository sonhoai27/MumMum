import React from 'react';
import { Animated, Easing, View,Text } from 'react-native';
import LottieView from 'lottie-react-native';
import {SIZE} from "../../configs/Const";
import {checkmarkSuccessIcon} from "../Header";

export default class SuccessAlert extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            progress: new Animated.Value(0),
        };
    }

    componentDidMount() {
        Animated.timing(this.state.progress, {
            toValue: 1,
            duration: 5000,
            easing: Easing.linear,
        }).start();
    }
    render() {
        return (
            <View style={{
            position: 'absolute',
                top: '25%',
                left: '20%',
                right: '20%',
                bottom: '25%',
                flex: 1,
                backgroundColor: '#fff',
                elevation: 4,
                padding: SIZE["16"],
                borderRadius: 4,
                alignItems: 'center',
                flexDirection: 'column'
        }}>
                <View style={{
                }}>
                    {checkmarkSuccessIcon(SIZE["120"])}
                </View>
                <Text style={{
                    marginTop: SIZE["16"],
                    fontSize: 20,
                    textAlign: 'center'
                }}>{this.props.text}</Text>
            </View>
        );
    }
}