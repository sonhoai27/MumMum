import React from 'react'
import {connect} from 'react-redux'
import {
    View,
    Text, FlatList,
    TouchableOpacity, StyleSheet,
    Alert, ToastAndroid, Image
} from 'react-native'
import {PRIMARY_COLOR, SIZE} from "../../../configs/Const";
import {removeProductFromShoppingCart} from "../../../stores/order/OrderActions";
import {winSize} from "../Restaurant/NearMe";
import {basketIcon} from "../../Header";
import CheckoutScreen from "./CheckoutScreen";
import NoteAdd from "../Restaurant/NoteAdd";

type SCProps = {
    navigation: any;
    shoppingCartState?: any;
    removeProductFromShoppingCart: Function;
}
type SCStates = {
    modalVisible: boolean;
}
class MyShoppingCart extends React.Component<SCProps, SCStates> {
    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false
        }
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
    }

    setModalVisible() {
        this.setState({
            modalVisible: !this.state.modalVisible
        });
    }

    totalMoney = () => {
        let total = 0;
        for(var i = 0; i < this.props.shoppingCartState.length; i++){
            total = total + this.props.shoppingCartState[i].quantity*this.props.shoppingCartState[i].food.price
        }
        return total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    resItem = (item, index) => {
        return (
            <TouchableOpacity
                style={{flex: 1}}
                onLongPress={() => {
                    Alert.alert(
                        'Thông báo',
                        'Xóa ' + item.food.name + ' khỏi giỏ hàng?',
                        [
                            {
                                text: 'Chấp nhận', onPress: () => {
                                    this.props.removeProductFromShoppingCart(this.props.shoppingCartState, item.idFood)
                                }
                            },
                            {text: 'Hủy', onPress: () => console.log('OK Pressed'), style: 'cancel'},
                        ],
                        {cancelable: true}
                    )
                }}>
                <View style={{
                    borderBottomColor: '#eee',
                    borderBottomWidth: 1,
                    paddingBottom: 16,
                    marginBottom: index === (this.props.shoppingCartState.length - 1) ? 100 : 0,
                    paddingTop: 16,
                    paddingLeft: SIZE["8"],
                    paddingRight: SIZE["8"],
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    borderRadius: SIZE["8"],
                    backgroundColor: '#fff'
                }}>
                    <Text style={{
                        fontSize: SIZE["16"],
                        color: PRIMARY_COLOR,
                        flex: 1
                    }}>
                        {item.quantity}
                    </Text>

                    <Text style={{
                        flex: 8,
                        fontSize: SIZE["16"],
                        textAlign: 'left',
                        fontWeight: '400',
                        color: '#000'
                    }}>
                        {item.food.name}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }

    _keyExtractor = (item, index) => item.idFood + "";

    renderShoppingCart = () => {
        if (this.props.shoppingCartState.length > 0) {
            return (
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={this.props.shoppingCartState}
                    extraData={this.state}
                    renderItem={({item, index}) => this.resItem(item, index)}
                    keyExtractor={this._keyExtractor}/>
            )
        }
    }

    render() {
        return (
            <View style={{
                flex: 1,
                backgroundColor: '#fff',
                paddingHorizontal: SIZE["16"]
            }}>
                {
                    this.props.shoppingCartState.length > 0 ?
                        this.renderShoppingCart() :
                        <View style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            flex: 1
                        }}>
                            <Image
                                style={{
                                    width: winSize.width * 0.9,
                                    height: winSize.width * 0.6,
                                }}
                                source={{uri: 'http://goodtogostore.com/assets/images/empty-cart.png'}}/>
                        </View>
                }
                <View style={shoppingCartStyles.qty}>
                    <TouchableOpacity
                        onPress={()=> {
                            this.setModalVisible();
                        }}
                        style={{flex: 1, flexDirection: 'row'}}>
                        <View style={{flex: 1}}>
                            <Text style={{
                                fontSize: 12,
                                color: '#fff',
                                fontWeight: 'bold'
                            }}>{this.props.shoppingCartState.length} mục | {this.totalMoney()}</Text>
                            <Text style={{
                                color: '#fff', fontSize: 10,
                                fontWeight: 'bold'
                            }}>104 Tăng Nhơn Phú A, Quận 9, Hồ chí Minh</Text>
                        </View>
                        <View>
                            {basketIcon}
                        </View>
                    </TouchableOpacity>
                </View>
                <CheckoutScreen navigation={this.props.screenProps} modalVisible={this.state.modalVisible} setModalVisible={() => {
                    this.setModalVisible();
                }}/>
            </View>
        )
    }
}

export const shoppingCartStyles = StyleSheet.create({
    qty: {
        backgroundColor: PRIMARY_COLOR,
        borderRadius: SIZE["4"],
        elevation: 3,
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        right: SIZE["24"],
        left: SIZE["24"],
        bottom: '4%',
        paddingVertical: SIZE["8"],
        paddingHorizontal: SIZE["16"],
    },
})
const mapStateToProps = state => ({
    shoppingCartState: state.order.shoppingCartState
});

const mapDispatchToProps = {
    removeProductFromShoppingCart
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyShoppingCart);