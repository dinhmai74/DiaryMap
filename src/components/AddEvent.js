import React, { Component } from 'react'
import { Text, View, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, Platform } from 'react-native'
import firebase from 'firebase'
import ImagePicker from 'react-native-image-picker';
import CustomCard from './ui/CustomCard'
import MapView, { Marker } from 'react-native-maps'
import RNGooglePlaces from 'react-native-google-places';
import Icon from 'react-native-vector-icons/FontAwesome5';
import DateTimePicker from 'react-native-modal-datetime-picker';
import RNFetchBlob from 'rn-fetch-blob';
import moment from 'moment';
import { Actions } from 'react-native-router-flux';
import { ProgressDialog } from 'react-native-simple-dialogs';

const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

const options = {
    title: 'Select Image',
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};

class AddEvent extends Component {
    constructor(props) {
        super(props)
        this.eventRef = firebase.database().ref('event')
        this.mapRef = null;
        this.imagePath = '';

        this.state = {
            itemid: '',
            coordinate: null,
            imageurl: '',
            address: '',
            text: '',
            time: moment().format(),
            title: '',
            userid: firebase.auth().currentUser.uid,
            uri: require('../assets/default-photo.jpg'),

            isDateTimePickerVisible: false,
            disabled: false,
            progressVisible: false
        }
    }

    render() {
        return (
            <View style={{ paddingTop: 58, padding: 5, flex: 1 }}>
            <ProgressDialog 
                visible={this.state.progressVisible} 
                title="Creating event" 
                message="Please wait..."
            />
                <ScrollView>
                    <CustomCard title={'TITLE'} style={{ marginVertical: 5 }}>
                        <TextInput
                            placeholder={'Title...'}
                            textAlignVertical={'top'}
                            onChangeText={(text) => this.setState({ title: text })}
                            editable={!this.props.disabled} />
                    </CustomCard>
                    <CustomCard title={'CONTENT'} style={{ marginVertical: 5 }}>
                        <TextInput
                            placeholder={'Write here...'}
                            multiline
                            textAlignVertical={'top'}
                            numberOfLines={4}
                            onChangeText={(texti) => this.setState({ text: texti })}
                            editable={!this.props.disabled} />
                    </CustomCard>
                    <CustomCard title={'TIME'} style={{ marginVertical: 5 }}>
                        <TouchableOpacity
                            onPress={this._showDateTimePicker}
                            style={{ flexDirection: 'row', alignItems: 'center' }}
                            disabled={this.props.disabled}
                        >
                            <Icon name='clock' style={{ marginRight: 3, color: 'black' }} />
                            <Text>{moment(this.state.time).format('hh:mm a')}</Text>
                            <Icon name='calendar-alt' style={{ marginRight: 3, marginLeft: 10, color: 'black' }} />
                            <Text>{moment(this.state.time).format('DD MMM YYYY')}</Text>
                        </TouchableOpacity>
                        <DateTimePicker
                            isVisible={this.state.isDateTimePickerVisible}
                            onConfirm={this._handleDatePicked}
                            onCancel={this._hideDateTimePicker}
                            mode='datetime'
                        />
                    </CustomCard>
                    <CustomCard title={'PHOTO'} style={{ marginVertical: 5 }}>
                        <Image
                            source={this.state.uri}
                            style={{ width: 300, height: 200, resizeMode: 'contain', alignSelf: 'center', borderRadius: 10 }}
                            onPress={this.openImagePicker} />
                        <TouchableOpacity
                            style={styles.buttonContainer}
                            onPress={this.openImagePicker}
                            disabled={this.props.disabled}
                        >
                            <Text style={styles.buttonText}>Choose a photo</Text>
                        </TouchableOpacity>
                    </CustomCard>
                    <CustomCard title={'POSITION'} >
                        <TouchableOpacity
                            style={styles.mapContainer}
                            onPress={this.openSearchModal}
                            disabled={this.props.disabled}
                        >
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }} >
                                <Icon name='map-marker-alt' style={{ marginRight: 4, marginLeft: 2, marginBottom: 5 }} />
                                <TextInput
                                    placeholder={'Place\'s name...'}
                                    textAlignVertical={'top'}
                                    value={this.state.address}
                                    onChangeText={(text) => this.setState({ address: text })}
                                    editable={!this.props.disabled} />
                            </View>
                            <MapView
                                style={styles.map}
                                scrollEnabled={false}
                                ref={(ref) => { this.mapRef = ref }}
                                region={{
                                    latitude: this.state.coordinate ? this.state.coordinate.latitude : 16,
                                    longitude: this.state.coordinate ? this.state.coordinate.longitude : 105,
                                    latitudeDelta: this.state.coordinate ? 1 : 10,
                                    longitudeDelta: this.state.coordinate ? 1 : 10,
                                }} >
                                {this.state.coordinate != null && [this.state.coordinate].map(coords=>(<MapView.Marker coordinate={coords} />))}
                            </MapView>
                        </TouchableOpacity>
                    </CustomCard>
                    <TouchableOpacity
                        style={styles.buttonContainer}
                        onPress={this.onPressSubmit}
                        disabled={this.props.disabled}
                    >
                        <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        )
    }

    openImagePicker = () => {
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                alert('User cancelled image picker');
            } else if (response.error) {
                alert('ImagePicker Error: ', response.error);
            } else {
                this.setState({ uri: { uri: 'data:image/jpeg;base64,' + response.data } });
                this.imagePath = response.path;
            }
        })
    }

    openSearchModal = () => {
        RNGooglePlaces.openPlacePickerModal()
            .then((place) => {
                // place represents user's selection from the
                // suggestions and it is a simplified Google Place object.
                this.setState({
                    coordinate: {
                        latitude: place.latitude,
                        longitude: place.longitude
                    },
                    address: place.address,
                });
            })
            .catch(error => console.log(error.message));  // error is a Javascript Error object
    }

    _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

    _handleDatePicked = (date) => {
        this.setState({ time: moment(date).format() });
        this._hideDateTimePicker();
    };

    uploadImage = (uri, mime = 'image/jpeg', name) => {
        if(this.imagePath == '')
            return true;

        let imgUri = uri; let uploadBlob = null;
        const uploadUri = Platform.OS === 'ios' ? imgUri.replace('file://', '') : imgUri;
        const imageRef = firebase.storage().ref('image/' + name)

        return fs.readFile(uploadUri, 'base64')
            .then(data => {
                return Blob.build(data, { type: `${mime};BASE64` });
            })
            .then(blob => {
                uploadBlob = blob;
                return imageRef.put(blob, { contentType: mime, name: name });
            })
            .then(() => {
                uploadBlob.close()
                return imageRef.getDownloadURL();
            })
            .then(url => {
                this.setState({ imageurl: url });
            })
    }

    onPressSubmit = () => {
        this.setState({ disabled: true, progressVisible: true })
        eventRef = firebase.database().ref('event/');
        var newEvent = eventRef.push();
        return new Promise((resolve, reject) => {
            var up = this.uploadImage(this.imagePath, 'image/jpeg', newEvent.key + '.png');
            up.then(() => {
                newEvent.set({
                    itemid: newEvent.key,
                    coordinate: this.state.coordinate,
                    imageurl: this.state.imageurl,
                    address: this.state.address,
                    text: this.state.text,
                    time: moment(this.state.time).format(),
                    title: this.state.title,
                    userid: this.state.userid
                })
                .then(() => { 
                    this.setState({ disabled: false, progressVisible: false })
                    Actions.tabs();
                })
                .then(()=>{alert('Memory added')});
            })
        })


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
    buttonText: {
        fontSize: 17,
        color: 'white'
    },
    mapContainer: {
        alignItems: 'center',
        margin: 5
    },
    map: {
        width: 320,
        height: 150
    },
})

export default AddEvent;
