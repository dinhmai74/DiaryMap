import React, { Component } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import CustomMarker from './ui/CustomMarker';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import AddButton from './ui/AddButton'
import FitMapButton from './ui/FitMapButton'

class Map extends Component {
    constructor(props){
        super(props);
        this.mapRef = null;
        this.state = {
            refresh: false,
            dataSource: this.getAllEvent(),
            coordinates: this.getAllCoordinate()
        }
    }

    getAllEvent(){
        var events = [];
        firebase.database().ref('event').orderByChild('time').on('value', (dataSnapshot) => {
            dataSnapshot.forEach((childSnapshot) => {
                var item = childSnapshot.val();
                if(item.userid === firebase.auth().currentUser.uid)
                if(typeof(item.coordinate) != 'undefined')
                    events.push(item);
                try{this.setState({ refresh: !this.state.refresh });}
                catch{()=>{}}
            });
        })
        return events;
    }

    getAllCoordinate(){
        var events = [];
        firebase.database().ref('event').orderByChild('time').on('value', (dataSnapshot) => {
            dataSnapshot.forEach((childSnapshot) => {
                var item = childSnapshot.val();
                if(item.userid === firebase.auth().currentUser.uid)
                if(typeof(item.coordinate) != 'undefined')
                    events.push(item.coordinate);
            });
            try { this.setState({ refresh: !this.state.refresh }); }
            catch{ () => { } };
        })
        return events;
    }

    fitToCoords(){
        const coords = [{latitude: 10, longitude: 106}, {latitude: 11, longitude: 108}]
        this.mapRef.fitToCoordinates(coords, {edgePadding: { top: 100, right: 100, bottom: 100, left: 100 }, animated: true });
    }

    render() {
        return (
            <View style={styles.container}>
                <MapView
                    ref={ref => { this.mapRef = ref; }}
                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    style={styles.map}
                    showsUserLocation={true}
                    region={{
                        latitude: 11,
                        longitude: 107,
                        latitudeDelta: 5,
                        longitudeDelta: 5,
                    }} >

                    {this.state.dataSource.map(marker => (
                        <Marker
                            coordinate={marker.coordinate}
                            onPress={() => Actions.event({item: marker})}
                        >
                            <CustomMarker event={marker} />
                        </Marker>
                    ))}
                </MapView>
                <AddButton/>
                {/* <FitMapButton onPress={this.fitToCoords} /> */}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        marginTop: 50,
        marginBottom: 50,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});

export default Map;
