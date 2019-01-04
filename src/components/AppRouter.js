import React from 'react';
import {View} from 'react-native';
import {Scene, Router} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Home from './Home';
import Map from './Map';
import Album from './Album';
import AppCalendar from './AppCalendar';

const TabIcon = ({selected, title, iconName}) => {
    const color = selected ? '#04c9e8' : '#3f3f3f';
    return (
        <View style={{flex:1, flexDirection:'column', alignItems:'center', alignSelf:'center', justifyContent: 'center'}}>
            <Icon style={{color: color}} name={iconName || "circle"} size={25}/>
            {/* <Text style={{color: color, fontSize: 12}}>{title}</Text> */}
        </View>
    );
};

const styles = {
    navigationBarStyle: {
        backgroundColor: '#f4f4f8'
    }, 
    titleStyle: {
        color: '#005b96',
        fontWeight: 'bold'
    }
}

const {navigationBarStyle, titleStyle} = styles;

const AppRouter = () => {
    return (
        <Router>
            <Scene key='tabs' tabs tabBarStyle={{backgroundColor: '#FFFFFF', elevation: 25}}>
                <Scene
                    key="home"
                    component={Home} 
                    iconName='home'
                    title="Home"
                    icon={TabIcon}
                    navigationBarStyle={navigationBarStyle}
                    titleStyle={titleStyle}
                    initial
                />
                <Scene
                    key='map'
                    component={Map}
                    title='Map'
                    iconName='map'
                    icon={TabIcon}
                    navigationBarStyle={navigationBarStyle}
                    titleStyle={titleStyle}
                />
                <Scene
                    key='album'
                    component={Album}
                    title='Album'
                    iconName='photo'
                    icon={TabIcon}
                    navigationBarStyle={navigationBarStyle}
                    titleStyle={titleStyle}
                />
                <Scene
                    key='calendar'
                    component={AppCalendar}
                    title='Calendar'
                    iconName='today'
                    icon={TabIcon}
                    navigationBarStyle={navigationBarStyle}
                    titleStyle={titleStyle}
                />
                
            </Scene>
        </Router>
    )
}

export default AppRouter;
