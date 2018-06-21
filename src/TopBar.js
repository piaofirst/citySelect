import React, {Component} from 'react';
import {Platform, StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export default class TopBar extends Component {
    _onBackBtn(e) {
        this.props.onPressBack();
    }
    render() {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="#e75404" barStyle="light-content"/>
                <View style={[styles.cellfixed]}>
                    <TouchableOpacity onPress={e => this._onBackBtn(e)}>
                        {/*<Text>返回</Text>*/}
                    </TouchableOpacity>
                </View>
                <View style={styles.cell}>
                    <Text style={[styles.title]}>{this.props.title}</Text>
                </View>
                <View style={[styles.cellfixed]}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#e75404',
        paddingTop: Platform.OS === 'ios'
            ? 20
            : 0, // 处理iOS状态栏
        height: Platform.OS === 'ios'
            ? 50
            : 35, // 处理iOS状态栏
        paddingLeft: 5,
        paddingRight: 5,
        paddingBottom: 10
    },
    cell: {
        flex: 1,
        marginTop: 5
    },
    title: {
        fontSize: 16,
        textAlign: 'center',
        marginLeft: 5,
        marginRight: 5,
        color: '#ffffff'
    },
    cellfixed: {
        marginTop: 5,
        width: 80
    }
})