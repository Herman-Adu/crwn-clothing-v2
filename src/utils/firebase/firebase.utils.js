import { initializeApp } from "firebase/app";

import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwxEEGG8LCryp4-KbZoFfv-YX5_YYR_jo",
  authDomain: "crwn-clothing-v2-db-38f14.firebaseapp.com",
  projectId: "crwn-clothing-v2-db-38f14",
  storageBucket: "crwn-clothing-v2-db-38f14.appspot.com",
  messagingSenderId: "832186267962",
  appId: "1:832186267962:web:a4b58fcbfd7544f1d1b803",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = { displayName: "mike" }
) => {
  // check if there is a doc Ref
  const userDocRef = doc(db, "users", userAuth.uid);

  console.log(userDocRef);

  // get data releated to a document
  const userSnapshot = await getDoc(userDocRef);

  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  // check if a user exist
  if (!userSnapshot.exists()) {
    // no user exists

    // destructor email and name from the useAuth object
    const { displayName, email } = userAuth;

    // create a new date object
    const createdAt = new Date();

    // set the document using a try block asynchronously using the userDocRef object
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  // user exist
  return userDocRef;
};

// create user with email and password
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

// sign in user with email and password
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};
