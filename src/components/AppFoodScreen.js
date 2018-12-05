import React from 'react'
import {connect} from 'react-redux'
import {
    View,
    StatusBar,
    SafeAreaView, StyleSheet,
} from 'react-native'


import Home from "./Screens/HomeScreen";
import {PRIMARY_COLOR} from "../configs/Const";

class AppFoodScreen extends React.Component {
    static navigationOptions = {
        title: 'Trang chủ',
        headerStyle: {
            backgroundColor: PRIMARY_COLOR,
            elevation: 0,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
            textAlign: 'center',
            flex: 1
        }
    };
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <SafeAreaView style={{backgroundColor: '#fff', flex: 1}}>
                <StatusBar
                    barStyle="dark-content"
                    backgroundColor={PRIMARY_COLOR}
                />
                <View style={{ flex: 1, }}>
                    {
                        <Home navigation={this.props.navigation}/>

                    }
                </View>
            </SafeAreaView>
        )
    }
}

export const rootStyles = StyleSheet.create({
    bgWhite: {
        backgroundColor: '#fff'
    }
})
const mapStateToProps = state => ({
});

const mapDispatchToProps = {
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppFoodScreen);