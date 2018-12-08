import React from 'react'
import {connect} from 'react-redux'
import {
    View,
    Text
} from 'react-native'

type HistoryOrdersProps = {
    navigation: any;
}
class HistoryOrders extends React.Component<HistoryOrdersProps> {

    constructor(props) {
        super(props)
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
});

const mapDispatchToProps = {
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HistoryOrders);