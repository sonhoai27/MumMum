import React from 'react'
import {connect} from 'react-redux'
import {
    View,
    Text,
    Image,
    Dimensions,
    StyleSheet,
    TouchableOpacity, TextInput,
    ScrollView,
    Modal, Alert
} from 'react-native'
import {SIZE, PRIMARY_COLOR} from "../../configs/Const";
import {apiForgetPassword, apiLogin, apiReSendToke, setStatusLogin} from "../../stores/auth/AuthActions";
import {_storeData} from "../../configs/LocalStorage";
import {headerStyles} from "../Header";

const winSize = Dimensions.get('window');

type LoginState = {
    username: string;
    password: string;
    modalVisible: boolean;
    modalVisibleFP: boolean;
    verifyEmail: string;
    forgetPasswordEmail: string;
}
type LoginProps = {
    verifyState: any;
    forgetPasswordState: any;
    apiReSendToke: Function;
    apiForgetPassword: Function;
}
class LoginScreen extends React.Component<LoginProps, LoginState> {
    static navigationOptions = {
        header: null
    };
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            verifyEmail: '',
            forgetPasswordEmail: '',
            modalVisible: false,
            modalVisibleFP: false,
        }
    }

    onChange = (name, value) => {
        this.setState({
            [name]: value
        })
    }

    handleLogin = ()=> {
        this.props.apiLogin(
            this.state.username,
            this.state.password
        )
    }
    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
        if (this.props.loginState !== prevProps.loginState){
            console.log(this.props.loginState);
            _storeData("@LOGIN", this.props.loginState, (result)=> {
                if (result.message === 200){
                    this.props.setStatusLogin(true)
                }
            })
        }
        if (this.props.verifyState !== prevProps.verifyState){
            Alert.alert(
                'Thành công.',
                'Vui lòng kiểm tra mail và kích hoạt tài khoản.',
                [
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                { cancelable: true }
            );
            this.setState({
                modalVisible: false
            });
        }
        if (this.props.forgetPasswordState !== prevProps.forgetPasswordState){
            Alert.alert(
                'Thành công.',
                'Vui lòng kiểm tra mail của bạn.',
                [
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                { cancelable: true }
            );
            this.setState({
                modalVisibleFP: false
            });
        }
    }

    renderModalConfimMail = () => (
        <Modal
            hardwareAccelerated={true}
            animationType="fade"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {
                this.setState({
                    modalVisible: !this.state.modalVisible
                })
            }}>
            <View style={{
                elevation: 8,
                backgroundColor: "#fafafa",
                paddingVertical: SIZE["16"],
                paddingHorizontal: SIZE["32"],
                borderRadius: SIZE["8"],
                position: 'absolute',
                top: '10%',
                left: '10%',
                right: '10%'
            }}>
                <Text style={{
                    textAlign:'center',
                    fontWeight: 'bold',
                    fontSize: SIZE["16"]
                }}>Kích hoạt tài khoản.</Text>

                <View style={{
                    marginTop: SIZE["24"],
                    backgroundColor: '#eee',
                    paddingHorizontal: SIZE["8"],
                    height: SIZE["40"],
                    position: 'relative',
                }}>
                    <TextInput
                        onChangeText ={(e) => {
                            this.setState({
                                verifyEmail: e
                            })
                        }}
                        placeholder={'Email của bạn'}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            textAlign:'center',
                        }}/>
                </View>
                <TouchableOpacity onPress={()=> {
                    if (this.state.verifyEmail !== ""){
                        this.props.apiReSendToke(this.state.verifyEmail)
                    }else {
                        Alert.alert(
                            'Cảnh báo',
                            'Email rỗng.',
                            [
                                {text: 'OK', onPress: () => console.log('OK Pressed')},
                            ],
                            { cancelable: true }
                        );
                    }
                }}>
                    <Text style={{
                        backgroundColor: PRIMARY_COLOR,
                        color: '#fff',
                        padding: 10,
                        textAlign:'center'
                    }}>Kích hoạt</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    )

    renderModalForgetPassword = () => {
        return (
            <Modal
                hardwareAccelerated={true}
                animationType="fade"
                transparent={true}
                visible={this.state.modalVisibleFP}
                onRequestClose={() => {
                    this.setState({
                        modalVisibleFP: !this.state.modalVisibleFP
                    })
                }}>
                <View style={{
                    elevation: 8,
                    backgroundColor: "#fafafa",
                    paddingVertical: SIZE["16"],
                    paddingHorizontal: SIZE["32"],
                    borderRadius: SIZE["8"],
                    position: 'absolute',
                    top: '10%',
                    left: '10%',
                    right: '10%'
                }}>
                    <Text style={{
                        textAlign:'center',
                        fontWeight: 'bold',
                        fontSize: SIZE["16"]
                    }}>Quên mật khẩu</Text>

                    <View style={{
                        marginTop: SIZE["24"],
                        backgroundColor: '#eee',
                        paddingHorizontal: SIZE["8"],
                        height: SIZE["40"],
                        position: 'relative',
                    }}>
                        <TextInput
                            onChangeText ={(e) => {
                                this.setState({
                                    forgetPasswordEmail: e
                                })
                            }}
                            placeholder={'Email của bạn'}
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                textAlign:'center',
                            }}/>
                    </View>
                    <TouchableOpacity onPress={()=> {
                        if (this.state.forgetPasswordEmail !== ""){
                            this.props.apiForgetPassword(this.state.forgetPasswordEmail)
                        }else {
                            Alert.alert(
                                'Cảnh báo',
                                'Email rỗng.',
                                [
                                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                                ],
                                { cancelable: true }
                            );
                        }
                    }}>
                        <Text style={{
                            backgroundColor: PRIMARY_COLOR,
                            color: '#fff',
                            padding: 10,
                            textAlign:'center'
                        }}>Chập nhận</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        )
    };
    render() {
        return (
            <View style={{flex: 1}}>
                <ScrollView
                    style={{
                        padding: SIZE["24"],
                        flex: 1
                    }}>
                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                        marginTop: SIZE["32"]
                    }}>
                        <Image
                            style={{
                                width: SIZE["120"],
                                height: SIZE["120"],
                                borderRadius: SIZE["120"]
                            }}
                            source={{uri: "https://cdn.dribbble.com/users/1655041/screenshots/3633281/foodbowl_dribbble_loop.gif"}}/>
                    </View>
                    <View style={{marginTop: SIZE["64"], flex: 3}}>

                        <TextInput
                            textContentType={'emailAddress'}
                            onChangeText={(e)=>this.onChange('username', e)}
                            placeholder={'Email'} style={loginStyles.input}/>
                        <TextInput
                            secureTextEntry={true}
                            onChangeText={(e)=>this.onChange('password', e)}
                            placeholder={'Password'} style={loginStyles.input}/>
                    </View>
                    <View style={{flex: 1}}>
                        <TouchableOpacity style={loginStyles.btnLogin} onPress={this.handleLogin}>
                            <Text style={loginStyles.loginTitle}>Đăng nhập</Text>
                        </TouchableOpacity>
                        <View style={{
                            flex: 1,
                            flexDirection: 'column',
                            marginTop: SIZE["32"]
                        }}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}>
                                <Text style={{color: '#333'}}>Đăng ký tài khoản mới.</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=> {
                                this.setState({
                                    modalVisibleFP: !this.state.modalVisibleFP
                                })
                            }}>
                                <Text style={{color: '#333',marginTop: SIZE["16"]}}>Quên mật khẩu?</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=> {
                                this.setState({
                                    modalVisible: !this.state.modalVisible
                                })
                            }}>
                                <Text style={{color: '#333',marginTop: SIZE["16"]}}>Kích hoạt tài khoản.</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
                {this.renderModalConfimMail()}
                {this.renderModalForgetPassword()}
            </View>
        )
    }
}

const loginStyles = StyleSheet.create({
    btnLogin: {
        backgroundColor: PRIMARY_COLOR,
        padding: 12
    },
    loginTitle: {
        color: 'white',
        textAlign: 'center'
    },
    textAlignCenter: {
        textAlign: 'center'
    },
    input: {
        backgroundColor: '#eee',
        paddingLeft: 16,
        paddingRight: 16,
        textAlign: 'center'
    }
});

const mapStateToProps = state => ({
    loginState: state.auth.loginState,
    isLoginState: state.auth.isLoginState,
    verifyState: state.auth.verifyState,
    forgetPasswordState: state.auth.forgetPasswordState
});

const mapDispatchToProps = {
    apiLogin,
    setStatusLogin,
    apiReSendToke,
    apiForgetPassword
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginScreen);