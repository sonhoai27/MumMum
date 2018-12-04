/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {YellowBox, Animated} from 'react-native'
import {Provider} from 'react-redux';
import initStore from './src/stores/Store'
import Root from "./src/components/AppFoodScreen";
import {createStackNavigator, createBottomTabNavigator, createAppContainer} from "react-navigation";
import Register from "./src/components/Auth/RegisterScreen";
import Login from "./src/components/Auth/LoginScreen";
import Account from "./src/components/Auth/AccountScreen";
import Restaurant from "./src/components/Screens/Restaurant/RestaurantScreen";
import OrderScreen from "./src/components/Screens/Order/OrderScreen";
import Icons from 'react-native-vector-icons/Ionicons';
import {PRIMARY_COLOR} from "./src/configs/Const";
import SearchSreen from "./src/components/Screens/SearchSreen";

YellowBox.ignoreWarnings([
    "Warning: isMounted(...) is deprecated",
    "Module RCTImageLoader"
]);

const AppFoodStack = createStackNavigator(
    {
        Home: {screen: Root},
        Register: {screen: Register},
        Login: {screen: Login},
        Restaurant: {screen: Restaurant},
    },
    {
        initialRouteName: 'Home'
    }
);

const SearchStack = createStackNavigator(
    {
        Search: {screen: SearchSreen}
    },
    {
        initialRouteName: 'Search',
    }
);
const OrderStack = createStackNavigator(
    {
        Order: {screen: OrderScreen}
    },
    {
        initialRouteName: 'Order',
    }
);
const AccountStack = createStackNavigator(
    {
        Account: {screen: Account}
    },
    {
        initialRouteName: 'Account',
    }
);


const AppStack = createBottomTabNavigator(
    {
        Home: {
            screen: AppFoodStack,
            navigationOptions: ({ navigation }) => ({
                title: "Trang chủ",
                tabBarIcon: ({ tintColor }) => <Icons name="ios-home" size={20} color={tintColor}/>
            })
        },
        Search: {
            screen: SearchStack,
            navigationOptions: ({ navigation }) => ({
                title: "Tìm kiếm",
                tabBarIcon: ({ tintColor }) => <Icons name="ios-search" size={20} color={tintColor}/>
            })
        },
        Order: {
            screen: OrderStack,
            navigationOptions: ({ navigation }) => ({
                title: "Giỏ hàng",
                tabBarIcon: ({ tintColor }) => <Icons name="ios-basket" size={20} color={tintColor}/>
            })
        },
        User:  {
            screen: AccountStack,
            navigationOptions: ({ navigation }) => ({
                title: "Tài khoản",
                tabBarIcon: ({ tintColor }) => <Icons name="ios-contacts" size={20} color={tintColor}/>
            })
        }
    },
    {
        initialRouteName: 'Home',
        tabBarOptions: {
            activeTintColor: PRIMARY_COLOR,
            inactiveTintColor: '#333',
            style: {
                backgroundColor: '#ededed',
                borderTopColor: '#fff',
                borderTopWidth: 0,
            }
        },
    }
);

const AppContainer = createAppContainer(AppStack);
AppContainer.navigationOptions = ({ navigation }) => ({
    tabBarOnPress: (navigation)=> {
        console.log(navigation);
    }
})
export default class App extends Component {
    static navigationOptions = {
        title: 'Home',
    };

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Provider store={initStore()}>
                <AppContainer/>
            </Provider>
        );
    }
}
