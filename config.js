import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBi2KaNaP6DxEYQJ3CDimBHy1oiVnWY1UM",
    authDomain: "todo-20e3c.firebaseapp.com",
    projectId: "todo-20e3c",
    storageBucket: "todo-20e3c.appspot.com",
    messagingSenderId: "445680970495",
    appId: "1:445680970495:web:12eaced5071a4b27c97aca",
    measurementId: "G-0MG8LRW4FS"
  };

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };