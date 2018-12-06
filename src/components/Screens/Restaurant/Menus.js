import React from 'react'
import {connect} from 'react-redux'
import {
    View,
    Text,
    ScrollView,
    TouchableWithoutFeedback,
    Image, FlatList,
    TouchableOpacity
} from 'react-native'
import {PRIMARY_COLOR, SIZE} from "../../../configs/Const";
import { addIcon, headerStyles } from "../../Header";
import {getMenusRes} from "../../../stores/lists/ListActions";
import {winSize} from "./NearMe";
import {addToCart} from "../../../stores/order/OrderActions";

type CategoryProps = {
    navigation: any;
    getMenusRes?: Function,
    menuOfResState?: any;
    shoppingCartState?: any;
    addToCart: Function;
}
class Menus extends React.Component<CategoryProps> {
    static navigationOptions = {
        header: null
    };
    constructor(props) {
        super(props)
        console.log(this.props.screenProps)
    }
    componentDidMount(): void {
        this.props.getMenusRes(this.props.screenProps.state.params.item.id)
    }

    addToCart = (food) => {
        this.props.addToCart(this.props.shoppingCartState,food);
    };

    resItem = (item) => (
        <TouchableWithoutFeedback>
            <View style={{
                margin: 12,
                borderRadius: SIZE["8"],
                backgroundColor: '#fafafa',
                overflow: 'hidden',
                flexDirection: 'row',
                borderBottomColor: '#eee',
                borderBottomWidth: 1,
            }}>
                <Image style={{
                    width: winSize.width/4,
                    height: winSize.width/4
                }} source={{uri: item.image}}/>

                <View style={{
                    flexDirection: 'column',
                    margin: SIZE["8"],
                    flex: 1,
                }}>
                    <Text style={{
                        textAlign: 'left',
                        fontSize: 14,
                        color: PRIMARY_COLOR,
                        fontWeight: 'bold'
                    }}>{item.name}</Text>
                    <Text style={{
                        textAlign: 'left',
                        fontSize: 16,
                        color: '#333'
                    }}>{(item.price).toLocaleString('vn')}đ</Text>
                    <View style={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        width: 28,
                        height: 28,
                        borderRadius: SIZE["120"],
                        justifyContent: 'center',
                        alignItems: 'center',
                        elevation: 2,
                        backgroundColor: PRIMARY_COLOR,
                    }}>
                        <TouchableOpacity onPress={()=> this.addToCart(item)}>
                            {addIcon}
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        </TouchableWithoutFeedback>
    );

    _keyExtractor = (item, index) => item.id + "";

    renderListMenus = () => {
        if (this.props.menuOfResState.menu){
            return (
                <FlatList
                    data={this.props.menuOfResState.menu}
                    renderItem={({item}) => this.resItem(item)}
                    keyExtractor={this._keyExtractor}/>
            )
        }
    };

    render() {
        return (
            <ScrollView showsVerticalScrollIndicator={false} style={{

            }}>
                <View style={{flex: 1}}>
                    <View style={{padding: 12}}>
                        {this.renderListMenus()}
                    </View>
                </View>
            </ScrollView>
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