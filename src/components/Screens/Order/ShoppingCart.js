import React from 'react'
import {connect} from 'react-redux'
import {
    View,
    Text
} from 'react-native'

type SCProps = {
    navigation: any;
}
class MyShoppingCart extends React.Component<SCProps> {

    constructor(props) {
        super(props)
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff'}}>
                <Text>AAAA</Text>
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
)(MyShoppingCart);