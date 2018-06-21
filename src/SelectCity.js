import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';

import DATA_JSON from './city-list.json';
import TopBar from "./TopBar";
import SearchBox from "./SearchBox";
import CityList from "./CityList";
import SearchResult from "./SearchResult";
const AllCityList = DATA_JSON.data;

export default class SelectCity extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showSearchResult: false,
            keyword: '',
            searchResultList: [],
            allCityList: AllCityList,
        }
    }
    onPressBack() {
        alert('你选择了返回====》header back');
    }

    onChanegeTextKeyword(newVal) {
        if (newVal === '') {
            this.setState({showSearchResult: false,keyword: ''});
        } else {
            // 在这里过滤数据结果
            let dataList = this.filterCityData(newVal);
            this.setState({keyword: newVal, showSearchResult: true, searchResultList: dataList});
        }
    }

    filterCityData(text) {
        console.log('search for list', text);
        let rst = [];
        for (let idx = 0; idx < AllCityList.length; idx++) {
            let item = AllCityList[idx];
            for (let j=0; j< item.city.length; j++){
                if (item.city[j].city_child.indexOf(text) === 0 || item.city[j].city_child_en.indexOf(text) === 0) {
                    rst.push(item.city[j]);
                }
            }
        }
        return rst;
    }

    render() {
        return (
            <View style={styles.container}>
                <TopBar onPressBack={this.onPressBack} title="选择城市"/>
                <SearchBox keyword={this.state.keyword}
                           onChanegeTextKeyword={(vv) => this.onChanegeTextKeyword(vv)}/>
                {this.state.showSearchResult
                    ? <SearchResult
                        searchResultList={this.state.searchResultList}/>
                    : <CityList allCityList={this.state.allCityList}/>}
            </View>
        )
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#ffffff',
    },
    currentCity: {
        backgroundColor: '#ffffff',
        height: 20,
        margin: 5
    },
    currentCityText: {
        fontSize: 16
    }
});