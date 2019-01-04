import React from 'react'
import {connect} from 'react-redux'
import {
    View,
    Text, ScrollView, Image, TouchableOpacity,
} from 'react-native'
import Header, {cogIcon, constructIcon, editIcon, headerStyles, navigateIcon2} from "../../Header";
import {apiUserInfo} from "../../../stores/auth/AuthActions";
import {winSize} from "../Restaurant/NearMe";
import {PRIMARY_COLOR, SIZE} from "../../../configs/Const";
import AddressScreen from "../Order/AddressScreen";

type AccountProps = {
    userInfoState: any;
    userState: any;
    apiUserInfo: Function;
}
type AccountStates = {
    modalVisible: boolean,
    setModalVisible: Function,
}
class AccountScreen extends React.Component<AccountProps, AccountStates> {
    static navigationOptions = {
        title: 'Tài khoản',
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
        super(props)
        this.state = {
            modalVisible: false
        }
    }
    setModalVisible() {
        this.setState({
            modalVisible: !this.state.modalVisible
        });
    }
    componentDidMount(): void {
        this.props.apiUserInfo(this.props.userState.token)
    }

    render() {
        return (
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{backgroundColor: '#eee', flex: 1}}>
                    <View style={{
                        flexDirection: 'row',
                        padding: SIZE["16"],
                        backgroundColor: '#fff',
                        marginBottom: SIZE["16"]
                    }}>
                        <Image
                            style={{
                                borderRadius: SIZE["120"],
                                height: SIZE["64"],
                                width: SIZE["64"],
                                marginRight: SIZE["8"],
                            }}
                            source={{uri: 'https://static.dezeen.com/uploads/2018/07/food-design-luca-verweij-dezeen-2364-sq-411x411.jpg'}}/>
                        <View style={{
                           flexDirection: 'column',
                            flex: 3,
                        }}>
                            <Text style={{
                                fontSize: 14,
                                borderBottomColor: '#eee',
                                borderBottomWidth: 1,
                                paddingBottom: SIZE["8"]
                            }}>
                                Linh.Nguyen
                            </Text>
                            <Text style={{
                                fontSize: 13,
                                marginTop: SIZE["8"]
                            }}>
                                0986787665
                            </Text>
                            <Text style={{
                                fontSize: 12,
                                marginTop: SIZE["4"]
                            }}>
                                11 Nguyễn đình chiểu
                            </Text>
                        </View>
                        <TouchableOpacity
                            onPress={()=> {
                                this.props.navigation.navigate('UserInfo')
                            }}
                            style={{
                            marginLeft: SIZE["8"],
                            padding: SIZE["8"]
                        }}>
                            {editIcon}
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            this.setModalVisible();
                        }}
                        style={{
                            flex: 1,
                            flexDirection: 'row',
                            padding: SIZE["16"],
                            backgroundColor: '#fff',
                            marginBottom: SIZE["16"],
                            alignItems: 'center',
                        }}>
                        {navigateIcon2}
                        <Text style={{marginLeft: SIZE["8"]}}>Địa chỉ</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={()=> {
                            this.props.navigation.navigate('ChangePassword')
                        }}
                        style={{
                        flex: 1,
                        flexDirection: 'row',
                        padding: SIZE["16"],
                        backgroundColor: '#fff',
                        marginBottom: SIZE["16"],
                        alignItems: 'center',
                    }}>
                        {cogIcon}
                        <Text style={{marginLeft: SIZE["8"]}}>Đổi mật khẩu</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        flex: 1,
                        flexDirection: 'row',
                        padding: SIZE["16"],
                        backgroundColor: '#fff',
                        marginBottom: SIZE["16"],
                        alignItems: 'center',
                    }}>
                        {constructIcon}
                        <Text style={{marginLeft: SIZE["8"]}}>Cài đặt</Text>
                    </TouchableOpacity>
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        padding: SIZE["16"],
                        backgroundColor: '#fff',
                        marginBottom: SIZE["16"],
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <TouchableOpacity>
                            <Text style={{
                                backgroundColor: PRIMARY_COLOR,
                                color: '#fff',
                                padding: 8,
                                borderRadius: SIZE["8"]
                            }}>Đăng xuất</Text>
                        </TouchableOpacity>
                    </View>
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

const mapStateToProps = state => ({
    userInfoState: state.auth.userInfoState,
    userState: state.auth.userState,
});

const mapDispatchToProps = {
    apiUserInfo
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AccountScreen);