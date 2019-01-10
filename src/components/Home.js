import React, { Component } from 'react'
import { Text, View, FlatList } from 'react-native'
import { Actions } from 'react-native-router-flux'
import Item from './Item'
import moment from 'moment'

datas = {
    '2018-01-06': [{ title: 'Chào ngày mới', text: 'Xin chào\nHôm nay là thứ 2' }, { title: 'Chào ngày mới 2', text: 'Xin chào\nHôm nay là thứ 2' }],
    '2018-01-07': [{ title: 'Chào ngày 3', text: 'Xin chào\nHôm nay là thứ 3' }],
    '2018-01-09': [],
    '2019-01-01': [{ title: 'Chào ngày mới12', text: 'Xin chào\nHôm nay là thứ 212' }, { title: 'Chào ngày mới 2231', text: 'Xin chào\nHôm nay là thứ 212' }],
    '2019-01-05': [{ title: 'Chào ngày 3', text: 'Xin chào\nHôm nay là thứ 3' }],
    '2019-01-06': [{ title: 'Chào ngày mới', text: 'Xin chào\nHôm nay là thứ 2Hôm nay là thứ 2Hôm nay là thứ 2Hôm nay là thứ 2Hôm nay là thứ 2Hôm nay là thứ 2Hôm nay là thứ 2Hôm nay là thứ 2Hôm nay là thứ 2Hôm nay là thứ 2Hôm nay là thứ 2Hôm nay là thứ 2Hôm nay là thứ 2' }, { title: 'Chào ngày mới 2', text: 'Xin chào\nHôm nay là thứ 2' }],
    '2019-01-08': [{ title: 'Chào ngày 5', text: 'Xin chào\nHôm nay là thứ 3\nXin chào\nHôm nay là thứ 3\nXin chào\nHôm nay là thứ 3\nXin chào\nHôm nay là thứ 3\nXin chào\nHôm nay là thứ 3\nXin chào\nHôm nay là thứ 3\nXin chào\nHôm nay là thứ 3\nXin chào\nHôm nay là thứ 3\nXin chào\nHôm nay là thứ 3\nXin chào\nHôm nay là thứ 3\nXin chào\nHôm nay là thứ 3\n' }],
    '2019-01-23': [{ title: 'Chào ngày 23', text: 'Xin chào\nHôm nay là thứ 3' }],
    '2019-02-06': [{ title: 'Chào ngày mới', text: 'Xin chào\nHôm nay là thứ 2' }, { title: 'Chào ngày mới 2', text: 'Xin chào\nHôm nay là thứ 2' }],
    '2019-02-08': [{ title: 'Chào ngày 3', text: 'Xin chào\nHôm nay là thứ 3' }],
    '2019-02-09': []
}

export default class Home extends Component {
    render() {
        return (
            <View style={{ paddingTop: 50, paddingBottom: 50, backgroundColor: '#eeeeee' }}>
                <FlatList
                    data={Object.keys(datas)}
                    renderItem={({ item }) => {
                        return (
                            <View style={{marginTop: 10, margin: 7, padding: 7, borderRadius: 8, backgroundColor: '#fff6ed'}}>
                                <Text style={{fontWeight: 'bold', fontSize: 16}}>{moment(item).format('DD MMMM YYYY').toUpperCase()}</Text>
                                <FlatList
                                    data={datas[item]}
                                    keyExtractor={(item, index) => item.title}
                                    renderItem={this.renderItem}
                                    numColumns={1}
                                />
                            </View>
                        )
                    }}
                    keyExtractor={(item, index) => item}
                    numColumns={1}
                />
            </View>
        )
    }

    renderItem = ({item}) => {
        return (
            <View style={{ marginLeft: 20 }}>
                <Item item={item} />
            </View>
        )
    }
}

