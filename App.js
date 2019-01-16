// symbol polyfills
global.Symbol = require('core-js/es6/symbol');
require('core-js/fn/symbol/iterator');
// collection fn polyfills
require('core-js/fn/map');
require('core-js/fn/set');
require('core-js/fn/array/find');

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import AppRouter from './src/components/AppRouter'
import firebase from 'firebase';

export default class App extends Component {
    componentWillMount(){
        var config = {
            apiKey: "AIzaSyCBYu2-f6pKSriXzilNjWbNiwdIFJtx_4A",
            authDomain: "diarymap-71a36.firebaseapp.com",
            databaseURL: "https://diarymap-71a36.firebaseio.com",
            projectId: "diarymap-71a36",
            storageBucket: "diarymap-71a36.appspot.com",
            messagingSenderId: "1053208154799"
        };
        firebase.initializeApp(config);

    }
    render() {
        return (
            <AppRouter />
        );
    }
}
