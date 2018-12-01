import React from 'react'
import {connect} from 'react-redux'
import {
    View,
    Text, StyleSheet, TouchableOpacity, TextInput
} from 'react-native'

import {PRIMARY_COLOR, SIZE} from "../configs/Const";

import Icon from 'react-native-vector-icons/Ionicons';
import IconFeather from 'react-native-vector-icons/Feather';

export const searchIcon = (<Icon name="ios-search" size={20} color="#ACACAC" />)
export const navigateIcon = (<Icon name="ios-navigate" size={20} color={PRIMARY_COLOR} />)
export const basketIcon = (<IconFeather name="shopping-bag" size={SIZE["24"]} color="#000" />)
export const accountIcon = (<Icon name="ios-person" size={SIZE["24"]} color="#000" />)

type TProps = {
    title: string;
}

class Header extends React.Component<TProps> {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View>
                <View style={{
                    backgroundColor: '#fff',
                    paddingTop: 32,
                    paddingLeft: 24,
                    paddingRight: 24,
                    paddingBottom: 40
                }}>


                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                        flexDirection: 'row'
                    }}>

                        <Text style={headerStyles.headerTitle}>{this.props.title}</Text>

                        <View style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'flex-end',

                        }}>

                            <View style={[headerStyles.iconBtn, {marginRight: 16}]}>
                                <TouchableOpacity>
                                    {basketIcon}
                                </TouchableOpacity>
                            </View>

                            <View style={headerStyles.iconBtn}>
                                <TouchableOpacity>
                                    {/*<Text style={headerStyles.fontWeightBold}>{accountIcon}</Text>*/}
                                    {accountIcon}
                                </TouchableOpacity>
                            </View>

                        </View>

                    </View>
                </View>

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

                <View style={headerStyles.searchBar}>
                    {searchIcon}
                    <TextInput style={{marginLeft: 8}} placeholder="What are you looking for?"/>
                </View>
            </View>
        )
    }
}

export const headerStyles = StyleSheet.create({
    headerTitle: {
        fontSize: SIZE["32"],
        color: '#000',
        fontWeight: 'bold',
        flex: 2,
        lineHeight: 32
    },
    addressTitle: {
        marginLeft: SIZE["24"],
        marginRight: SIZE["24"],
        marginBottom: SIZE["16"]
    },
    addressTitle__adress: {
        fontSize: 14,
        color: PRIMARY_COLOR,
        marginLeft: SIZE["8"]
    },
    iconBtn: {
        backgroundColor: '#f5f5f5',
        width: 40,
        height: 40,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2
    },
    fontWeightBold: {
        fontWeight: 'bold'
    },
    searchBar: {
        backgroundColor: '#f5f5f5',
        marginLeft: SIZE["24"],
        marginRight: SIZE["24"],
        paddingRight: SIZE["16"],
        paddingLeft: SIZE["16"],
        borderRadius: SIZE["16"],
        flexDirection: 'row',
        alignItems:'center'
    }
});

const mapStateToProps = state => ({
});

const mapDispatchToProps = {
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);