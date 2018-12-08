import React from 'react'
import {connect} from 'react-redux'
import {
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity, StyleSheet
} from 'react-native'
import {apiGetCategories} from "../../../stores/lists/ListActions";
import {SIZE} from "../../../configs/Const";
import {headerStyles} from "../../Header";

type TProps = {
    categoriesState?: any;
    apiGetCategories?: Function;
}
class ListCategories extends React.Component<TProps> {
    constructor(props) {
        super(props)
    }
    componentDidMount(): void {
        this.props.apiGetCategories()
    }

    categoryItem = (item)=> (
        <View style={{
            flex: 1,
            marginLeft: 20
        }}>
            <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center'}}>
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

    renderListCategories = () => {
        if (this.props.categoriesState.length > 0){
            return (
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    numColumns={1}
                    horizontal={true}
                    data={this.props.categoriesState}
                    renderItem={({item}) => this.categoryItem(item)}
                    keyExtractor={this._keyExtractor}/>
            )
        }
    }
    render() {
        return (
            <View>

                <Text style={[listStyles.listViewTitle, headerStyles.fontWeightBold]}>Danh mục</Text>
                {this.renderListCategories()}

            </View>
        )
    }
}

const listStyles = StyleSheet.create({
    listViewTitle: {
        fontSize: SIZE["16"],
        color: '#000',
        marginLeft: SIZE["16"],
        marginBottom: SIZE["8"]
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
)(ListCategories);