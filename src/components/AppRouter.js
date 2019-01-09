import React from 'react';
import {View, Text} from 'react-native';
import {SideMenu, Drawer, Scene, Router} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import Home from './Home';
import Map from './Map';
import Album from './Album';
import AppCalendar from './AppCalendar';
import Login from './Login';
import Register from './Register';

const TabIcon = ({selected, title, iconName}) => {
    const color = selected ? '#04c9e8' : '#3f3f3f';
    return (
        <View style={{flex:1, flexDirection:'column', alignItems:'center', alignSelf:'center', justifyContent: 'center'}}>
            <Icon style={{color: color}} name={iconName || "circle"} size={25}/>
            {/* <Text style={{color: color, fontSize: 12}}>{title}</Text> */}
        </View>
    );
};

const DrawerIcon = () => {
    return(
        <View style={{flexDirection: "column", alignSelf: 'flex-end', justifyContent: 'space-around', marginTop: 10}}>
            <Icon name='bars' size={30} color='white' />
        </View>
    )
}

const styles = {
    navigationBarStyle: {
        backgroundColor: '#26d6f2',
        justifyContent: 'flex-start'
    }, 
    titleStyle: {
        color: 'white',
        fontWeight: 'bold',
        alignSelf: 'center'
    }
}

const {navigationBarStyle, titleStyle} = styles;

const AppRouter = () => {
    return (
        <Router
            navigationBarStyle={navigationBarStyle}
            titleStyle={titleStyle}
            renderLeftButton={DrawerIcon}>
            <Scene key='auth' tabBarStyle={{backgroundColor: '#FFFFFF', elevation: 25}}>
                <Scene
                    key="login"
                    component={Login} 
                    title="LOGIN"
                    initial
                />
                <Scene
                    key='register'
                    component={Register}
                    title='REGISTER'
                />
            </Scene>

            <Scene key='tabs' tabs tabBarStyle={{backgroundColor: '#FFFFFF', elevation: 25}}>
                <Scene
                    key="home"
                    component={Home} 
                    iconName='home'
                    title="DISCOVERY"
                    icon={TabIcon}
                />
                <Scene
                    key='map'
                    component={Map}
                    title='MAP'
                    iconName='map'
                    icon={TabIcon}
                />
                <Scene
                    key='album'
                    component={Album}
                    title='ALBUM'
                    iconName='photo'
                    icon={TabIcon}
                />
                <Scene
                    key='calendar'
                    component={AppCalendar}
                    title='CALENDAR'
                    iconName='today'
                    icon={TabIcon}
                />
                
            </Scene>
        </Router>
    )
}

export default AppRouter;
