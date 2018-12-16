import React from 'react'
import {connect} from 'react-redux'
import {
    View,
    Text, TouchableOpacity, Modal, StyleSheet
} from 'react-native'
import {PRIMARY_COLOR, SIZE} from "../../../configs/Const";
import {navigateIcon} from "../../Header";
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
                    animationType="none"
                    transparent={false}
                    visible={this.props.modalVisible}
                    onRequestClose={() => {
                        this.props.setModalVisible();
                    }}>
                    <View style={CheckoutScreenStyles.header}>
                        <Text style={CheckoutScreenStyles.header__title}>
                            Đặt hàng
                        </Text>
                    </View>
                    <View style={{flex: 1,}}>
                        <TouchableOpacity style={CheckoutScreenStyles.address}>
                            {navigateIcon}
                            <View style={CheckoutScreenStyles.location}>
                                <Text style={{fontSize: 10}}>
                                    Địa điểm giao hàng
                                </Text>
                                <Text style={{fontSize: 14, fontWeight: 'bold'}}>
                                    104 Tăng Nhơn Phú A
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>
        )
    }
}

const CheckoutScreenStyles = StyleSheet.create({
    header: {
        backgroundColor: PRIMARY_COLOR,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    header__title: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20,
    },
    address: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: SIZE["16"],
        backgroundColor: '#fff',
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
    },
    location: {
        marginLeft: SIZE["16"]
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
