import React from 'react'
import {connect} from 'react-redux'
import {
    View,
    Text, ScrollView, Dimensions, FlatList, Image, TouchableWithoutFeedback
} from 'react-native'
import {PRIMARY_COLOR, SIZE} from "../../../configs/Const";
import {getResByCategories} from "../../../stores/lists/ListActions";
import {winSize} from "../Restaurant/NearMe";

type RestaurantByCatProps = {
    navigation: any;
    menuOfResCategoriesState: any;
    getResByCategories: Function;
}
type RestaurantByCatState = {}

class RestaurantByCatScreen extends React.Component<RestaurantByCatProps, RestaurantByCatState> {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Các nhà hàng thuộc '+navigation.getParam('title'),
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

    componentDidMount(): void {
        this.props.getResByCategories(this.props.navigation.state.params.item.id);
    }

    resItem = (item) => (
        <TouchableWithoutFeedback onPress={() => {
            this.props.navigation.navigate('Restaurant', {
                item: {
                    RESTAURANT: item,
                    ...item,
                },
                title: item.name
            });
        }}>
            <View style={{
                marginBottom: SIZE["16"],
                position: "relative"
            }}>
                <Image style={{
                    width: winSize.width - 32,
                    height: winSize.width * 0.7,
                    borderRadius: SIZE["8"],
                }} source={{uri: item.image}}/>

                <View style={{
                    position: 'absolute',
                    bottom: SIZE["16"],
                    left: SIZE["16"],
                    right: SIZE["16"],
                    backgroundColor: PRIMARY_COLOR,
                    padding: SIZE["16"],
                    borderRadius: SIZE["8"],
                }}>
                    <Text style={{
                        textAlign: 'left',
                        fontSize: 16,
                        color: '#fff',
                        fontWeight: 'bold'
                    }}>{item.name}</Text>
                </View>

            </View>
        </TouchableWithoutFeedback>
    )
    _keyExtractor = (item, index) => item.id + "";

    renderListRess = () => {
        if (this.props.menuOfResCategoriesState.length > 0) {
            return (
                <FlatList
                    extraData={this.props.menuOfResCategoriesState}
                    data={this.props.menuOfResCategoriesState}
                    renderItem={({item}) => this.resItem(item)}
                    keyExtractor={this._keyExtractor}/>
            )
        }
    };
    render() {
        return (
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{flex: 1, padding: SIZE["16"]}}>
                    {this.renderListRess()}
                </View>
            </ScrollView>
        )
    }
}

const mapStateToProps = state => ({
    menuOfResCategoriesState: state.lists.menuOfResCategoriesState,
});

const mapDispatchToProps = {
    getResByCategories
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RestaurantByCatScreen);