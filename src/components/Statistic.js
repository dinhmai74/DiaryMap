import React, { Component } from 'react'
import { Text, View, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, Dimensions, ImageBackground } from 'react-native'
import firebase from 'firebase'
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome5';
import moment from 'moment';
import { Actions, ActionConst } from 'react-native-router-flux';
import DeleteButton from './ui/DeleteButton';
import { ConfirmDialog, ProgressDialog } from 'react-native-simple-dialogs';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph
} from 'react-native-chart-kit'
import CustomCard from './ui/CustomCard'

const screenWidth = Dimensions.get('window').width

const chartConfig = {
    backgroundGradientFrom: 'white',
    backgroundGradientTo: 'white',
    color: ((opacity = 1) => `rgba(2, 174, 209, ${opacity})`)
}

export default class Statistic extends Component {
    constructor(props) {
        super(props)
        this.props.dataSource = null;

        this.state = {
            countData: []
        }
    }

    createMonthData = () => {
        const numOfMonth = 6;
        const now = moment().format();
        var listMonth = [];

        var tmp = moment().endOf('month');
        tmp.add(-15, 'd');
        for (let i = 0; i < numOfMonth; i++) {
            listMonth.unshift(moment(tmp).add(-i, 'M').format('YYYY-MM'));
        }
        return listMonth;
    }

    getCountData = () => {
        let events = [0, 0, 0, 0, 0, 0];
        const listM = this.createMonthData();
        firebase.database().ref('event').orderByChild('time').once('value', (dataSnapshot) => {
            dataSnapshot.forEach((childSnapshot) => {
                let item = childSnapshot.val();
                if (item.userid === firebase.auth().currentUser.uid) {
                    let k = moment(item.time).format('YYYY-MM');
                    for (let i = 0; i < 6; i++) {
                        if (k == listM[i])
                            events[i] = events[i] + 1;
                    }
                }
            });
            try { this.setState({ refresh: !this.state.refresh, dataSource: events }); }
            catch{ () => { } }
        })
        return events;
    }

    getListMonth=()=>{
        var listMonth = [];
        const data = this.createMonthData();
        for(let i = 0; i < 6; i++){
            listMonth.push(moment(data[i], 'YYYY-MM').format('MMM'));
        }
        return listMonth;
    }
    
    dataS = () =>{
        return({
        labels: this.getListMonth(),
        datasets: [{
            data: this.getCountData(),
            color: (opacity = 1) => `rgba(7, 214, 255, ${opacity})` // optional
        }]
    })}

    componentWillMount(){
        this.props.dataSource = this.dataS();
    }

    render() {
        return (
            <View style={{ paddingTop: 55, flex: 1, height: '100%' }}>
                <ScrollView>
                    <CustomCard
                        style={{ elevation: 3, margin: 10 }}
                        title={'EVENT COUNTING'}>
                        <LineChart
                            data={this.props.dataSource}
                            width={screenWidth - 20}
                            height={180}
                            chartConfig={chartConfig}
                        />
                    </CustomCard>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({

})
