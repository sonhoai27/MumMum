/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { Provider } from 'react-redux';
import initStore from './src/stores/Store'
import Root from "./src/components/Root";
export default class App extends Component {
  render() {
    return (
        <Provider store={initStore()}>
            <Root />
        </Provider>
    );
  }
}
