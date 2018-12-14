import React from 'react'
import {connect} from 'react-redux'
import {
    View,
    Text, TouchableOpacity, Modal, StyleSheet
} from 'react-native'
import {PRIMARY_COLOR} from "../../../configs/Const";
type CheckoutScreenProps = {
    navigation: any;
    modalVisible: boolean;
    setModalVisible: Function;
}
class CheckoutScreen extends React.Component<CheckoutScreenProps> {
    constructor(props) {
        super(props)

    }
    render() {
        return (
            <View style={{ flex: 1}}>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.props.modalVisible}
                    onRequestClose={() => {
                        this.props.setModalVisible();
                    }}>
                    <View style={CheckoutScreenStyles.header}>
                        <Text>AAAAA</Text>
                    </View>
                </Modal>
            </View>
        )
    }
}

export const CheckoutScreenStyles = StyleSheet.create({
    header: {
        backgroundColor: PRIMARY_COLOR,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    }
});

const mapStateToProps = state => ({
});

const mapDispatchToProps = {
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CheckoutScreen);