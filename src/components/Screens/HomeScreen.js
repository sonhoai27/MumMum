import React from 'react'
import {connect} from 'react-redux'
import {
    View,
    Text, StyleSheet, ScrollView, TouchableOpacity
} from 'react-native'
import Header, {headerStyles, navigateIcon } from "../Header";
import ListCategories from "./Category";
import ListRestaurantsByNearMe from "./Restaurant/NearMe";
import AddressScreen from "./Order/AddressScreen";
type HomeStates = {
    modalVisible: boolean,
    setModalVisible: Function,
}
class Home extends React.Component<{}, HomeStates> {
    static navigationOptions = {
        header: null,
    };
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

    renderMyAdress = ()=> {
        return (
            <View style={headerStyles.addressTitle}>
                <TouchableOpacity
                    onPress={()=> {
                        this.setModalVisible()
                    }}
                    style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    {navigateIcon}
                    <Text style={headerStyles.addressTitle__adress}>
                        {this.props.myAddressState !== '' ? this.props.myAddressState : 'Chọn!'}
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
    render() {
        return (
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ flex: 1, backgroundColor: '#fff'}}>
                    {this.renderMyAdress()}
                    <ListCategories/>
                    <ListRestaurantsByNearMe navigation={this.props.navigation}/>

                </View>
                <AddressScreen
                    modalVisible={this.state.modalVisible}
                    setModalVisible={() => {
                        this.setModalVisible();
                    }}/>
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({})
const mapStateToProps = state => ({
    myAddressState: state.address.myAddressState
});

const mapDispatchToProps = {

}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
