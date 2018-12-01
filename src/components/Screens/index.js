import React from 'react'
import {connect} from 'react-redux'
import {
    View,
    Text, StyleSheet, ScrollView
} from 'react-native'
import Header from "../Header";
import ListCategories from "./Category";
import ListRestaurantsByNearMe from "./Restaurant";

class Home extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ flex: 1, backgroundColor: '#fff'}}>

                    <Header title={'Browser'}/>
                    <ListCategories/>
                    <ListRestaurantsByNearMe/>

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