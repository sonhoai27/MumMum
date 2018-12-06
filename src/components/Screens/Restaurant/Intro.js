import React from 'react'
import {connect} from 'react-redux'
import {
    View,
    Text,
    Image, ScrollView
} from 'react-native'
import {PRIMARY_COLOR, SIZE} from "../../../configs/Const";
import {winSize} from "./NearMe";
import StarRating from "../../StarRating/StarRating";
import YouTube from "react-native-youtube/YouTube.android";
type IntroProps = {
    navigation: any;
}

type IntroStates = {
    isOK: boolean;
}
class Intro extends React.Component<IntroProps,IntroStates> {

    constructor(props) {
        super(props)
        this.state = {
            isOK: false,
        }
    }

    componentDidMount(): void {
        if (this.props.screenProps.state.params.item.RESTAURANT){
            this.setState({
                isOK: true,
            })
        }
    }

    render() {
        return (
            <ScrollView showsVerticalScrollIndicator={false} style={{}}>
                <View style={{
                    flex: 1,
                    backgroundColor: '#fff',
                    paddingBottom: 40
                }}>
                    <Image
                        style={{
                            width: winSize.width,
                            height: winSize.width*0.7,
                        }}
                        source={{uri: this.props.screenProps.state.params.item.RESTAURANT.image}}
                    />
                    <View style={{
                        padding: SIZE["16"],
                        position: 'absolute',
                        bottom: SIZE["8"],
                        left: SIZE["16"],
                        right: SIZE["16"],
                        backgroundColor: '#fff',
                        borderRadius: SIZE["8"],
                        elevation: 2,
                    }}>
                        <Text style={{
                            lineHeight: 18,
                            textAlign: 'center',
                            fontSize: SIZE["16"],
                            paddingLeft: SIZE["16"],
                            fontWeight: 'bold'
                        }}>{this.props.screenProps.state.params.item.RESTAURANT.name}</Text>
                        <StarRating ratings={this.props.screenProps.state.params.item.RESTAURANT.rating}/>
                    </View>
                </View>
                <View style={{
                    flex: 1,
                    alignItems: 'center',
                    marginVertical: SIZE["32"]
                }}>
                    <Text style={{
                        fontSize: SIZE["16"],
                        marginBottom: SIZE["32"],
                        fontWeight: 'bold'
                    }}>Video giới thiệu</Text>
                    {
                        this.state.isOK ? <YouTube
                            apiKey={'AIzaSyDv5E3Z5oRP4UwzqLkNWK60wCToLD0j1zw'}
                            videoId="TQUhVf4gTM0"
                            play={false}
                            fullscreen={false}
                            loop={true}
                            style={{
                                alignSelf: 'stretch', height: 300
                            }}
                        /> : <View/>
                    }
                </View>
            </ScrollView>
        )
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Intro);