import React from 'react'
import {connect} from 'react-redux'
import {
    View,
    Text, ScrollView, Dimensions
} from 'react-native'
import Menus from "./Menus";
import Comments from "./Comments";
import {createMaterialTopTabNavigator, createAppContainer} from "react-navigation";
import {winSize} from "./NearMe";
import {PRIMARY_COLOR} from "../../../configs/Const";
import Intro from "./Intro";

type RestaurantProps = {
    navigation: any;
}
type RestaurantState = {}

const TabNavigator = createMaterialTopTabNavigator({
    Home: {
        screen: Intro
    },
    Menu: Menus,
    Comment: {
        screen: Comments
    },
}, {
    tabBarPosition: 'top',
    tabBarOptions: {
        activeTintColor: PRIMARY_COLOR,
        inactiveTintColor: '#333',
        labelStyle: {
            fontSize: 12,
            fontWeight: 'bold'
        },
        tabStyle: {
            width: winSize.width / 3
        },
        style: {
            backgroundColor: '#fff'
        },
        indicatorStyle: {
            backgroundColor: PRIMARY_COLOR
        }
    }
});

export const AppContainer = createAppContainer(TabNavigator);

class RestaurantScreen extends React.Component<RestaurantProps, RestaurantState> {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('title'),
            headerStyle: {
                backgroundColor: PRIMARY_COLOR,
                elevation: 0,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
                textAlign: 'center',
                flex: 1
            },
        };
    };
    constructor(props) {
        super(props)
        console.log(this.props.navigation);
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <AppContainer screenProps={this.props.navigation}/>
            </View>
        )
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RestaurantScreen);