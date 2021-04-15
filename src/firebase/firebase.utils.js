import firebase from "firebase/app";

import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBP1YCUaV-ASmF_BPA_IWwRSPKjSwrYSYw",
  authDomain: "crown-db-f2d18.firebaseapp.com",
  projectId: "crown-db-f2d18",
  storageBucket: "crown-db-f2d18.appspot.com",
  messagingSenderId: "31047909875",
  appId: "1:31047909875:web:abcf3d121a84cb8d6d9286",
  measurementId: "G-7Q3598GTWT",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
