import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const config = {
    apiKey: "AIzaSyC7XWAfHvHywiWVWqOaXfwNCiQCMcTqihg",
    authDomain: "crwn-db-250de.firebaseapp.com",
    projectId: "crwn-db-250de",
    storageBucket: "crwn-db-250de.appspot.com",
    messagingSenderId: "167352422913",
    appId: "1:167352422913:web:1221204378952d767fa600",
    measurementId: "G-HWPS1VVFCQ"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;