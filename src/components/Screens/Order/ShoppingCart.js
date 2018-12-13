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

type SCProps = {
    navigation: any;
    shoppingCartState?: any;
    removeProductFromShoppingCart: Function;
}
type SCStates = {
    currentItem: number
}

class MyShoppingCart extends React.Component<SCProps, SCStates> {
    constructor(props) {
        super(props)
        this.state = {
            currentItem: -1
        }
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
    }

    resItem = (item, index) => {
        return (
            <TouchableOpacity
                style={{flex: 1}}
                onPress={() => {
                    this.setState({
                        currentItem: index
                    }, () => {
                        console.log(this.state.currentItem === index)
                    })
                }}
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
                    borderBottomWidth: this.state.currentItem === index ? 0 : 1,
                    paddingBottom: 16,
                    marginBottom: index === (this.props.shoppingCartState.length - 1) ? 100 : 0,
                    paddingTop: 16,
                    paddingLeft: SIZE["8"],
                    paddingRight: SIZE["8"],
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    borderRadius: SIZE["8"],
                    backgroundColor: this.state.currentItem === index ? '#dcffed' : '#fff'
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
                                width: winSize.width*0.9,
                                height: winSize.width*0.6,
                            }}
                            source={{uri: 'http://goodtogostore.com/assets/images/empty-cart.png'}}/>
                    </View>
                }
                <View style={shoppingCartStyles.container__qty}>
                </View>
            </View>
        )
    }
}

export const shoppingCartStyles = StyleSheet.create({
    qty: {
        backgroundColor: PRIMARY_COLOR,
        paddingHorizontal: SIZE["16"],
        borderRadius: SIZE["8"],
        elevation: 4,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        flex: 5,
        marginRight: 32,
    },
    container__qty: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        position: 'absolute',
        bottom: SIZE["16"],
        left: '10%',
        right: '10%',
        flex: 1
    },
    container__qtyclose: {
        elevation: 3,
        flex: 1,
        backgroundColor: PRIMARY_COLOR,
        borderRadius: 120,
        paddingHorizontal: 8,
        paddingVertical: 9,
        alignItems: 'center',
        justifyContent: 'center',
    }
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