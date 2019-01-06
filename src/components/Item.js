import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import {Actions} from 'react-native-router-flux'

export default class Home extends Component {
  render() {
    const item = this.props.item;
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.text} numberOfLines={3}>{item.text}</Text>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 5,
        paddingLeft: 15,
        padding: 5,
        backgroundColor: '#ffffff'
    },
    title: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#15d1ef'
    },
    text: {
        fontSize: 13,
    }
})
