import React, { Component } from 'react';
import moment from 'moment'
import { Text, View } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

var today = moment().format('YYYY-MM-DD');

class AppCalendar extends Component {
  render() {
    return (
      <View style={{paddingTop: 50, paddingBottom: 60}}>
        <Calendar
            onDayPress={(day)=>{today=moment(day.dateString).format('YYYY-MM-DD')}}
            markingType={'custom'}
            markedDates={{
                [today]: {
                  customStyles: {
                    container: {
                      backgroundColor: '#04c9e8',
                    },
                    text: {
                      color: 'white',
                      fontWeight: 'bold'
                    },
                  },
                },
            }}
        />
      </View>
    )
  }
}

export default AppCalendar;
