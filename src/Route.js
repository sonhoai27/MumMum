import React from "react";
import {View, Text} from "react-native";
import {createAppContainer, createBottomTabNavigator, createStackNavigator} from "react-navigation";
import Root from "./components/AppFoodScreen";
import Register from "./components/Auth/RegisterScreen";
import Login from "./components/Auth/LoginScreen";
import Restaurant from "./components/Screens/Restaurant/RestaurantScreen";
import SearchSreen from "./components/Screens/SearchSreen";
import OrderScreen from "./components/Screens/Order/OrderScreen";
import Account from "./components/Auth/AccountScreen";
import Icons from "react-native-vector-icons/Ionicons";
import {PRIMARY_COLOR} from "./configs/Const";

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

class Route extends React.Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props){
        super(props)
    }
    render(){
        return (
            <AppContainer/>
        )
    }
}

export default Route