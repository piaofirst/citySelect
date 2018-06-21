import React, {Component} from 'react';
import {Dimensions, Platform, SectionList, StyleSheet, Text, TouchableOpacity, View,ToastAndroid} from 'react-native';

const ITEM_HEIGHT = 50; //item的高度
const HEADER_HEIGHT = 24;  //分组头部的高度
const SEPARATOR_HEIGHT = 0;  //分割线的高度
const {width, height} = Dimensions.get('window');
export default class CityList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            sections: [],
            sectionSize: [],
        };
        this.getCityInfos();

    }

    getCityInfos() {
        let allCityList = this.props.allCityList;
        //每组的开头在列表中的位置
        let totalSize = 0;
        //SectionList的数据源
        let cityInfos = [];
        //分组头的数据源
        let citySection = [];
        //分组头在列表中的位置
        let citySectionSize = [];

        for (let i = 0; i < allCityList.length; i++) {
            citySectionSize[i] = totalSize;
            //给右侧的滚动条进行使用的
            citySection[i] = allCityList[i].title;
            let section = {}
            section.key = allCityList[i].title;
            section.data = allCityList[i].city;
            for (let j = 0; j < section.data.length; j++) {
                section.data[j].key = j
            }
            cityInfos[i] = section;
            //每一项的header的index
            totalSize += section.data.length + 1
        }
        this.state.data = cityInfos;
        this.state.sections = citySection;
        this.state.sectionSize = citySectionSize;
    }

    render() {
        if (this.state.data.length > 0) {
            return (
                <View style={{paddingTop: Platform.OS === 'android' ? 0 : 20}}>
                    <View>
                        <SectionList
                            ref='list'
                            enableEmptySections
                            renderItem={({item})=>this._renderItem(item)}
                            renderSectionHeader={this._renderSectionHeader}
                            sections={this.state.data}
                            getItemLayout={this._getItemLayout}/>

                        <View style={styles.letters}>
                            {this.state.sections.map((letter, index) => this._renderRightLetters(letter, index))}
                        </View>
                    </View>
                </View>
            )
        } else {
            return <View/>
        }
    }

    _renderRightLetters(letter, index) {
        return (
            <TouchableOpacity key={'letter_idx_' + index} activeOpacity={0.6} onPress={() => {
                this.refs.list.scrollToLocation({
                    itemIndex: 0,
                    sectionIndex: index,
                    viewOffset: 74 * 2
                })
            }}>
                <View style={styles.letter}>
                    <Text style={styles.letterText}>{letter}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    _getItemLayout(data, index) {
        let [length, separator, header] = [ITEM_HEIGHT, SEPARATOR_HEIGHT, HEADER_HEIGHT];
        return {length, offset: (length + separator) * index + header, index};
    }

    _renderItem = (item) => {
        return (
            <TouchableOpacity style={styles.itemView} onPress={() => ToastAndroid.show(item.city_child, ToastAndroid.SHORT)}>
                <Text style={{marginLeft: 30, fontSize: 16, color: '#333'}}>
                    {item.city_child}
                </Text>
                <Text style={{marginLeft: 25, fontSize: 15, color: '#999'}}>
                    {item.city_parent}
                </Text>
                <Text style={{marginLeft: 25, fontSize: 13, color: '#999'}}>
                    {item.provcn}
                </Text>
            </TouchableOpacity>
        )
    }

    _renderSectionHeader = (section) => {
        return (
            <View style={styles.headerView}>
                <Text style={styles.headerText}>{section.section.key}</Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    headerView: {
        justifyContent: 'center',
        height: HEADER_HEIGHT,
        paddingLeft: 20,
        backgroundColor: '#eee'
    },
    headerText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#3cb775'
    },
    itemView: {
        flexDirection: 'row',
        padding: 12,
        alignItems: 'center',
        height: ITEM_HEIGHT
    },
    letters: {
        position: 'absolute',
        height: height - 80,
        top: 0,
        bottom: 0,
        right: 10,
        backgroundColor: 'transparent',
        // justifyContent: 'flex-start',
        // alignItems: 'flex-start'
        alignItems: 'center',
        justifyContent: 'center'
    },
    letter: {
        height: height * 3.3 / 100,
        width: width * 3.3 / 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    letterText: {
        textAlign: 'center',
        fontSize: height * 1.1 / 50,
        color: '#e75404'
    },
});