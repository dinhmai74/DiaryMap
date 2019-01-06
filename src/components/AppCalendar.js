import React, { Component } from 'react';
import moment from 'moment'
import { Text, View, StyleSheet } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

var today = moment().format('YYYY-MM-DD');
var stime = '2019-01-05T07:34:00+07:00';
var time = moment(stime).format();

data={
    '2018-01-06':[{title:'Chào ngày mới', text:'Xin chào\nHôm nay là thứ 2'}, {title:'Chào ngày mới 2', text:'Xin chào\nHôm nay là thứ 2'}],
    '2018-01-07':[{title:'Chào ngày 3', text:'Xin chào\nHôm nay là thứ 3'}],
    '2018-01-09':[],
    '2019-01-06':[{title:'Chào ngày mới', text:'Xin chào\nHôm nay là thứ 2'}, {title:'Chào ngày mới 2', text:'Xin chào\nHôm nay là thứ 2'}],
    '2019-01-08':[{title:'Chào ngày 3', text:'Xin chào\nHôm nay là thứ 3'}],
    '2019-01-09':[],
    '2019-02-06':[{title:'Chào ngày mới', text:'Xin chào\nHôm nay là thứ 2'}, {title:'Chào ngày mới 2', text:'Xin chào\nHôm nay là thứ 2'}],
    '2019-02-08':[{title:'Chào ngày 3', text:'Xin chào\nHôm nay là thứ 3'}],
    '2019-02-09':[]
}

event={}

class AppCalendar extends Component {
    render() {
        return (
        <View style={{paddingTop: 50, paddingBottom: 60, height: 1000}}>
            <Agenda 
                items={event}
                // onDayPress={(day)=>{alert(moment(day).format('DD-MM-YYYY'))}}
                loadItemsForMonth={this.loadItemsForMonth}
                pastScrollRange={50}
                futureScrollRange={50}
                renderEmptyDate={this.renderEmptyDate}
                renderItem={this.renderItem}
                rowHasChanged={(r1, r2) => {return r1.day !== r2.day}}
                scrollEnable
            />
        </View>
    )};

    loadItemsForMonth = (day) => {
        if (!day)
            return;
        let begin = moment(day.dateString).startOf('month');
        alert(moment('2019-01-01').format('YYYY-MM-DD'));
        let end = moment(day.dateString).endOf('month');
        while (begin.isSameOrBefore(end)) {
            const day = begin.format('YYYY-MM-DD');
            let value = data[day];
            event[day] = Array.isArray(value) ? [...value] : [];
            begin.add(1, 'days');
        }
    }

    renderEmptyDate = () => {
        return (
            <View style={styles.emptyDate}></View>
        );
    };

    renderItem = (item) => {
        return (
        <View style={styles.itemContainer}>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text>{item.text}</Text>
        </View>
        );
    };

    rowHasChanged = (r1, r2) => {return r1.title !== r2.title};
};

const styles = StyleSheet.create({
    itemContainer: {
        marginTop: 5,
        paddingLeft: 15,
        padding: 5,
        backgroundColor: '#ffffff'
    },
    itemTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#15d1ef'
    },
    itemText: {
        fontSize: 13,

    },
    emptyDate: {
        marginTop: 45,
        marginRight: 10,
        borderTopWidth: 2,
        borderTopColor: '#dddddd',
        height: 5,
    },
})

export default AppCalendar;
