import React from 'react'
import {connect} from 'react-redux'
import {
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity, StyleSheet
} from 'react-native'
import {apiGetCategories} from "../../../stores/lists/Actions";
import {SIZE} from "../../../configs/Const";
import {headerStyles} from "../../Header";
import {getGeolocation} from "../../../configs/Geolocation";

type TProps = {
    categoriesState?: any;
    apiGetCategories?: Function;
}
class ListRestaurantsByNearMe extends React.Component<TProps> {

    constructor(props) {
        super(props)
        getGeolocation(result => {
            console.log(result)
        })

    }

    componentDidMount(): void {

        this.props.apiGetCategories()
    }

    resItem = (item)=> (
        <View style={{
            marginBottom: SIZE["16"]
        }}>
            <TouchableOpacity>
                <Image style={{
                    width: SIZE["64"],
                    height: SIZE["64"],
                    borderRadius: SIZE["64"]
                }} source={{uri: item.image}}/>
                <Text style={{
                    textAlign: 'center',
                    fontSize: 12
                }}>{item.name}</Text>
            </TouchableOpacity>
        </View>
    )
    _keyExtractor = (item, index) => item.id+"";

    renderListRes = () => {
        if (this.props.categoriesState.length > 0){
            return (
                <FlatList
                    data={this.props.categoriesState}
                    renderItem={({item}) => this.resItem(item)}
                    keyExtractor={this._keyExtractor}/>
            )
        }
        return <Text>NULL</Text>
    }
    render() {
        return (
            <View style={{
                marginTop: SIZE["32"],
            }}>

                <Text style={[restaurantStyles.listViewTitle, headerStyles.fontWeightBold]}>
                    NEAR ME
                </Text>
                <View style={{
                    marginRight: SIZE["24"],
                    marginLeft: SIZE["24"]
                }}>
                    {this.renderListRes()}
                </View>
            </View>
        )
    }
}

const restaurantStyles = StyleSheet.create({
    listViewTitle: {
        fontSize: SIZE["16"],
        color: '#000',
        marginLeft: SIZE["24"],
        marginRight: SIZE["24"],
        marginBottom: SIZE["8"],
        borderBottomColor: '#eee'
    }
});

const mapStateToProps = state => ({
    categoriesState: state.lists.categoriesState
});

const mapDispatchToProps = {
    apiGetCategories
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ListRestaurantsByNearMe);