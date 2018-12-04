import React from 'react'
import {connect} from 'react-redux'
import {
    View,
    Text, StyleSheet, ScrollView, TouchableOpacity
} from 'react-native'
import Header, {headerStyles, navigateIcon, searchIcon} from "../Header";
import ListCategories from "./Category";
import ListRestaurantsByNearMe from "./Restaurant/NearMe";
import {PRIMARY_COLOR} from "../../configs/Const";

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    renderMyAdress = ()=> {
        return (
            <View style={headerStyles.addressTitle}>
                <TouchableOpacity style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    {navigateIcon}
                    <Text style={headerStyles.addressTitle__adress}>11 Nguyễn Đình Chiểu</Text>
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
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({})
const mapStateToProps = state => ({
});

const mapDispatchToProps = {
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
