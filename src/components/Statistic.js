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

const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [{
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(7, 214, 255, ${opacity})` // optional
    }]
}

createData=()=>{
    const numOfMonth = 6;
}

export default class Statistic extends Component {
    constructor(props) {
        super(props)

        this.state = {
            countData: []
        }
    }

    getCountData = () => {

    }

    render() {
        return (
            <View style={{ paddingTop: 55, flex: 1, height: '100%' }}>
                <ScrollView>
                    <CustomCard
                        style={{elevation: 3, margin: 10}}
                        title={'EVENT COUNTING'}>
                        <LineChart
                            data={data}
                            width={screenWidth-20}
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
