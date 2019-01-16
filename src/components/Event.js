import React, { Component } from 'react'
import { Text, View, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, Dimensions, ImageBackground } from 'react-native'
import firebase from 'firebase'
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome5';
import moment from 'moment';
import { Actions, ActionConst } from 'react-native-router-flux';
import DeleteButton from './ui/DeleteButton';
import { ConfirmDialog, ProgressDialog } from 'react-native-simple-dialogs';

const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thusday', 'Friday', 'Saturday']

class Event extends Component {
    constructor(props) {
        super(props)
        this.mapRef = null;
        this.state={
            dialogVisible: false,
            progressVisible: false,
            isImageViewVisible: false
        }
    }

    pressImage = () => {
        this.setState({isImageViewVisible: true})
    }

    pressDelete = () => {
        this.setState({dialogVisible: true})
    }

    deleteEvent = () => {
        this.setState({dialogVisible: false, progressVisible: true});
        return new Promise((resolve, reject) => {
            var del = firebase.database().ref('event/' + this.props.item.itemid).remove();
            del.then(() => {
                this.setState({dialogVisible: false, progressVisible: false});
                Actions.tabs();
            })
            .then(()=>{alert('Memory deleted')})
        })
    }

    render() {
        const item = this.props.item;
        return (
            <View style={{ paddingTop: 50, flex: 1, height: '100%' }}>
                <ProgressDialog 
                    visible={this.state.progressVisible} 
                    title="Creating event" 
                    message="Please wait..."
                />
                <ConfirmDialog
                    title="Deleting memory"
                    message="Are you sure to delete?"
                    visible={this.state.dialogVisible}
                    onTouchOutside={() => this.setState({dialogVisible: false})}
                    positiveButton={{
                        title: "YES",
                        onPress: this.deleteEvent
                    }}
                    negativeButton={{
                        title: "NO",
                        onPress: () => this.setState({dialogVisible: false})
                    }} />
                <ScrollView>
                    <TouchableOpacity onpress={this.pressImage}>
                        <ImageBackground
                            source={{ uri: item.imageurl }}
                            style={styles.image}
                            resizeMethod={'resize'} />
                    </TouchableOpacity>
                    <View style={{height: 5, backgroundColor: '#d13aff', width: '100%', marginBottom: 10}} />
                    <View style={styles.contentContainer}>
                        <DeleteButton style={{top: -32, right: 10}} onPress={this.pressDelete}/>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={{fontSize: 40, marginRight: 10}}>{moment(item.time).format('DD')}</Text>
                            <View style={{flexDirection: 'column', justifyContent: 'flex-end'}}>
                                <Text style={{fontSize: 14}}>{weekdays[moment(item.time).day()]}</Text>
                                <Text style={{fontSize: 14}}>{moment(item.time).format('MMMM YYYY').toUpperCase()}</Text>
                            </View>
                            <View style={{marginLeft: 'auto', marginRight: 85}}>
                                <Text style={{fontSize: 16, fontWeight: 'bold', position: 'absolute', bottom: -3}}>{moment(item.time).format('hh')}</Text>
                                <Text style={{fontSize: 16, fontWeight: 'bold', position: 'absolute', top: -1}}>{moment(item.time).format('mm')}</Text>
                            </View>
                            <Text style={{fontSize: 40, position: 'absolute', right: 0}}>{moment(item.time).format('a').toUpperCase()}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                            <Icon name='map-marker-alt' style={{ marginRight: 4, marginLeft: 2, marginTop: 4 }} />
                            <Text style={styles.text}>{item.address}</Text>
                        </View>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.text}>{item.text}</Text>
                        <MapView
                                style={styles.map}
                                scrollEnabled={false}
                                ref={(ref) => { this.mapRef = ref }}
                                region={{
                                    latitude: item.coordinate ? item.coordinate.latitude : 16,
                                    longitude: item.coordinate ? item.coordinate.longitude : 105,
                                    latitudeDelta: item.coordinate ? 1 : 10,
                                    longitudeDelta: item.coordinate ? 1 : 10,
                                }} >
                                {item.coordinate != null && [item.coordinate].map(coords=>(<MapView.Marker coordinate={coords} />))}
                            </MapView>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    buttonContainer: {
        borderColor: 'white',
        borderRadius: 50,
        padding: 3,
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        margin: 5,
        backgroundColor: '#26d6f2',
    },
    image: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width / 3 * 2,
        resizeMode: 'cover'
    },
    buttonText: {
        fontSize: 17,
        color: 'white'
    },
    mapContainer: {
        alignItems: 'center',
        margin: 5
    },
    map: {
        width: Dimensions.get('window').width - 30,
        height: 150, 
        marginVertical: 10,
        elevation: 10
    },
    contentContainer: {
        marginHorizontal: 15
    },
    title: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#15d1ef',
        marginTop: 10,
        marginBottom: 5
    },
    text: {
        fontSize: 13,
        textAlign: 'justify'
    }
})

export default Event;
