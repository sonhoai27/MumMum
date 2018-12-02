import React from 'react'
import {connect} from 'react-redux'
import {
    View,
    StatusBar,
    SafeAreaView
} from 'react-native'
import {apiLogin, setStatusLogin} from "../stores/auth/AuthActions";
import {_retrieveData, _storeData} from "../configs/LocalStorage";
import Home from "./Screens";
import {setMyGeoLocation} from "../stores/lists/Actions";
import Login from "./Auth/Login";

class Root extends React.Component {

    constructor(props) {
        super(props)
    }

    componentDidMount(): void {
        this.props.setMyGeoLocation({
            latitude: '10.773533',
            longitude: '106.702899'
        })
        _retrieveData("@LOGIN", (result) => {
            if (result.message !== 400){
                this.props.setStatusLogin(false)
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
                        this.props.isLoginState ? <Home/> : <Login/>
                    }
                </View>
            </SafeAreaView>
        )
    }
}

const mapStateToProps = state => ({
    loginState: state.auth.loginState,
    isLoginState: state.auth.isLoginState,
});

const mapDispatchToProps = {
    setMyGeoLocation,
    setStatusLogin
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Root);