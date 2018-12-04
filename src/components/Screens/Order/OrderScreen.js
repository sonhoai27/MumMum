import React from 'react'
import {connect} from 'react-redux'
import {
    View,
    Text, StyleSheet,TouchableOpacity
} from 'react-native'
import {PRIMARY_COLOR, SIZE} from "../../../configs/Const";
import {setStatusLogin} from "../../../stores/auth/AuthActions";

type OrderScreenProps = {
    navigation: any;
    isLoginState?: boolean;
}
type OrderScreenStates = {
}
class OrderScreen extends React.Component<OrderScreenProps,OrderScreenStates> {
    static navigationOptions = {
        title: 'Giỏ hàng',
        headerStyle: {
            backgroundColor: PRIMARY_COLOR,
            elevation: 0,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
            textAlign: 'center',
            flex: 1
        },
    };


    constructor(props) {
        super(props)
        if (!this.props.isLoginState){
            this.props.navigation.navigate("Login")
        }
    }
    componentDidMount(): void {
        console.log(this.props.isLoginState)
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Text>AAA</Text>
            </View>
        )
    }
}

export const orderStyles = StyleSheet.create({
    header: {
        backgroundColor: PRIMARY_COLOR,
        flexDirection: 'row',
        paddingHorizontal: SIZE["24"],
        alignItems: 'center',
        paddingBottom: 17.5,
        paddingTop: 10.5
    },
    headerTitle: {
        fontSize: 24,
        color: '#fff',
        lineHeight: 36,
        textAlign: 'center',
        flex: 1,
        fontWeight: 'bold'
    },
    btnGoBack: {
    }
})
const mapStateToProps = state => ({
    isLoginState: state.auth.isLoginState,
});

const mapDispatchToProps = {
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OrderScreen);