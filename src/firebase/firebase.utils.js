import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { useRef } from 'react';


const config = {
    apiKey: "AIzaSyC7XWAfHvHywiWVWqOaXfwNCiQCMcTqihg",
    authDomain: "crwn-db-250de.firebaseapp.com",
    projectId: "crwn-db-250de",
    storageBucket: "crwn-db-250de.appspot.com",
    messagingSenderId: "167352422913",
    appId: "1:167352422913:web:1221204378952d767fa600",
    measurementId: "G-HWPS1VVFCQ"
};

export const createUserProfileDocument = async(userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`/users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists) {
        const {displayName, email} = userAuth;
        const createAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createAt,
                ...additionalData
            });    
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
}

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    
    const batch = firestore.batch(); //to ack if the set is failed

    objectsToAdd.forEach(object => {
        const newDocRef = collectionRef.doc(); //no arguement -> random key

        batch.set(newDocRef, object);
    });

    return await batch.commit();
}

export const convertCollectionsSnapshotToMap = (collections) => {
    const transformedCollection = collections.docs.map(doc => {
        const {title, items} = doc.data();
        return {
            routeName : encodeURI(title.toLowerCase()),
            id : doc.id,
            title,
            items
        }
    });
    return transformedCollection.reduce((acc, collection) => {
        acc[collection.title.toLowerCase()] = collection;
        return acc;
    },{});
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;