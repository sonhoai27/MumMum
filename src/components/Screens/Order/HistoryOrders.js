import React from 'react'
import {connect} from 'react-redux'
import {
    View,
    Text
} from 'react-native'
import {apiGetAllHistoryOrderOfUser} from "../../../stores/order/OrderActions";

type HistoryOrdersProps = {
    navigation: any;
    userState: any;
    apiGetAllHistoryOrderOfUser: Function;
    historyOrdersOfUserState: any;
}
class HistoryOrders extends React.Component<HistoryOrdersProps> {

    constructor(props) {
        super(props)
    }
    componentDidMount(): void {
        this.props.apiGetAllHistoryOrderOfUser(this.props.userState.token)
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff'}}>
                <Text>AAA</Text>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    userState: state.auth.userState,
    historyOrdersOfUserState: state.order.historyOrdersOfUserState,
});

const mapDispatchToProps = {
    apiGetAllHistoryOrderOfUser
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HistoryOrders);