import firebase from '@firebase/app'
require('@firebase/auth');
require('@firebase/database');

var config = {
    apiKey: "AIzaSyB8IK_isvYK1lwK2lbn9rQPFa2nmpwhqOo",
    authDomain: "diarymap-c8d23.firebaseapp.com",
    databaseURL: "https://diarymap-c8d23.firebaseio.com",
    projectId: "diarymap-c8d23",
    storageBucket: "diarymap-c8d23.appspot.com",
    messagingSenderId: "381924913168"
};

export const firebaseApp = firebase.default.initializeApp(config);