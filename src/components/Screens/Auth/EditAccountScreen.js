import React from 'react'
import {connect} from 'react-redux'
import {
    View,
    Text, TouchableOpacity, ScrollView,
    TextInput, StyleSheet
} from 'react-native'
import {PRIMARY_COLOR, SIZE} from "../../../configs/Const";
import {apiUserInfo, updateInfo} from "../../../stores/auth/AuthActions";

type EditAccountScreenStates = {
    userName: string,
    street: string,
    phone: number,
}
type EditAccountScreenProps = {
    navigation?: any;
    apiUserInfo: Function;
    updateInfo: Function;
    userInfoState: any;
    userState: any;
    updateInfoState: any;
    myAddressState: any;
}

class EditAccountScreen extends React.Component<EditAccountScreenProps, EditAccountScreenStates> {
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
        super(props);
        this.state = {
            street: '',
            phone: 0,
            userName: ''

        }
    }
    componentDidMount(): void {
        this.props.apiUserInfo(this.props.userState.token);
    }
    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
        if(prevProps.userInfoState !== this.props.userInfoState){
            this.setState({
                street: this.props.userInfoState.address.street,
                phone: this.props.userInfoState.phone,
                userName: this.props.userInfoState.userName
            })
        }
    }

    onChange = (name, e) => {
        this.setState({
            [name]: e,
        })
    };
    onSave = () => {
        this.props.updateInfo({
            ...this.state,
            idDistrict: this.props.myAddressState[0].split('|')[1],
            idWard: this.props.myAddressState[1].split('|')[1],
        }, this.props.userState.token);
    };

    render() {
        return (
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{flex: 1, backgroundColor: '#eee'}}>
                    <View style={editAccountStyles.input}>
                        <Text style={editAccountStyles.title}>Tên người dùng</Text>
                        <TextInput
                            defaultValue={this.props.userInfoState.userName}
                            onChangeText={(e)=>this.onChange('userName', e)}
                            placeholder={'Tên người dùng'}/>
                    </View>
                    <View style={editAccountStyles.input}>
                        <Text style={editAccountStyles.title}>Số điện thoại</Text>
                        <TextInput
                            defaultValue={this.props.userInfoState.phone}
                            keyboardType={'phone-pad'}
                            onChangeText={(e)=>this.onChange('phone', e)}
                            placeholder={'Số điện thoại'}/>
                    </View>
                    <View style={editAccountStyles.input}>
                        <Text style={editAccountStyles.title}>Đường</Text>
                        <TextInput
                            defaultValue={this.props.userInfoState.address.street}
                            onChangeText={(e)=>this.onChange('street', e)}
                            placeholder={'Đường'}/>
                    </View>
                </View>
                <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: SIZE["32"],
                    marginBottom: SIZE["32"]
                }}>
                    <TouchableOpacity onPress={this.onSave}>
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
const mapStateToProps = state => ({
    userInfoState: state.auth.userInfoState,
    userState: state.auth.userState,
    myAddressState: state.address.myAddressState,
    updateInfoState: state.auth.updateInfoState,
});

const mapDispatchToProps = {
    apiUserInfo,
    updateInfo
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditAccountScreen);