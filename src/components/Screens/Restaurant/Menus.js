import React from 'react'
import {connect} from 'react-redux'
import {
    View,
    Text,
    ScrollView,
    TouchableWithoutFeedback,
    Image, FlatList,
    TouchableOpacity
} from 'react-native'
import {PRIMARY_COLOR, SIZE} from "../../../configs/Const";
import { addIcon, headerStyles } from "../../Header";
import {getMenusRes} from "../../../stores/lists/ListActions";
import {winSize} from "./NearMe";

type CategoryProps = {
    navigation: any;
    getMenusRes?: Function,
    menuOfResState?: any;
}
class Menus extends React.Component<CategoryProps> {
    static navigationOptions = {
        header: null
    };
    constructor(props) {
        super(props)
        console.log(this.props.screenProps)
    }
    componentDidMount(): void {
        this.props.getMenusRes(this.props.screenProps.state.params.id)
    }
    resItem = (item) => (
        <TouchableWithoutFeedback>
            <View style={{
                margin: 12,
                elevation: 3,
                borderRadius: SIZE["8"],
                backgroundColor: '#fff',
                overflow: 'hidden',
                flexDirection: 'row',
            }}>
                <Image style={{
                    width: winSize.width/3,
                    height: winSize.width/3
                }} source={{uri: item.image}}/>

                <View style={{
                    flexDirection: 'column',
                    margin: SIZE["16"],
                    flex: 1,
                }}>
                    <Text style={{
                        textAlign: 'left',
                        fontSize: 16,
                        color: PRIMARY_COLOR,
                        fontWeight: 'bold'
                    }}>{item.name}</Text>
                    <Text style={{
                        textAlign: 'left',
                        fontSize: 16,
                        color: '#333'
                    }}>{(item.price).toLocaleString('vn')}đ</Text>
                    <View style={[headerStyles.iconBtn, {
                        position: 'absolute',
                        bottom: SIZE["4"],
                        right: 0,
                    }]}>
                        <TouchableOpacity>
                            {addIcon}
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        </TouchableWithoutFeedback>
    );

    _keyExtractor = (item, index) => item.id + "";

    renderListMenus = () => {
        if (this.props.menuOfResState.menu){
            return (
                <FlatList
                    data={this.props.menuOfResState.menu}
                    renderItem={({item}) => this.resItem(item)}
                    keyExtractor={this._keyExtractor}/>
            )
        }
    };
    render() {
        return (
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{flex: 1}}>
                    <View style={{
                        alignItems: 'center',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        paddingHorizontal: SIZE["24"]
                    }}>
                        <Text style={{
                            lineHeight: 18,
                            textAlign: 'center',
                            fontSize: SIZE["16"],
                            paddingLeft: SIZE["16"],
                        }}>{this.props.screenProps.state.params.resName}</Text>
                    </View>
                    <View style={{padding: 12}}>
                        {this.renderListMenus()}
                    </View>
                </View>
            </ScrollView>
        )
    }
}
const mapStateToProps = state => ({
    menuOfResState: state.lists.menuOfResState
});

const mapDispatchToProps = {
    getMenusRes
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Menus);