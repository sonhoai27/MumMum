import React from 'react'
import {connect} from 'react-redux'
import {
    View,
    Text, TextInput, StyleSheet, TouchableOpacity
} from 'react-native'
import {PRIMARY_COLOR, SIZE} from "../../configs/Const";
import {editAccountStyles} from "./EditAccountScreen";

class ChangePasswordScreen extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: 'Đổi mật khẩu',
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
    };
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#eee'}}>
                <View style={editAccountStyles.input}>
                    <Text style={editAccountStyles.title}>Mật khẩu cũ</Text>
                    <TextInput placeholder={'Mật khẩu cũ'}/>
                </View>
                <View style={editAccountStyles.input}>
                    <Text style={editAccountStyles.title}>Mật khẩu mới</Text>
                    <TextInput placeholder={'Mật khẩu mới'}/>
                    <Text style={editAccountStyles.title}>Nhập lại mật khẩu mới</Text>
                    <TextInput placeholder={'Nhập lại'}/>
                </View>
                <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: SIZE["32"],
                    marginBottom: SIZE["32"]
                }}>
                    <TouchableOpacity>
                        <Text style={{
                            backgroundColor: PRIMARY_COLOR,
                            color: '#fff',
                            padding: 8,
                            borderRadius: SIZE["8"]
                        }}>Lưu lại</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = {
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChangePasswordScreen);