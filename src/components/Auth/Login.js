import React from 'react'
import {connect} from 'react-redux'
import {
    View,
    Text,
    Image,
    Dimensions,
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import {SIZE, PRIMARY_COLOR} from "../../configs/Const";
const winSize = Dimensions.get('window');

class Login extends React.Component {

    constructor(props) {
        super(props)
    }

    componentDidMount(): void {

    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
    }
    render() {
        return (
            <View style={{flex: 1, flexDirection: 'column', padding: SIZE["24"]}}>

                <Text style={styles.appName}>Mum Mum</Text>

                <Image
                    style={{width:winSize.width-SIZE["24"]*2, height: winSize.height/2, flex: 2}}
                    source={{uri:"https://cdn.dribbble.com/users/1655041/screenshots/3633281/foodbowl_dribbble_loop.gif"}}/>

                <View style={{flex: 1, marginTop: SIZE["16"]}}>
                    <Text style={styles.textAlignCenter}>Bạn cảm thấy đói bụng?</Text>
                    <Text style={styles.textAlignCenter}>Chúng tôi sẽ mang thức ăn đến ngay cho bạn.</Text>
                </View>

                <View style={{flex: 1}}>
                    <TouchableOpacity style={styles.btnLogin}>
                        <Text style={styles.loginTitle}>Đăng nhập</Text>
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

            </View>
        )
    }
}

const styles = StyleSheet.create({
    appName: {
        fontSize: SIZE["32"],
        color: PRIMARY_COLOR,
        textAlign: 'center',
        flex: 1
    },
    btnLogin: {
        backgroundColor: PRIMARY_COLOR,
        padding: 12,
        borderRadius: SIZE["4"]
    },
    loginTitle: {
        color: 'white',
        textAlign: 'center'
    },
    textAlignCenter: {
        textAlign: 'center'
    }
});

const mapStateToProps = state => ({
});

const mapDispatchToProps = {
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);