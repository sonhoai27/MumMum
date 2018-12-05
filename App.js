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
import HomeRoute from "./src/components/HomeRoute";
YellowBox.ignoreWarnings([
    "Warning: isMounted(...) is deprecated",
    "Module RCTImageLoader"
]);

export default class App extends Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Provider store={initStore()}>
                <HomeRoute/>
            </Provider>
        );
    }
}
