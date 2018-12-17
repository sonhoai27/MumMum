import React from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, Modal, StyleSheet, FlatList } from 'react-native';
import { PRIMARY_COLOR, SIZE } from '../../../configs/Const';
import {apiGetAllDistricts, apiGetWardsByDistrict, setMyAddress} from "../../../stores/address/AddressActions";
type AddressScreenProps = {
  modalVisible: boolean,
  setModalVisible: Function
};
type AddressScreenStates = {
  flag: boolean,
  temp: any,
  myAdress: any
}
class AddressScreen extends React.Component<AddressScreenProps, AddressScreenStates> {
  constructor(props) {
    super(props);
    this.state = {
      flag: true,
      temp: [],
      myAdress: []
    }
  }
  makeMyAddress = () => {
    let address = ""
    this.state.myAdress.map((element, index) => {
      if (index !== 0) {
        address = element + ", " + address
      } else {
        address = element + address
      }
    })
    return address
  }
  componentDidMount(): void {
    this.props.apiGetAllDistricts()
  }

  renderListDistrict = () => {
    return (
        <FlatList
            keyExtractor={(item, index) => item.id + (new Date())}
            data={this.props.districtsState}
            renderItem={({ item }) => {
              return <ItemAddress onPress={() => {
                this.setState({
                  flag: false,
                  myAdress: [...[], item.name]
                }, () => {
                  this.props.apiGetWardsByDistrict(item.id)
                })
              }} id={item.id} data={item} />
            }}
        />
    )
  }
  renderListWardByDistrict = () => {
    return (
        <FlatList
            keyExtractor={(item, index) => item.id + (new Date())}
            data={this.props.wardsByDistrictState}
            renderItem={({ item }) => {
              return (
                  <TouchableOpacity onPress={() => {
                    this.setState({
                      myAdress: [...this.state.myAdress, item.name]
                    }, () => {
                      this.setState({
                        flag: true
                      }, () => {
                        this.props.setMyAddress(this.makeMyAddress())
                        this.props.setModalVisible()
                      })
                    })
                  }}>
                    <Text style={{ fontSize: 16, padding: 12, borderBottomWidth: 1, borderBottomColor: "#eee" }}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
              )
            }}
        />
    )
  }
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
          <View style={AddressScreenStyles.header}>
            <Text style={AddressScreenStyles.header__title}>Địa chỉ của tôi</Text>
          </View>
          <View style={{flex: 10}}>
            {
              this.state.flag ? this.renderListDistrict() : this.renderListWardByDistrict()
            }
          </View>
        </Modal>
      </View>
    );
  }
}

const ItemAddress = (props) => {
  return (
      <TouchableOpacity onPress={props.onPress}>
        <Text style={{ fontSize: 16, padding: 12, borderBottomWidth: 1, borderBottomColor: "#eee" }}>
          {props.data.name}
        </Text>
      </TouchableOpacity>

  )
}
const AddressScreenStyles = StyleSheet.create({
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
});

const mapStateToProps = state => ({
  districtsState: state.address.districtsState,
  wardsByDistrictState: state.address.wardsByDistrictState
});

const mapDispatchToProps = {
  apiGetAllDistricts,
  apiGetWardsByDistrict,
  setMyAddress
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddressScreen);
