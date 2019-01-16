import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/FontAwesome5'

export default class CustomMarker extends Component {
    render() {
        return (
            <TouchableOpacity 
                style={styles.container}
                onPress={()=>Actions.event(this.props.event)} >
                <Icon name='map-marker' style={styles.icon} size={25} />
                <Image source={{uri: this.props.event.imageurl}} style={styles.image} />  
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        height: 51,
    },
    image: {
        width: 40,
        height: 40,
        resizeMode: 'cover',
        borderWidth: 2,
        borderRadius: 2,
        borderColor: '#26d6f2'
    },
    icon: {
        color: '#26d6f2',
        justifyContent: 'flex-end',
        position: 'absolute',
        marginTop: 25,
    }
})
