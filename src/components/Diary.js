import React, { Component } from 'react'
import { Text, View } from 'react-native'
import {Actions} from 'react-native-router-flux'

export default class Diary extends Component {
  render() {
    return (
        <View style={{paddingTop: 50, paddingBottom: 60}}>
        <Text> Diary </Text>
      </View>
    )
  }
}

