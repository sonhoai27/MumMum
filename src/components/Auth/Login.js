import React from 'react'
import {connect} from 'react-redux'
import {
    View,
    Text,
    Image,
    Dimensions,
    StyleSheet,
    TouchableOpacity, TextInput,
    KeyboardAvoidingView,
    ScrollView
} from 'react-native'
import {SIZE, PRIMARY_COLOR} from "../../configs/Const";
import {apiLogin, setStatusLogin} from "../../stores/auth/AuthActions";
import {_storeData} from "../../configs/LocalStorage";

const winSize = Dimensions.get('window');

type LoginState = {
    username: string;
    password: string;
}
class Login extends React.Component<{}, LoginState> {

    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: ''
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
            // _storeData("@LOGIN", this.props.loginState, (result)=> {
            //     console.log(result)
            // })
        }
    }
    render() {
        return (
            <ScrollView
                style={{
                    padding: SIZE["24"],
                    flex: 1
                }}>
                <KeyboardAvoidingView
                    style={{
                        flex: 1
                    }}
                    behavior="padding">
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
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: SIZE["16"]
                        }}>
                            <TouchableOpacity>
                                <Text style={{color: '#333'}}>Đăng ký tài khoản mới</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={{color: '#333'}}>Quên mật khẩu?</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
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
    isLoginState: state.auth.isLoginState
});

const mapDispatchToProps = {
    apiLogin,
    setStatusLogin
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);