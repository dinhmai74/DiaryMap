import React, { Component } from 'react';
import moment from 'moment'
import { Text, View, StyleSheet } from 'react-native';
import { Calendar, CalendarList, Agenda, InfiniteAgenda } from 'react-native-calendars';

var today = moment().format('YYYY-MM-DD');
var stime = '2019-01-05T07:34:00+07:00';
var time = moment(stime).format();

data={
    '2018-01-06':[{title:'Chào ngày mới', text:'Xin chào\nHôm nay là thứ 2'}, {title:'Chào ngày mới 2', text:'Xin chào\nHôm nay là thứ 2'}],
    '2018-01-07':[{title:'Chào ngày 3', text:'Xin chào\nHôm nay là thứ 3'}],
    '2018-01-09':[],
    '2019-01-01':[{title:'Chào ngày mới12', text:'Xin chào\nHôm nay là thứ 212'}, {title:'Chào ngày mới 2231', text:'Xin chào\nHôm nay là thứ 212'}],
    '2019-01-05':[{title:'Chào ngày 3', text:'Xin chào\nHôm nay là thứ 3'}],
    '2019-01-06':[{title:'Chào ngày mới', text:'Xin chào\nHôm nay là thứ 2Hôm nay là thứ 2Hôm nay là thứ 2Hôm nay là thứ 2Hôm nay là thứ 2Hôm nay là thứ 2Hôm nay là thứ 2Hôm nay là thứ 2Hôm nay là thứ 2Hôm nay là thứ 2Hôm nay là thứ 2Hôm nay là thứ 2Hôm nay là thứ 2'}, {title:'Chào ngày mới 2', text:'Xin chào\nHôm nay là thứ 2'}],
    '2019-01-08':[{title:'Chào ngày 3', text:'Xin chào\nHôm nay là thứ 3\nXin chào\nHôm nay là thứ 3\nXin chào\nHôm nay là thứ 3\nXin chào\nHôm nay là thứ 3\nXin chào\nHôm nay là thứ 3\nXin chào\nHôm nay là thứ 3\nXin chào\nHôm nay là thứ 3\nXin chào\nHôm nay là thứ 3\nXin chào\nHôm nay là thứ 3\nXin chào\nHôm nay là thứ 3\nXin chào\nHôm nay là thứ 3\n'}],
    '2019-01-23':[{title:'Chào ngày 23', text:'Xin chào\nHôm nay là thứ 3'}],
    '2019-01-09':[],
    '2019-02-06':[{title:'Chào ngày mới', text:'Xin chào\nHôm nay là thứ 2'}, {title:'Chào ngày mới 2', text:'Xin chào\nHôm nay là thứ 2'}],
    '2019-02-08':[{title:'Chào ngày 3', text:'Xin chào\nHôm nay là thứ 3'}],
    '2019-02-09':[]
}

event={}

class AppCalendar extends Component {
    render() {
        return (
        <View style={{paddingTop: 50, paddingBottom: 50, flex: 1}}>
            <Agenda  
                items={event}
                // onDayPress={(day)=>{alert(moment(day).format('DD-MM-YYYY'))}}
                loadItemsForMonth={this.loadItemsForMonth}
                pastScrollRange={50}
                futureScrollRange={50}
                renderEmptyDate={this.renderEmptyDate}
                renderItem={this.renderItem}
                rowHasChanged={this.rowHasChanged}
            />
        </View>
    )};

    loadItemsForMonth = (selected) => {
        if (!selected)
            return;
        let begin = moment(selected.dateString).startOf('month');
        let end = moment(selected.dateString).endOf('month');
        while (begin.isSameOrBefore(end)) {
            let d = begin.format('YYYY-MM-DD');
            let value = data[d];
            event[d] = value ? value : [];
            begin.add(1, 'days');
        };
    };

    loadItems = (day) => {
        if (!day)
            return;

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
            <Text style={styles.itemText} numberOfLines={3}>{item.text}</Text>
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
