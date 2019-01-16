import firebase from 'firebase';

export const getAllEvent = (userId) => {
    var events = [];
    firebase.database().ref('event').on('value', (dataSnapshot) => {
        dataSnapshot.forEach((childSnapshot) => {
            var item = childSnapshot.val();
            events.push(item);
        });
    })
    return events;
}