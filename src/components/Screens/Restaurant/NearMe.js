import React from 'react'
import {connect} from 'react-redux'
import {
    View,
    Text,
    FlatList,
    Image,
    TouchableWithoutFeedback, StyleSheet,
    Dimensions
} from 'react-native'

import {apiGetRestaurantsByNearMe} from "../../../stores/lists/ListActions";
import {PRIMARY_COLOR, SIZE} from "../../../configs/Const";
import {albumsIcon, headerStyles} from "../../Header";
import {listCateStyles} from "../Category";

export const winSize = Dimensions.get('window');

type TProps = {
    restaurantsNearMeState?: any;
    myGeolocationState?: any;
    apiGetRestaurantsByNearMe?: Function;
}

class ListRestaurantsByNearMe extends React.Component<TProps> {
    constructor(props) {
        super(props)
    }

    componentDidMount(): void {
        this.props.apiGetRestaurantsByNearMe(
            this.props.myGeolocationState.latitude,
            this.props.myGeolocationState.longitude
        )
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
    }
    resItem = (item) => (
        <TouchableWithoutFeedback onPress={() => {
            this.props.navigation.navigate('Restaurant', {
                item: item,
                title: item.RESTAURANT.name
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
                }} source={{uri: item.RESTAURANT.image}}/>

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
                    }}>{item.RESTAURANT.name}</Text>
                    <Text style={{
                        textAlign: 'left',
                        fontSize: 14,
                        color: '#fff',
                        marginTop: 4
                    }}>{item.street}</Text>
                </View>

            </View>
        </TouchableWithoutFeedback>
    );

    _keyExtractor = (item, index) => item.id + "";

    renderListRes = () => {
        if (this.props.restaurantsNearMeState.length > 0) {
            return (
                <FlatList
                    data={this.props.restaurantsNearMeState}
                    renderItem={({item}) => this.resItem(item)}
                    keyExtractor={this._keyExtractor}/>
            )
        }
    };

    render() {
        return (
            <View style={{
                marginTop: SIZE["32"],
            }}>


                <View style={restaurantStyles.header}>
                    <Text style={[restaurantStyles.listViewTitle, headerStyles.fontWeightBold]}>
                        Quanh tôi
                    </Text>
                </View>
                <View style={{
                    marginRight: SIZE["16"],
                    marginLeft: SIZE["16"]
                }}>
                    {this.renderListRes()}
                </View>
            </View>
        )
    }
}

export const restaurantStyles = StyleSheet.create({
    listViewTitle: {
        fontSize: SIZE["16"],
        color: '#000',
        marginLeft: SIZE["16"],
        marginRight: SIZE["16"],
        marginBottom: SIZE["8"],
        borderBottomColor: '#eee'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
});

const mapStateToProps = state => ({
    restaurantsNearMeState: state.lists.restaurantsNearMeState,
    myGeolocationState: state.lists.myGeolocationState
});

const mapDispatchToProps = {
    apiGetRestaurantsByNearMe
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ListRestaurantsByNearMe);