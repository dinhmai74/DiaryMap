import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image, ImageBackground, Alert, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import {Actions} from 'react-native-router-flux'
import firebase from 'firebase'
import {PASSWORD, EMAIL, USERNAME} from  './Regexs'
import AddButton from './ui/AddButton';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            emailValid: false,
            passwordValid: false
        }
    }

    validate(type, value) {
        if (type == "email") {
            this.setState({email: value})
            if (EMAIL.test(value)) 
                this.setState({emailValid: true})
            else 
                this.setState({emailValid: false})
        }
        else if (type == "password") {
            this.setState({password: value})
            if (PASSWORD.test(value))
                this.setState({passwordValid: true})
            else 
                this.setState({passwordValid: false})
        }
    }

    _login() {
        Keyboard.dismiss();
        if (this.state.emailValid && this.state.passwordValid) {
            firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {
                Actions.tabs();
            })
            .catch(function(error) {
                Alert.alert(
                    'LOGIN FAILED',
                    'Wrong Username/Email or Password'
                )
            });
        } 
        else {
            if (this.state.email == '') {
                Alert.alert(
                    'LOGIN FAILED',
                    'Please enter your username or email'
                )
            }
            else if (this.state.password == '') {
                Alert.alert(
                    'LOGIN FAILED',
                    'Please enter your password'
                )
            }
            else if (!this.state.emailValid) {
                Alert.alert(
                    'LOGIN FAILED',
                    'Email invalid. Please check your email'
                )
            }
            else if (!this.state.passwordValid) {
                Alert.alert(
                    'LOGIN FAILED',
                    'Password invalid. Please check your password.'
                )
            }
        }
    }

    render() {
        return (
            <ImageBackground source={require('../assets/letter.png')} style={styles.container}>
                <Image source={require('../assets/logo.png')} style={{height: 160, resizeMode: 'center', alignSelf: 'center'}} />
                <View style={styles.inputContainer}>
                    <Icon style={{ color: 'white', marginHorizontal: 8 }} name={'user-circle'} size={25} />
                    <TextInput 
                        style={styles.textInput} 
                        placeholder='Email' 
                        placeholderTextColor='white' 
                        onChangeText={(email) => {this.validate("email", email)}}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Icon style={{ color: 'white', marginHorizontal: 12 }} name={'unlock-alt'} size={25} />
                    <TextInput 
                        style={styles.textInput} 
                        placeholder='Password' 
                        placeholderTextColor='white' 
                        secureTextEntry={true} 
                        onChangeText={(password) => {this.validate("password", password)}}
                    />
                </View>
                <TouchableOpacity style={styles.buttonContainer} onPress={()=>{this._login()}}>
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