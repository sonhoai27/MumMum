import React from 'react'
import {connect} from 'react-redux'
import {
    View,
    Text, ScrollView,Dimensions
} from 'react-native'
import Header from "../../Header";
import Menus from "./Menus";
import Comments from "./Comments";
import {createMaterialTopTabNavigator,createAppContainer} from "react-navigation";
import {winSize} from "./NearMe";
import {PRIMARY_COLOR} from "../../../configs/Const";
import Intro from "./Intro";

type RestaurantProps = {
    navigation: any;
}
type RestaurantState= {
}

const TabNavigator = createMaterialTopTabNavigator({
    Home: {
        screen: Intro,
        navigationOptions: () => ({
            title: `Giới thiệu`
        }),
    },
    Menu: Menus,
    Comment: {
        screen: Comments,
        navigationOptions: () => ({
            title: `Bình luận`
        }),
    },
},{
    tabBarPosition: 'top',
    tabBarOptions: {
        activeTintColor: PRIMARY_COLOR,
        inactiveTintColor: '#333',
        labelStyle: {
            fontSize: 12,
            fontWeight: 'bold'
        },
        tabStyle: {
            width: winSize.width/3
        },
        style: {
            backgroundColor: '#fff'
        },
        indicatorStyle: {
            backgroundColor: PRIMARY_COLOR
        }
    }
});

const AppContainer = createAppContainer(TabNavigator);
class RestaurantScreen extends React.Component<RestaurantProps, RestaurantState> {
    static navigationOptions = {
        header: null
    };
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <View style={{flex: 1}}>
                <Header
                    isShowingGoBack={true}
                    bgTransparent={true}
                    title={'Nhà hàng'}
                    navigation={this.props.navigation}/>
                <View style={{flex: 1}}>
                    <AppContainer screenProps={this.props.navigation}/>
                </View>
            </View>
        )
    }
}
const mapStateToProps = state => ({
});

const mapDispatchToProps = {
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RestaurantScreen);