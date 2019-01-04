import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import AppRouter from './src/components/AppRouter'

export default class App extends Component {
  render() {
    return (
      <AppRouter />
    );
  }
}
