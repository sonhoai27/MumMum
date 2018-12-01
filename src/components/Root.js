import React from 'react'
import {connect} from 'react-redux'
import {
    View,
    StatusBar,
    SafeAreaView
} from 'react-native'
import {apiLogin} from "../stores/auth/Actions";
import {_retrieveData, _storeData} from "../configs/LocalStorage";
import Home from "./Screens";
import {getGeolocation} from "../configs/Geolocation";
import {setMyGeoLocation} from "../stores/lists/Actions";

class Root extends React.Component {

    constructor(props) {
        super(props)
    }

    componentDidMount(): void {
        getGeolocation(result => {
            this.props.setMyGeoLocation(result)
        });
        //this.props.apiLogin('linhnguyen1512286@gmail.com', '123')
        _retrieveData("@LOGIN", (result) => {
            console.log(result)
        })
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
        if (this.props.loginState !== prevProps.loginState){
            _storeData("@LOGIN", this.props.loginState, (result)=> {
                console.log(result)
            })
        }
    }

    render() {
        return (
            <SafeAreaView style={{backgroundColor: '#fff', flex: 1}}>
                <StatusBar
                    barStyle="dark-content"
                    backgroundColor="#fff"
                />
                <View style={{ flex: 1, }}>
                    <Home/>
                </View>
            </SafeAreaView>
        )
    }
}

const mapStateToProps = state => ({
    loginState: state.auth.loginState
});

const mapDispatchToProps = {
    apiLogin,
    setMyGeoLocation
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Root);