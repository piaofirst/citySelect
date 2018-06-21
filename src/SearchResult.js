import React, {Component} from 'react';
import {Dimensions, FlatList, StyleSheet, Text, ToastAndroid, TouchableOpacity, View} from 'react-native';

const ITEM_HEIGHT = 50; //item的高度
const {width, height} = Dimensions.get('window');

export default class SearchResult extends Component {

    constructor(props) {
        super(props)
    }

    _keyExtractor = (item, index) => index + '';

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.props.searchResultList}
                    keyExtractor={this._keyExtractor}
                    renderItem={({item, index}) => this._renderItem(item)}
                />
            </View>
        )
    }

    _renderItem = (data) => {
        return (
            <TouchableOpacity style={styles.itemView}
                              onPress={() => ToastAndroid.show(data.city_child, ToastAndroid.SHORT)}>
                <Text style={{marginLeft: 30, fontSize: 16, color: '#333'}}>
                    {data.city_child}
                </Text>
                <Text style={{marginLeft: 25, fontSize: 15, color: '#999'}}>
                    {data.city_parent}
                </Text>
                <Text style={{marginLeft: 25, fontSize: 13, color: '#999'}}>
                    {data.provcn}
                </Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    contentContainer: {
        flexDirection: 'row',
        width: width,
        backgroundColor: 'white',
        justifyContent: 'flex-start',
        flexWrap: 'wrap'
    },
    itemView: {
        flexDirection: 'row',
        padding: 12,
        alignItems: 'center',
        height: ITEM_HEIGHT
    },
});