import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import {Actions} from 'react-native-router-flux'

class Login extends Component {
    render() {
        return (
            <ImageBackground source={require('../assets/letter.png')} style={styles.container}>
                <Image source={require('../assets/logo.png')} style={{height: 160, resizeMode: 'center', alignSelf: 'center'}} />
                <View style={styles.inputContainer}>
                    <Icon style={{ color: 'white', marginHorizontal: 8 }} name={'user-circle'} size={25} />
                    <TextInput style={styles.textInput} placeholder='Username/ Email' placeholderTextColor='white' />
                </View>
                <View style={styles.inputContainer}>
                    <Icon style={{ color: 'white', marginHorizontal: 12 }} name={'unlock-alt'} size={25} />
                    <TextInput style={styles.textInput} placeholder='Password' placeholderTextColor='white' secureTextEntry={true} />
                </View>
                <TouchableOpacity style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>Sign In</Text>
                </TouchableOpacity>
                <Text style={{fontSize: 17, color: 'white', alignSelf: 'center', marginTop: 20}}>Do not have account yet?</Text>
                <TouchableOpacity style={styles.buttonContainer} onPress={()=>Actions.register()}>
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 50, 
        paddingBottom: 60, 
        backgroundColor: '#26d6f2', 
        flex: 1, padding: 35, 
        justifyContent: 'center',
        //alignItems: 'center'
    },
    inputContainer: {
        borderColor: 'white',
        borderRadius: 50,
        borderWidth: 2,
        padding: 3,
        alignItems: 'center',
        height: 50,
        flexDirection: 'row',
        margin: 5
    },
    textInput: {
        //borderBottomWidth: 2,
        borderBottomColor: 'white',
        flex: 1,
        color: 'white',
        fontSize: 16
    },
    buttonContainer: {
        borderColor: 'white',
        borderRadius: 50,
        //borderWidth: 2,
        padding: 3,
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        margin: 5,
        backgroundColor: '#26d6f2',
    },
    buttonText: {
        fontSize: 20,
        color: 'white'
    }
})

export default Login;
