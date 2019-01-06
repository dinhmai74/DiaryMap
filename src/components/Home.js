import React, { Component } from 'react'
import { Text, View } from 'react-native'
import {Actions} from 'react-native-router-flux'

const data = [
    {
        id:1,
        time:'2019-01-05T18:34:00+07:00',
        title:'Chào ngày mới',
        text:'Xin chào/nHôm nay là thứ 2',
        
    }
]

export default class Home extends Component {
  render() {
    return (
        <View style={{paddingTop: 50, paddingBottom: 60}}>
        <Text> Home </Text>
      </View>
    )
  }
}

