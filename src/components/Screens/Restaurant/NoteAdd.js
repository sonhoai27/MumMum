import React from 'react';
import {
    View,TextInput,
    Text, Modal,
    StyleSheet,TouchableOpacity
} from 'react-native';
import {PRIMARY_COLOR, SIZE} from "../../../configs/Const";
import {winSize} from "./NearMe";
import {arrowDownIcon} from "../../Header";

type NoteAddProps = {
    modalVisible: boolean;
    setModalVisible: Function;
}
class NoteAdd extends React.Component<NoteAddProps> {
    constructor(props){
        super(props)
    }
    render(){
        return (
            <View style={{flex: 1}}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.props.modalVisible}
                    onRequestClose={() => {
                        this.props.setModalVisible();
                    }}>
                    <View style={noteAddStyles.container}>
                        <View style={noteAddStyles.header}>
                            <TouchableOpacity
                                onPress={() => {
                                    this.props.setModalVisible();
                                }}
                                style={{
                                position: 'absolute',
                                left: 10,
                                top: 0
                            }}>
                                {arrowDownIcon}
                            </TouchableOpacity>
                            <Text style={noteAddStyles.headerTitle}>
                                Thêm ghi chú
                            </Text>
                        </View>
                        <View style={noteAddStyles.textAreaContainer} >
                            <TextInput
                                style={noteAddStyles.textArea}
                                placeholder="Type something"
                                multiline={true}
                            />
                        </View>
                        <TouchableOpacity>
                            <Text style={{
                                marginTop: SIZE["16"],
                                textAlign: 'center',
                                backgroundColor: PRIMARY_COLOR,
                                color: '#fff',
                                fontSize: SIZE["16"],
                                paddingVertical: 12,
                                borderRadius: SIZE["8"]
                            }}>Chấp nhận</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={noteAddStyles.bg2}/>
                </Modal>
            </View>
        )
    }
}

export const noteAddStyles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        flex: 1,
        marginTop: SIZE["32"],
        bottom: 0,
        padding: SIZE["16"],
        elevation: 8,
        borderTopRightRadius: SIZE["24"],
        borderTopLeftRadius: SIZE["24"],
        height: winSize.height*0.45,
        zIndex: 100
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerTitle: {
        fontWeight: 'bold',
        color: '#000',
        fontSize: SIZE["16"]
    },
    bg2: {
        backgroundColor: '#eee',
        position: 'absolute',
        left: 12,
        right: 12,
        flex: 1,
        marginTop: SIZE["32"],
        bottom: 0,
        padding: SIZE["16"],
        elevation: 8,
        borderTopRightRadius: SIZE["16"],
        borderTopLeftRadius: SIZE["16"],
        height: winSize.height*0.47,
        zIndex: 90
    },
    textAreaContainer: {
        borderColor: '#eee',
        borderWidth: 1,
        padding: SIZE["8"],
        marginTop: SIZE["16"],
        alignItems: 'flex-start',
        borderRadius: SIZE["8"],
        height: 150
    },
    textArea: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0
    }
})

export default NoteAdd;