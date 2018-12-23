import React from 'react'
import {connect} from 'react-redux'
import {_retrieveData} from "../configs/LocalStorage";
import LoginScreen from "./Auth/LoginScreen";
import {setStatusLogin, setUserToken} from "../stores/auth/AuthActions";
import {apiGetRestaurantsByNearMe, setMyGeoLocation} from "../stores/lists/ListActions";
import AppFoodScreen from "./AppFoodScreen";
import {createAppContainer, createBottomTabNavigator, createStackNavigator} from "react-navigation";
import Account from "./Auth/AccountScreen";
import RegisterScreen from "./Auth/RegisterScreen";
import {PRIMARY_COLOR} from "../configs/Const";
import Restaurant from "./Screens/Restaurant/RestaurantScreen";
import RestaurantByCatScreen from "./Screens/Category/RestaurantByCatScreen";
import SearchSreen from "./Screens/SearchSreen";
import OrderScreen from "./Screens/Order/OrderScreen";
import Icons from "react-native-vector-icons/Ionicons";
import NotifyScreen from "./Screens/NotifyScreen";
import CheckoutScreen from "./Screens/Order/CheckoutScreen";
import EditAccountScreen from "./Auth/EditAccountScreen";
import ChangePasswordScreen from "./Auth/ChangePasswordScreen";
import {getGeolocation} from "../configs/Geolocation";

// authencations
const AuthStack = createStackNavigator(
    {
        Login: {screen: LoginScreen},
        Register: {screen: RegisterScreen},
    },
    {
        initialRouteName: 'Login',
    }
);
const AuthContainer = createAppContainer(AuthStack);

// main routes
const AppFoodStack = createStackNavigator(
    {
        Home: {screen: AppFoodScreen},
        ResByCat: {screen: RestaurantByCatScreen},
        Restaurant: {screen: Restaurant},
    },
    {
        initialRouteName: 'Home',
        transitionConfig: () => ({screenInterpolator: () => null}),
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
        Order: {screen: OrderScreen},
    },
    {
        initialRouteName: 'Order'
    }
);
const AccountStack = createStackNavigator(
    {
        Account: {screen: Account},
        UserInfo: {screen: EditAccountScreen},
        ChangePassword: {screen: ChangePasswordScreen},
    },
    {
        initialRouteName: 'Account',
    }
);
const NotifyStack = createStackNavigator(
    {
        Notify: {screen: NotifyScreen}
    },
    {
        initialRouteName: 'Notify',
    }
);

const AppStack = createBottomTabNavigator(
    {
        Home: {
            screen: AppFoodStack,
            navigationOptions: ({navigation}) => ({
                title: "Trang chủ",
                tabBarIcon: ({tintColor}) => <Icons name="ios-home" size={20} color={tintColor}/>
            })
        },
        Search: {
            screen: SearchStack,
            navigationOptions: ({navigation}) => ({
                title: "Tìm kiếm",
                tabBarIcon: ({tintColor}) => <Icons name="ios-search" size={20} color={tintColor}/>
            })
        },
        Order: {
            screen: OrderStack,
            navigationOptions: ({navigation}) => ({
                title: "Giỏ hàng",
                tabBarIcon: ({tintColor}) => <Icons name="ios-basket" size={20} color={tintColor}/>
            })
        },
        Notify: {
            screen: NotifyStack,
            navigationOptions: ({navigation}) => ({
                title: "Thông báo",
                tabBarIcon: ({tintColor}) => <Icons name="ios-notifications" size={20} color={tintColor}/>
            })
        },
        User: {
            screen: AccountStack,
            navigationOptions: ({navigation}) => ({
                title: "Tài khoản",
                tabBarIcon: ({tintColor}) => <Icons name="ios-contacts" size={20} color={tintColor}/>
            })
        }
    },
    {
        initialRouteName: 'Home',
        tabBarOptions: {
            activeTintColor: PRIMARY_COLOR,
            inactiveTintColor: '#fff',
            style: {
                backgroundColor: '#222',
                borderTopColor: '#fff',
                borderTopWidth: 0,
            }
        }
    }
);

AppStack.navigationOptions = {
    header: null,
};

const RootStack = createStackNavigator(
    {
        AppStack: {screen: AppStack},
    },
    {
        initialRouteName: 'AppStack',
        transitionConfig: () => ({screenInterpolator: () => null}),
    }
);
const AppContainer = createAppContainer(RootStack);

type BaseComponentProps = {
    navigation: any;
}

class HomeRoute extends React.Component<BaseComponentProps> {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props)
    }

    componentDidMount(): void {
        getGeolocation((e) => {
            this.props.setMyGeoLocation({
                latitude: e.latitude,
                longitude: e.longitude
            });
        });

        _retrieveData("@LOGIN", (result) => {
            if (result.message === 400) {
                this.props.setStatusLogin(false);
            } else {
                this.props.setStatusLogin(true);
                this.props.setUserToken(result)
            }
        })
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
        if(prevProps.myGeolocationState !== this.props.myGeolocationState){
            this.props.apiGetRestaurantsByNearMe(
                this.props.myGeolocationState.latitude,
                this.props.myGeolocationState.longitude
            );
        }
    }

    render() {

        return (
            this.props.isLoginState ? <AppContainer/> : <AuthContainer/>
        )
    }
}

const mapStateToProps = state => ({
    loginState: state.auth.loginState,
    isLoginState: state.auth.isLoginState,
    myGeolocationState: state.lists.myGeolocationState
});

const mapDispatchToProps = {
    setMyGeoLocation,
    setStatusLogin,
    setUserToken,
    apiGetRestaurantsByNearMe
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeRoute);