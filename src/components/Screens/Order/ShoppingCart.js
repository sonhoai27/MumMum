import React from 'react'
import {connect} from 'react-redux'
import {
    View,
    Text, FlatList, TouchableOpacity, StyleSheet,ToastAndroid
} from 'react-native'
import {PRIMARY_COLOR, SIZE} from "../../../configs/Const";
import {addIcon2, checkmarkIcon, removeIcon} from "../../Header";

type SCProps = {
    navigation: any;
    shoppingCartState?: any;
}
type SCStates = {
    currentItem: number
}
class MyShoppingCart extends React.Component<SCProps,SCStates> {
    constructor(props) {
        super(props)
        this.state = {
            currentItem: -1
        }
    }

    resItem = (item, index) => {
        return (
            <TouchableOpacity
                style={{flex: 1}}
                onPress={()=> {
                    this.setState({
                        currentItem: index
                    }, ()=> {
                        console.log(this.state.currentItem === index)
                    })
                }}
                onLongPress={() => {
                    alert(item.food.name);
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
                    backgroundColor: this.state.currentItem === index ? '#dcffed': '#fff'
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
                {this.renderShoppingCart()}
                <View style={shoppingCartStyles.container__qty}>
                    <View style={shoppingCartStyles.qty}>
                        <TouchableOpacity style={{padding: SIZE["8"]}}>
                            {addIcon2}
                        </TouchableOpacity>
                        <Text style={{color: '#fff', fontSize: 20}}>1</Text>
                        <TouchableOpacity style={{padding: SIZE["8"]}}>
                            {removeIcon}
                        </TouchableOpacity>
                    </View>
                    <View style={shoppingCartStyles.container__qtyclose}>
                        <TouchableOpacity onLongPress={()=> {
                            ToastAndroid.show('Chấp nhận!', ToastAndroid.SHORT);
                        }}>
                            {checkmarkIcon}
                        </TouchableOpacity>
                    </View>
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

const mapDispatchToProps = {}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyShoppingCart);