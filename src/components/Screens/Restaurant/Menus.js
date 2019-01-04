import React from 'react'
import {connect} from 'react-redux'
import {
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  Image, FlatList,
  TouchableOpacity,
  ToastAndroid,
  Alert
} from 'react-native'
import {PRIMARY_COLOR, SIZE} from "../../../configs/Const";
import {addIcon, editIcon, removeIcon2} from "../../Header";
import {getMenusRes, setRestaurantId} from "../../../stores/lists/ListActions";
import {winSize} from "./NearMe";
import {addToCart, setNullCart} from "../../../stores/order/OrderActions";
import {issetOrder} from "../../../configs/IssetOrder";
import {_removeData, _storeData} from "../../../configs/LocalStorage";
import {ACTION_TYPES} from "../../../stores/order/OrderTypes";

type CategoryProps = {
  navigation: any;
  getMenusRes?: Function,
  menuOfResState?: any;
  shoppingCartState?: any;
  addToCart: Function;
  statusAddToCard: Function;
  setRestaurantId: Function;
  setNullCart: Function;
  currentRestaurant: any;
  statusAddToCartState: any;
}

type MenuStates = {
  isNullCart: boolean;
}

class Menus extends React.Component<CategoryProps, MenuStates> {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props)
    this.state = {
      isNullCart: false,
    }
  }

  componentDidMount(): void {
    this.props.getMenusRes(this.props.screenProps.state.params.item.id)
  }

  componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
    if (this.props.shoppingCartState !== prevProps.shoppingCartState && this.props.shoppingCartState.length > 0) {
      ToastAndroid.show('Thành công!', ToastAndroid.SHORT);
    }
    if (this.props.shoppingCartState !== prevProps.shoppingCartState && this.props.shoppingCartState.length === 0) {
      this.setState({
        isNullCart: true,
      })
    }
  }

  removeAllFoods = () => {
    this.props.setNullCart()
  };
  showWarningIfAddFoodOfOtherRestaurant = (food) => {
    if (this.props.currentRestaurant !== 0
      && this.props.currentRestaurant !== this.props.screenProps.state.params.item.id) {
      return (
        Alert.alert(
          'Cảnh báo',
          'Món ăn bạn thêm vào thuộc nhà hàng khác, bạn có muốn xóa các món ăn của nhà hàng cũ để thêm món ăn ở nhả hàng mới?',
          [
            {text: 'Cancel'},
            {
              text: 'OK', onPress: () => {
                this.removeAllFoods();
                if(this.state.isNullCart) {
                  this.props.setRestaurantId(this.props.screenProps.state.params.item.id)
                  this.props.addToCart(this.props.shoppingCartState, {
                    food,
                    idFood: food.id,
                    quantity: 1,
                    note: ""
                  });
                }
              }
            },
          ],
          {cancelable: true}
        )
      )
    } else if (this.props.currentRestaurant === 0) {
      this.props.setRestaurantId(this.props.screenProps.state.params.item.id)
      this.props.addToCart(this.props.shoppingCartState, {
        food,
        idFood: food.id,
        quantity: 1,
        note: ""
      });
    } else if(this.props.currentRestaurant === this.props.screenProps.state.params.item.id) {
      this.props.addToCart(this.props.shoppingCartState, {
        food,
        idFood: food.id,
        quantity: 1,
        note: ""
      });
    }
  }
  addToCart = (food) => {
    this.showWarningIfAddFoodOfOtherRestaurant(food)
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
              <View style={{
                borderRadius: SIZE["4"],
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
                elevation: 2,
                backgroundColor: '#fff',
              }}>
                <TouchableOpacity
                  onPress={() => {
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
                  onPress={() => {
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
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  menuOfResState: state.lists.menuOfResState,
  currentRestaurant: state.lists.currentRestaurant,
  shoppingCartState: state.order.shoppingCartState
});

const mapDispatchToProps = {
  getMenusRes,
  addToCart,
  setRestaurantId,
  setNullCart
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menus);