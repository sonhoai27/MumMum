import React from 'react'
import {connect} from 'react-redux'
import {
    View,
    Text, StyleSheet, ScrollView, TouchableOpacity, TextInput
} from 'react-native'
import {headerStyles, navigateIcon} from "../Header";
import {PRIMARY_COLOR, SIZE} from "../../configs/Const";

class SearchSreen extends React.Component {
    static navigationOptions = {
        title: 'Tìm kiếm',
        headerStyle: {
            backgroundColor: PRIMARY_COLOR,
            elevation: 0,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
            textAlign: 'center',
            flex: 1
        },
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
    render() {
        return (
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ flex: 1, backgroundColor: '#fff', padding: SIZE["16"]}}>
                    <TextInput style={searchScreenstyles.input} placeholder={'Bạn muốn tìm gì?'}/>
                </View>
            </ScrollView>
        )
    }
}
const searchScreenstyles = StyleSheet.create({
    input: {
        backgroundColor: '#eee',
        borderRadius: SIZE["8"],
        paddingHorizontal: SIZE["16"],
    }
})
const mapStateToProps = state => ({
});

const mapDispatchToProps = {
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchSreen);
