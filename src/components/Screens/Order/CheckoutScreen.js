import React from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { PRIMARY_COLOR, SIZE } from '../../../configs/Const';
import { navigateIcon } from '../../Header';
import {distanceFrom} from '../../../configs/distanceBetween2Points'
import AddressScreen from './AddressScreen';
import {setMyAddress} from "../../../stores/address/AddressActions";
type CheckoutScreenProps = {
  navigation: any,
  modalVisible: boolean,
  setModalVisible: Function,
  shoppingCartState: any
};

type CheckoutScreenStates = {
  modalVisible: boolean,
  setModalVisible: Function,
}
class CheckoutScreen extends React.Component<CheckoutScreenProps, CheckoutScreenStates> {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false
    }
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
    for(var i = 0; i < this.props.shoppingCartState.length; i++){
        total = total + this.props.shoppingCartState[i].quantity*this.props.shoppingCartState[i].food.price
    }
    return total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
  render() {
    return (
      <View style={{ flex: 1 }}>
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
          <View style={{ flex: 1 }}>
            <TouchableOpacity onPress={()=> {
              this.setModalVisible();
            }} style={CheckoutScreenStyles.address}>
              {navigateIcon}
              <View style={CheckoutScreenStyles.location}>
                <Text style={{ fontSize: 10 }}>Địa điểm giao hàng</Text>
                <Text style={{ fontSize: 14, fontWeight: 'bold' }}>
                  {this.props.myAddressState !== '' ? this.props.myAddressState : 'Chọn!'}
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
              <View style={{
                  flexDirection: 'column',
              }}>
                <Text>Phí vận chuyển</Text>
                <Text style={{fontSize: 10}}>4.000 cho 1km</Text>
              </View>
              <Text>{this.formatMoney(distanceFrom({
                  'lat1': 10.773533,
                  'lng1': 106.702899,
                  'lat2': 10.7723477,
                  'lng2': 106.7429439
              })*4000)}</Text>
            </View>
            <View style={CheckoutScreenStyles.calc__item}>
              <Text
                style={{
                  fontWeight: 'bold'
                }}
              >
                Tổng thanh toán
              </Text>
              <Text>{this.formatMoney(300000)}</Text>
            </View>
          </View>
          <View style={{ flex: 1, marginBottom: SIZE[16] }}>
            <TouchableOpacity>
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
    myAddressState: state.address.myAddressState
});

const mapDispatchToProps = {
  setMyAddress
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckoutScreen);
