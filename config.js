import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyD-a3Ydg8KXSzW3-DqzJhvjG6PyreR4zzs",
    authDomain: "uuuuuuuuuuu-1bdd8.firebaseapp.com",
    databaseURL: "https://uuuuuuuuuuu-1bdd8-default-rtdb.firebaseio.com",
    projectId: "uuuuuuuuuuu-1bdd8",
    storageBucket: "uuuuuuuuuuu-1bdd8.appspot.com",
    messagingSenderId: "1011820255746",
    appId: "1:1011820255746:web:c5166924236966429ea51b"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
export default firebase.database();