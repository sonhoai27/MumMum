/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {YellowBox} from 'react-native'
import {Provider} from 'react-redux';
import initStore from './src/stores/Store'
import Route from "./src/Route";
import {createStackNavigator, createAppContainer} from "react-navigation";
import Account from "./src/components/Auth/AccountScreen";
import LoginScreen from "./src/components/Auth/LoginScreen";
import RegisterScreen from "./src/components/Auth/RegisterScreen";
YellowBox.ignoreWarnings([
    "Warning: isMounted(...) is deprecated",
    "Module RCTImageLoader"
]);


const AppStack = createStackNavigator(
    {
        App: {screen: Route},
        Login: {screen: LoginScreen},
        Register: {screen: RegisterScreen},
    },
    {
        initialRouteName: 'App',
    }
);
const AppContainer = createAppContainer(AppStack);
export default class App extends Component {
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
