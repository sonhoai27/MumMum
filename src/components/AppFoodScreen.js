import React from 'react'
import {connect} from 'react-redux'
import {
    View,
    StatusBar,
    SafeAreaView, StyleSheet,
} from 'react-native'


import Home from "./Screens/HomeScreen";
import {PRIMARY_COLOR} from "../configs/Const";
import {addToCart} from "../stores/order/OrderActions";
import {_retrieveData} from "../configs/LocalStorage";
import {setMyAddress} from "../stores/address/AddressActions";
import {apiUserInfo} from "../stores/auth/AuthActions";

type AppFoodScreenProps = {
    addToCart: Function;
    shoppingCartState: any;
}
class AppFoodScreen extends React.Component<AppFoodScreenProps> {
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
        this.getSessionOrder();
    }

    getSessionOrder = () => {
        _retrieveData("@ORDERS", (result) => {
            if (!result.message) {
                this.props.addToCart(this.props.shoppingCartState, result, 1);
            }
        })
        _retrieveData("@ADDRESS", (result) => {
            if (!result.message) {
                this.props.setMyAddress(result);
            }else {
                this.props.setMyAddress('');
            }
        })
    };

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
    shoppingCartState: state.order.shoppingCartState
});

const mapDispatchToProps = {
    addToCart,
    setMyAddress
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppFoodScreen);