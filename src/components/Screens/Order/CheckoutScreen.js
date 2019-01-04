import React from 'react';
import {connect} from 'react-redux';
import {View, Text, TouchableOpacity, Modal, StyleSheet, ScrollView, TextInput, Alert} from 'react-native';
import {PRIMARY_COLOR, SIZE} from '../../../configs/Const';
import {navigateIcon} from '../../Header';
import {distanceFrom} from '../../../configs/distanceBetween2Points'
import AddressScreen from './AddressScreen';
import {setMyAddress} from "../../../stores/address/AddressActions";
import {makeMyAddress} from "../../../configs/makeAddress";
import {apiCreateOrder, setNullCart} from "../../../stores/order/OrderActions";

type CheckoutScreenProps = {
    navigation: any,
    modalVisible: boolean,
    setModalVisible: Function,
    apiCreateOrder: Function,
    shoppingCartState: any;
    myGeolocationState: any;
    myAddressState: any;
    userInfoState: any;
    userState: any;
    currentRestaurant: any;
    setNullCart: Function
};

type CheckoutScreenStates = {
    modalVisible: boolean,
    setModalVisible: Function,
    order: {
        totalPrice: number;
        item: any[];
        address: string;
        phone: number;
        idRestaurant: string;
    }
}

class CheckoutScreen extends React.Component<CheckoutScreenProps, CheckoutScreenStates> {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false
        }
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
        if(prevProps.ordersState !== this.props.ordersState && typeof this.props.ordersState == 'number'){
            Alert.alert(
              'Thành công',
              'Món ăn của bạn đã đặt hàng thành công.',
              [
                  {
                      text: 'OK', onPress: () => {
                        this.props.setModalVisible()
                          this.props.setNullCart()
                      }
                  },
              ],
              {cancelable: true}
            )
        }
        if(prevProps.currentRestaurant !== this.props.currentRestaurant) {
            this.setState({
                order: {
                    ...this.state.order,
                    idRestaurant: this.props.currentRestaurant,
                }
            })
        }
    }
    componentDidMount(): void {
        this.setState({
            order: {
                totalPrice: this.totalMoney(),
                item: this.makeFoodItems(),
                phone: this.props.userInfoState.phone,
                idRestaurant: this.props.currentRestaurant,
                address: makeMyAddress(this.props.myAddressState)
            }
        })
    }

    makeFoodItems = () => {
        let tempFoods = [];
        for(let i = 0; i < this.props.shoppingCartState.length; i++) {
            tempFoods = [...tempFoods, {
                idFood: this.props.shoppingCartState[i].idFood,
                quantity: this.props.shoppingCartState[i].quantity,
                note: this.props.shoppingCartState[i].note,
            }]
        }
        return tempFoods;
    }

    setModalVisible() {
        this.setState({
            modalVisible: !this.state.modalVisible
        });
    }

    formatMoney = money => {
        return money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };
    totalMoney = () => {
        let total = 0;
        for (var i = 0; i < this.props.shoppingCartState.length; i++) {
            total = total + this.props.shoppingCartState[i].quantity * this.props.shoppingCartState[i].food.price
        }
        return total
    };

    render() {
        return (
            <View style={{flex: 1}}>
                <Modal
                    animationType='none'
                    transparent={false}
                    visible={this.props.modalVisible}
                    onRequestClose={() => {
                        this.props.setModalVisible();
                    }}
                >
                    <View style={CheckoutScreenStyles.header}>
                        <Text style={CheckoutScreenStyles.header__title}>Đặt hàng</Text>
                    </View>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={{flex: 1}}>
                            <TouchableOpacity onPress={() => {
                                this.setModalVisible();
                            }} style={CheckoutScreenStyles.address}>
                                {navigateIcon}
                                <View style={CheckoutScreenStyles.location}>
                                    <Text style={{fontSize: 10}}>Địa điểm giao hàng</Text>
                                    <Text style={{fontSize: 14, fontWeight: 'bold'}}>
                                        {this.props.myAddressState !== '' ? makeMyAddress(this.props.myAddressState) : 'Chọn!'}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={CheckoutScreenStyles.calc}>
                            <View style={CheckoutScreenStyles.calc__item}>
                                <Text>Giá tiền</Text>
                                <Text>{this.formatMoney(this.totalMoney())}</Text>
                            </View>
                            <View style={CheckoutScreenStyles.calc__item}>
                                <Text
                                    style={{
                                        fontWeight: 'bold'
                                    }}
                                >
                                    Tổng thanh toán
                                </Text>
                                <Text>{this.formatMoney(this.totalMoney())}</Text>
                            </View>
                        </View>
                        <View style={{flex: 1, marginBottom: SIZE[16]}}>
                            <TouchableOpacity onPress={() => {
                                this.props.apiCreateOrder(
                                  this.state.order,
                                  this.props.userState.token
                                )
                            }}>
                                <Text
                                    style={{
                                        backgroundColor: PRIMARY_COLOR,
                                        color: '#fff',
                                        padding: SIZE[16],
                                        textAlign: 'center',
                                        marginHorizontal: SIZE[16],
                                        fontSize: SIZE[16],
                                        borderRadius: SIZE[4],
                                    }}
                                >
                                    Đặt hàng
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                    <AddressScreen
                        modalVisible={this.state.modalVisible}
                        setModalVisible={() => {
                            this.setModalVisible();
                        }}/>
                </Modal>
            </View>
        );
    }
}

export const CheckoutScreenStyles = StyleSheet.create({
    header: {
        backgroundColor: PRIMARY_COLOR,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    header__title: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20
    },
    address: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: SIZE['16'],
        backgroundColor: '#fff',
        borderBottomColor: '#eee',
        borderBottomWidth: 1
    },
    location: {
        marginLeft: SIZE['16']
    },
    calc: {
        flex: 8,
        marginHorizontal: SIZE[16],
        marginTop: SIZE[32]
    },
    calc__item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: SIZE[16],
        color: '#000',
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
        paddingBottom: SIZE[16]
    }
});

const mapStateToProps = state => ({
    shoppingCartState: state.order.shoppingCartState,
    ordersState: state.order.ordersState,
    myAddressState: state.address.myAddressState,
    myGeolocationState: state.lists.myGeolocationState,
    currentRestaurant: state.lists.currentRestaurant,
    userInfoState: state.auth.userInfoState,
    userState: state.auth.userState,
});

const mapDispatchToProps = {
    setMyAddress,
    apiCreateOrder,
    setNullCart
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CheckoutScreen);