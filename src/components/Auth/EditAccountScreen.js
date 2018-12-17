import React from 'react'
import {connect} from 'react-redux'
import {
    View,
    Text, TouchableOpacity, ScrollView,
    TextInput, StyleSheet
} from 'react-native'
import {PRIMARY_COLOR, SIZE} from "../../configs/Const";
import {cogIcon} from "../Header";

class EditAccountScreen extends React.Component<BaseComponentProps> {
    static navigationOptions = ({navigation}) => {
        return {
            title: 'Thông tin tài khoản người dùng',
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
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{flex: 1, backgroundColor: '#eee'}}>
                    <View style={editAccountStyles.input}>
                        <Text style={editAccountStyles.title}>Tên người dùng</Text>
                        <TextInput placeholder={'Tên người dùng'}/>
                    </View>
                    <View style={editAccountStyles.input}>
                        <Text style={editAccountStyles.title}>Số điện thoại</Text>
                        <TextInput placeholder={'Số điện thoại'}/>
                    </View>
                    <View style={editAccountStyles.input}>
                        <Text style={editAccountStyles.title}>Đường</Text>
                        <TextInput placeholder={'Đường'}/>
                    </View>
                    <View style={editAccountStyles.input}>
                        <Text style={editAccountStyles.title}>Phường</Text>
                        <TextInput placeholder={'Phường'}/>
                    </View>
                    <View style={editAccountStyles.input}>
                        <Text style={editAccountStyles.title}>Quận</Text>
                        <TextInput placeholder={'Quận'}/>
                    </View>
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
                        }}>Lưu lại thông tin</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }
}
export const editAccountStyles = StyleSheet.create({
    input: {
        flexDirection: 'column',
        paddingHorizontal: SIZE["16"],
        paddingVertical: SIZE["8"],
        backgroundColor: '#fff',
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
    },
    title: {
        color: '#000',
        paddingLeft: 2,
        paddingTop: SIZE["8"]
    }
})
const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditAccountScreen);