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
    ScrollView,
    Alert
} from 'react-native'
import {SIZE, PRIMARY_COLOR} from "../../configs/Const";
import {apiRegister} from "../../stores/auth/AuthActions";
import {rootStyles} from "../AppFoodScreen";

const winSize = Dimensions.get('window');

type RegisterState = {
    username: string;
    password: string;
}

class RegisterScreen extends React.Component<{}, RegisterState> {
    static navigationOptions = {
        header: null
    };
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

    handleRegister = () => {
        this.props.apiRegister(
            this.state.username,
            this.state.password
        )
        Alert.alert(
            'Warning',
            'Please check mail to active your account.',
            [
                {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            { cancelable: false }
        );
        this.props.navigation.navigate('Root')
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
        if (this.props.registerState !== prevProps.registerState) {
            if (this.props.registerState.id){
                Alert.alert(
                    'Warning',
                    'Please check mail to active your account.',
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                    { cancelable: false }
                );
                this.props.navigation.navigate('Root')
            }
        }
    }
    render() {
        return (
            <ScrollView
                style={[
                    rootStyles.bgWhite,
                    {
                        padding: SIZE["24"],
                        flex: 1
                    }
                ]}>

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
                            onChangeText={(e) => this.onChange('username', e)}
                            placeholder={'Email'} style={loginStyles.input}/>
                        <TextInput
                            secureTextEntry={true}
                            onChangeText={(e) => this.onChange('password', e)}
                            placeholder={'Password'} style={loginStyles.input}/>
                    </View>
                    <View style={{flex: 1}}>
                        <TouchableOpacity style={loginStyles.btnLogin} onPress={this.handleRegister}>
                            <Text style={loginStyles.loginTitle}>Đăng ký</Text>
                        </TouchableOpacity>
                        <View style={{
                            flex: 1,
                            flexDirection: 'column',
                            marginTop: SIZE["32"]
                        }}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                                <Text style={{color: '#333'}}>Đăng nhập.</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={{color: '#333',marginTop: SIZE["16"]}}>Quên mật khẩu?</Text>
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
    registerState: state.auth.registerState
});

const mapDispatchToProps = {
    apiRegister
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RegisterScreen);