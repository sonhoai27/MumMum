/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {YellowBox,Animated} from 'react-native'
import {Provider} from 'react-redux';
import initStore from './src/stores/Store'
import Root from "./src/components/AppFoodScreen";
import {createStackNavigator,createAppContainer} from "react-navigation";
import Register from "./src/components/Auth/RegisterScreen";
import Login from "./src/components/Auth/LoginScreen";
import Account from "./src/components/Auth/AccountScreen";
import Restaurant from "./src/components/Screens/Restaurant/RestaurantScreen";
import * as Easing from "react-native";

YellowBox.ignoreWarnings([
    "Warning: isMounted(...) is deprecated",
    "Module RCTImageLoader"
]);

const AppFoodStack = createStackNavigator(
    {
        Home: {screen: Root},
        Search: {screen: Root},
        Account: {screen: Account},
        Restaurant: {screen: Restaurant}
    },
    {
        initialRouteName: 'Home',
        headerMode: 'screen',
    }
);
AppFoodStack.navigationOptions = {
    header: null,
};

const AppStack = createStackNavigator(
    {
        Root: AppFoodStack,
        Register: {screen: Register},
        Login: {screen: Login}
    },
    {
        initialRouteName: 'Root',
        headerMode: 'screen'
    }
);

AppStack.navigationOptions = {
    header: null,
};


const AppContainer = createAppContainer(AppStack);

export default class App extends Component {
    constructor(props){
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
