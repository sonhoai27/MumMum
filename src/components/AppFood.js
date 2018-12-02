import React from 'react'
import {connect} from 'react-redux'
import {
    View,
    StatusBar,
    SafeAreaView, StyleSheet,
} from 'react-native'

import {apiLogin, setStatusLogin, setUserToken} from "../stores/auth/AuthActions";
import {_retrieveData, _storeData} from "../configs/LocalStorage";
import Home from "./Screens";
import {setMyGeoLocation} from "../stores/lists/ListActions";
import Login from "./Auth/Login";

class AppFood extends React.Component {
    static navigationOptions = {
        header: null
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
                    backgroundColor="#fff"
                />
                <View style={{ flex: 1, }}>
                    {
                        this.props.isLoginState ? <Home navigation={this.props.navigation}/> : <Login navigation={this.props.navigation}/> // do cho nay ko phai route den login nen phai truyen props
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
    loginState: state.auth.loginState,
    isLoginState: state.auth.isLoginState,
});

const mapDispatchToProps = {
    setMyGeoLocation,
    setStatusLogin,
    setUserToken
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppFood);