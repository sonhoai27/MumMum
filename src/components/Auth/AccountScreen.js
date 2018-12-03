import React from 'react'
import {connect} from 'react-redux'
import {
    View,
    Text, ScrollView, Image, TouchableOpacity,
} from 'react-native'
import Header, {headerStyles} from "../Header";
import {apiUserInfo} from "../../stores/auth/AuthActions";
import {winSize} from "../Screens/Restaurant/NearMe";
import {PRIMARY_COLOR, SIZE} from "../../configs/Const";

type AccountProps = {
    userInfoState: any;
    userState: any;
    apiUserInfo: Function;
}

class AccountScreen extends React.Component<AccountProps> {
    static navigationOptions = {
        header: null
    };

    componentDidMount(): void {
        this.props.apiUserInfo(this.props.userState.token)
    }

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{flex: 1}}>
                    <Header
                        isShowingGoBack={true}
                        bgTransparent={true}
                        title={'Tài khoản'}
                        navigation={this.props.navigation}/>
                    <View style={{position: 'relative', paddingBottom: SIZE["64"]}}>
                        <Image
                            style={{
                                borderRadius: SIZE["16"],
                                height: winSize.width / 2,
                                width: winSize.width - 32,
                                margin: 16
                            }}
                            source={{uri: 'https://static.dezeen.com/uploads/2018/07/food-design-luca-verweij-dezeen-2364-sq-411x411.jpg'}}/>
                        <View style={{
                            paddingHorizontal: SIZE["16"],
                            paddingVertical: SIZE["8"],
                            borderRadius: SIZE["8"],
                            backgroundColor: PRIMARY_COLOR,
                            position: 'absolute',
                            left: SIZE["32"],
                            right: SIZE["32"],
                            bottom: 0,
                            elevation: 2,
                            zIndex: 1000,
                        }}>
                            <Text style={{
                                fontSize: 18,
                                borderBottomColor: '#eee',
                                borderBottomWidth: 1,
                                paddingBottom: SIZE["8"],
                                color: '#fff',
                            }}>
                                {this.props.userInfoState.email}
                            </Text>
                            <Text style={{
                                fontSize: 14,
                                marginTop: SIZE["8"],
                                color: '#fff',
                            }}>
                                0986787665
                            </Text>
                            <Text style={{
                                fontSize: 12,
                                marginTop: SIZE["4"],
                                color: '#fff'
                            }}>
                                11 Nguyễn đình chiểu
                            </Text>
                        </View>
                    </View>
                    <View style={{
                        marginTop: SIZE["40"],
                        width: winSize.width-48,
                        paddingHorizontal: SIZE["24"],
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        marginBottom: SIZE["16"],
                    }}>
                        <View style={{
                            elevation: 2,
                            backgroundColor: '#fff',
                            width: winSize.width/2-32,
                            marginRight: 16,
                            borderRadius: SIZE["8"],
                            paddingHorizontal: SIZE["16"],
                            paddingVertical: SIZE["32"],
                            alignItems: 'center'
                        }}>
                            <TouchableOpacity>
                                <Text style={headerStyles.fontWeightBold}>Cập nhật thông tin</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{
                            elevation: 2,
                            backgroundColor: '#ffffff',
                            width: winSize.width/2-32,
                            borderRadius: SIZE["8"],
                            paddingHorizontal: SIZE["16"],
                            paddingVertical: SIZE["32"],
                            alignItems: 'center'
                        }}>
                            <TouchableOpacity>
                                <Text style={headerStyles.fontWeightBold}>Đổi mật khẩu</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{
                        alignItems: 'center',
                        marginTop: SIZE["32"],
                    }}>
                        <TouchableOpacity>
                            <Text style={
                                [headerStyles.fontWeightBold, {
                                    backgroundColor: PRIMARY_COLOR,
                                    textAlign: 'center',
                                    color: '#fff',
                                    width: winSize.width/2,
                                    padding: SIZE["16"],
                                    borderRadius: SIZE["16"],
                                }]
                            }>Đăng xuất</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        )
    }
}

const mapStateToProps = state => ({
    userInfoState: state.auth.userInfoState,
    userState: state.auth.userState,
});

const mapDispatchToProps = {
    apiUserInfo
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AccountScreen);