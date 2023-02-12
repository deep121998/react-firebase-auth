import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyB8Oyi3Sm8u0R7kesKjyWC4QQSiyBofLRI',
  authDomain: 'react-firebase-auth-64d24.firebaseapp.com',
  databaseURL: 'https://react-firebase-auth-64d24.firebaseio.com',
  projectId: 'react-firebase-auth-64d24',
  storageBucket: 'react-firebase-auth-64d24.appspot.com',
  messagingSenderId: '286543050134',
  appId: '1:286543050134:web:6e23596d07702159c319b7',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const createUserDocument = async (user, additionalData) => {
  if (!user) return;

  const userRef = firestore.doc(`users/${user.uid}`);

  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { email } = user;
    const { displayName } = additionalData;

    try {
      await userRef.set({
        displayName,
        email,
        createdAt: new Date(),
      });
    } catch (error) {
      console.log('Error in creating user', error);
    }
  }
};
