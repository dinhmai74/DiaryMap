import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'

class Map extends Component {
    render() {
        return (
            <View style={styles.container}>
                <MapView
                    //provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    style={styles.map}
                    region={{
                        latitude: 10.883581,
                        longitude: 106.775669,
                        latitudeDelta: 1.5,
                        longitudeDelta: 1.5,
                    }}
                >
                </MapView>
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
