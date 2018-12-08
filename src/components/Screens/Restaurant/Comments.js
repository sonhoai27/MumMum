import React from 'react'
import {connect} from 'react-redux'
import {
    View,
    Text, ScrollView
} from 'react-native'
import {PRIMARY_COLOR, SIZE} from "../../../configs/Const";

type CommentProps = {
    navigation: any;
}
class Comments extends React.Component<CommentProps> {

    constructor(props) {
        super(props)
    }
    render() {
        return (
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{color: PRIMARY_COLOR, fontSize: SIZE["64"]}}>COMMENT</Text>
                </View>
            </ScrollView>
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
)(Comments);