import React from 'react'
import {connect} from 'react-redux'
import {
    View,
    StatusBar,
    SafeAreaView, StyleSheet,
} from 'react-native'

import {apiLogin, setStatusLogin, setUserToken} from "../stores/auth/AuthActions";
import {_retrieveData, _storeData} from "../configs/LocalStorage";
import Home from "./Screens/HomeScreen";
import {setMyGeoLocation} from "../stores/lists/ListActions";
import Login from "./Auth/LoginScreen";
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

    componentDidMount(): void {
        this.props.setMyGeoLocation({
            latitude: '10.773533',
            longitude: '106.702899'
        });
        _retrieveData("@LOGIN", (result) => {
            if (result.message === 400){
                this.props.setStatusLogin(false);
            }else {
                this.props.setStatusLogin(true);
                this.props.setUserToken(result)
            }
        })
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
    setMyGeoLocation,
    setStatusLogin,
    setUserToken
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppFoodScreen);