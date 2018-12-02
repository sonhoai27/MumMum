import React from 'react'
import {connect} from 'react-redux'
import {
    View,
    Text, ScrollView,Dimensions
} from 'react-native'
import Header from "../../Header";
import Menus from "./Menus";
import Comments from "./Comments";
import {createBottomTabNavigator,createAppContainer} from "react-navigation";
import {winSize} from "./NearMe";

type RestaurantProps = {
    navigation: any;
}
type RestaurantState= {
}

const TabNavigator = createBottomTabNavigator({
    Menu: Menus,
    Comment: Comments,
});
const AppContainer = createAppContainer(TabNavigator);
class Restaurant extends React.Component<RestaurantProps, RestaurantState> {
    static navigationOptions = {
        header: null
    };
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <View style={{flex: 1}}>
                <Header
                    bgTransparent={true}
                    title={'Nhà hàng'}
                    navigation={this.props.navigation}/>
                <View style={{flex: 1}}>
                    <AppContainer screenProps={this.props.navigation}/>
                </View>
            </View>
        )
    }
}
const mapStateToProps = state => ({
});

const mapDispatchToProps = {
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Restaurant);