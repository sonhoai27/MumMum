import React from 'react'
import {connect} from 'react-redux'
import {
    View,
    Text, StyleSheet, ScrollView, TouchableOpacity
} from 'react-native'
import Header, {headerStyles, navigateIcon, searchIcon} from "../Header";
import ListCategories from "./Category";
import ListRestaurantsByNearMe from "./Restaurant";
import {SIZE} from "../../configs/Const";

class Home extends React.Component {
    static navigationOptions = {
        header: null
    };
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

    renderSearchBar = ()=> {
        return (
            <View style={headerStyles.searchBar}>
                {searchIcon}
                <Text style={{
                    marginLeft: 8,
                    paddingHorizontal: SIZE["8"],
                    paddingVertical: 10
                }}>
                    Bạn đang tìm gì?
                </Text>
            </View>
        )
    }
    render() {
        return (
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ flex: 1, backgroundColor: '#fff'}}>

                    <Header title={'Trang chủ'} navigation={this.props.navigation}/>
                    {this.renderMyAdress()}
                    {this.renderSearchBar()}
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