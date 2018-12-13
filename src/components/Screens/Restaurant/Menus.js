import React from 'react'
import {connect} from 'react-redux'
import {
    View,
    Text,
    ScrollView,
    TouchableWithoutFeedback,
    Image, FlatList,
    TouchableOpacity,
    ToastAndroid
} from 'react-native'
import {PRIMARY_COLOR, SIZE} from "../../../configs/Const";
import {addIcon, editIcon, removeIcon2} from "../../Header";
import {getMenusRes} from "../../../stores/lists/ListActions";
import {winSize} from "./NearMe";
import {addToCart} from "../../../stores/order/OrderActions";
import NoteAdd from "./NoteAdd";
import {issetOrder} from "../../../configs/IssetOrder";

type CategoryProps = {
    navigation: any;
    getMenusRes?: Function,
    menuOfResState?: any;
    shoppingCartState?: any;
    addToCart: Function;
    statusAddToCard: Function;
    statusAddToCartState: any;
}

type MenuStates = {
    modalVisible: boolean;
}

class Menus extends React.Component<CategoryProps, MenuStates> {
    static navigationOptions = {
        header: null
    };

    setModalVisible() {
        this.setState({
            modalVisible: !this.state.modalVisible
        });
    }

    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false
        }
    }

    componentDidMount(): void {
        this.props.getMenusRes(this.props.screenProps.state.params.item.id)
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
        if(this.props.shoppingCartState !== prevProps.shoppingCartState){
            ToastAndroid.show('Thành công!', ToastAndroid.SHORT);
        }
    }

    addToCart = (food) => {
        this.props.addToCart(this.props.shoppingCartState, {
            food,
            idFood: food.id,
            quantity: 1,
            note: ""
        });
    };

    showQty = (idFood, carts) => {
        const item = carts.filter(element => {
            return element.idFood === idFood
        });

        return item[0].quantity;
    };

    resItem = (item) => (
        <TouchableWithoutFeedback>
            <View style={{
                margin: 12,
                flexDirection: 'row',
                marginBottom: SIZE["24"],
            }}>
                <Image style={{
                    borderRadius: SIZE["8"],
                    width: winSize.width / 5,
                    height: winSize.width / 5
                }} source={{uri: item.image}}/>

                <View style={{
                    flexDirection: 'column',
                    marginHorizontal: SIZE["8"],
                    flex: 1,
                }}>
                    <Text style={{
                        textAlign: 'left',
                        fontSize: 14,
                        color: PRIMARY_COLOR,
                        lineHeight: 14
                    }}>{item.name}</Text>
                    <Text style={{
                        textAlign: 'left',
                        fontSize: 13,
                        color: '#333'
                    }}>{(item.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Text>
                    {
                        issetOrder(item.id, this.props.shoppingCartState) ? <View style={{
                            position: 'absolute',
                            bottom: 0,
                            right: 0,
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                            <TouchableOpacity
                                onPress={() => {
                                    this.setModalVisible()
                                }}
                                style={{
                                    elevation: 2,
                                    borderRadius: SIZE["4"],
                                    padding: 4,
                                    marginRight: SIZE["16"],
                                    backgroundColor: '#fff'
                                }
                                }>
                                {editIcon}
                            </TouchableOpacity>
                            <View style={{
                                borderRadius: SIZE["4"],
                                justifyContent: 'space-between',
                                flexDirection: 'row',
                                alignItems: 'center',
                                elevation: 2,
                                backgroundColor: '#fff',
                            }}>
                                <TouchableOpacity
                                    onPress={()=> {
                                        this.props.addToCart(this.props.shoppingCartState, {
                                            item,
                                            idFood: item.id,
                                            quantity: 1,
                                            note: ""
                                        });
                                    }}
                                    style={{paddingHorizontal: 8}}>
                                    {addIcon}
                                </TouchableOpacity>
                                <Text style={{paddingHorizontal: 8}}>
                                    {this.showQty(item.id, this.props.shoppingCartState)}
                                </Text>
                                <TouchableOpacity
                                    onPress={()=> {
                                        this.props.addToCart(this.props.shoppingCartState, {
                                            item,
                                            idFood: item.id,
                                            quantity: 1,
                                            note: ""
                                        }, 0, 1);
                                    }}
                                    style={{paddingHorizontal: 8}}>
                                    {removeIcon2}
                                </TouchableOpacity>
                            </View>
                        </View> : <View style={{
                            position: 'absolute',
                            bottom: 0,
                            right: 0,
                            paddingHorizontal: SIZE["16"],
                            paddingVertical: SIZE["4"],
                            borderRadius: SIZE["16"],
                            justifyContent: 'center',
                            alignItems: 'center',
                            elevation: 2,
                            backgroundColor: PRIMARY_COLOR,
                        }}>
                            <TouchableOpacity onPress={() => this.addToCart(item)}>
                                <Text style={{
                                    color: '#fff',
                                }}>Thêm</Text>
                            </TouchableOpacity>
                        </View>
                    }
                </View>

            </View>
        </TouchableWithoutFeedback>
    );

    _keyExtractor = (item, index) => item.id + "";

    renderListMenus = () => {
        if (this.props.menuOfResState.menu) {
            return (
                <FlatList
                    extraData={this.props.shoppingCartState}
                    data={this.props.menuOfResState.menu}
                    renderItem={({item}) => this.resItem(item)}
                    keyExtractor={this._keyExtractor}/>
            )
        }
    };

    render() {
        return (
            <View style={{flex: 1}}>
                <ScrollView showsVerticalScrollIndicator={false} style={{
                    paddingTop: SIZE["24"],
                }}>
                    <View style={{flex: 1, paddingBottom: SIZE["24"]}}>
                        <View style={{padding: 0}}>
                            {this.renderListMenus()}
                        </View>
                    </View>
                    <NoteAdd modalVisible={this.state.modalVisible} setModalVisible={() => {
                        this.setModalVisible();
                    }}/>
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    menuOfResState: state.lists.menuOfResState,
    shoppingCartState: state.order.shoppingCartState
});

const mapDispatchToProps = {
    getMenusRes,
    addToCart
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Menus);