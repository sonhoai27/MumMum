import React from 'react'
import {connect} from 'react-redux'
import {
    View
} from 'react-native'
import {createMaterialTopTabNavigator, createAppContainer} from "react-navigation";
import {PRIMARY_COLOR} from "../../../configs/Const";
import {winSize} from "../Restaurant/NearMe";
import HistoryOrders from "./HistoryOrders";
import ShoppingCart from "./ShoppingCart";
import Icons from "react-native-vector-icons/Ionicons";
type OrderScreenProps = {
    navigation: any;
}
type OrderScreenState = {}

const TabNavigator = createMaterialTopTabNavigator({

    ShoppingCart: {
        screen: ShoppingCart,
        navigationOptions: ({ navigation }) => ({
            title: "Giỏ hàng",
        })
    },
    HistoryOrders: {
        screen: HistoryOrders,
        navigationOptions: ({ navigation }) => ({
            title: "Lịch sử mua hàng",
        })
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
            width: winSize.width / 2
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

class OrderScreen extends React.Component<OrderScreenProps, OrderScreenState> {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Giỏ hàng',
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
)(OrderScreen);
