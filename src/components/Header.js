import React from 'react'
import {connect} from 'react-redux'
import {
    View,
    Text, StyleSheet, TouchableOpacity, TextInput, sequence
} from 'react-native'

import {PRIMARY_COLOR, SIZE} from "../configs/Const";

import Icon from 'react-native-vector-icons/Ionicons';
import IconFeather from 'react-native-vector-icons/Feather';
import IconAnt from 'react-native-vector-icons/AntDesign';
import {setStatusOrderModal} from "../stores/order/OrderActions";

export const searchIcon = (<Icon name="ios-search" size={20} color="#999"/>)
export const albumsIcon = (<Icon name="ios-albums" size={20} color="#000"/>)
export const listIcon = (<Icon name="ios-list" size={20} color="#000"/>)
export const arrowBackIcon = (<Icon name="md-arrow-back" size={24} color="#fff"/>);
export const arrowDownIcon = (<Icon name="ios-arrow-down" size={28} color="#000"/>);
export const notificationsIcon = (<Icon name="ios-notifications" size={20} color="#000"/>);
export const addIcon = (<Icon name="ios-add" size={24} color={PRIMARY_COLOR}/>)
export const editIcon = (<IconAnt name="edit" size={20} color={PRIMARY_COLOR}/>)
export const addIcon2 = (<Icon name="ios-add-circle-outline" size={32} color="#fff"/>)
export const checkmarkIcon = (<Icon name="ios-checkmark-circle-outline" size={32} color="#fff"/>)
export const checkmarkSuccessIcon = (size: number) => (<Icon name="ios-checkmark-circle-outline" size={size} color={PRIMARY_COLOR}/>)
export const removeIcon = (<Icon name="ios-remove-circle-outline" size={32} color="#fff"/>)
export const removeIcon2 = (<Icon name="ios-remove" size={32} color={PRIMARY_COLOR}/>)
export const navigateIcon = (<Icon name="ios-navigate" size={20} color={PRIMARY_COLOR}/>);
export const basketIcon = (<IconFeather name="shopping-bag" size={SIZE["24"]} color="#fff"/>);
export const accountIcon = (<Icon name="ios-person" size={SIZE["24"]} color="#000"/>)
export const constructIcon = (<Icon name="ios-construct" size={SIZE["24"]} color="#000"/>)
export const cogIcon = (<Icon name="ios-cog" size={SIZE["24"]} color="#000"/>)

type TProps = {
    title: string;
    navigation?: any;
    isShowingGoBack?: false | true;
}

class Header extends React.Component<TProps> {
    constructor(props) {
        super(props);
        console.log(this.props)
    }

    renderSearchBar = () => {
        return (
            <View style={headerStyles.searchBar}>
                {searchIcon}
                <TextInput style={{
                    width: '100%',
                    height: 40,
                    marginLeft: 8,
                    marginRight: 8,
                    paddingHorizontal: SIZE["8"],
                    paddingVertical: 10,
                }} placeholder={'Bạn đang tìm gì?'}/>
            </View>
        )
    }

    render() {
        return (
            <View style={{
                backgroundColor: '#fff',
                height: 120,
            }}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: PRIMARY_COLOR,
                    paddingHorizontal: 24,
                    paddingBottom: 8,
                }}>
                    {this.props.isShowingGoBack ?
                        <TouchableOpacity onPress={() => {
                            this.props.navigation.goBack()
                        }}>
                            <View style={headerStyles.btnGoBack}>
                                {arrowBackIcon}
                            </View>
                        </TouchableOpacity>
                        : <View/>}
                    {
                        this.renderSearchBar()
                    }
                    <View style={[headerStyles.iconBtn, {marginLeft: SIZE["16"]}]}>
                        <TouchableOpacity onPress={() => {
                            this.props.navigation.navigate('Account');
                        }}>
                            {/*<Text style={headerStyles.fontWeightBold}>{accountIcon}</Text>*/}
                            {accountIcon}
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{
                    flex: 1,
                    alignItems: 'center',
                    flexDirection: 'row',
                    paddingHorizontal: 24,
                }}>

                    <Text style={headerStyles.headerTitle}>{this.props.title}</Text>
                </View>
            </View>
        )
    }
}

export const headerStyles = StyleSheet.create({
    headerTitle: {
        fontSize: SIZE["24"],
        color: '#000',
        fontWeight: 'bold',
        flex: 2,
        lineHeight: 36
    },
    addressTitle: {
        marginLeft: SIZE["24"],
        marginRight: SIZE["24"],
        marginBottom: SIZE["8"],
        marginTop: SIZE["16"]
    },
    addressTitle__adress: {
        fontSize: 14,
        color: PRIMARY_COLOR,
        marginLeft: SIZE["8"]
    },
    iconBtn: {
        width: 32,
        height: 32,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
        backgroundColor: '#f5f5f5',
    },
    fontWeightBold: {
        fontWeight: 'bold'
    },
    searchBar: {
        marginBottom: SIZE["8"],
        marginTop: SIZE["8"],
        backgroundColor: '#f5f5f5',
        paddingRight: SIZE["16"],
        paddingLeft: SIZE["16"],
        borderRadius: SIZE["16"],
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    btnGoBack: {
        padding: SIZE["4"],
        marginRight: SIZE["16"]
    }
});

const mapStateToProps = state => ({
});

const mapDispatchToProps = {
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);