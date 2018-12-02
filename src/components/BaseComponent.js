import React from 'react'
import {connect} from 'react-redux'
import {
    View,
    Text
} from 'react-native'
import {PRIMARY_COLOR, SIZE} from "../configs/Const";

type BaseComponentProps = {
    navigation: any;
}
class BaseComponent extends React.Component<BaseComponentProps> {

    constructor(props) {
        super(props)
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{color: PRIMARY_COLOR, fontSize: SIZE["64"]}}>BASE COMPONENT</Text>
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
)(BaseComponent);