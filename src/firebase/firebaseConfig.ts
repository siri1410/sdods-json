import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Firebase configuration object
// Contains necessary credentials and identifiers for the Firebase project
const firebaseConfig = {
    apiKey: "AIzaSyBnFN5ZtIZup5nO_ivgS6rbtue11sv8EiQ",
    authDomain: "sdods-json.firebaseapp.com",
    databaseURL: "https://sdods-json-default-rtdb.firebaseio.com",
    projectId: "sdods-json",
    storageBucket: "sdods-json.appspot.com",
    messagingSenderId: "129989505589",
    appId: "1:129989505589:web:324ef834c15a482d19f77c"
};

// Initialize Firebase app with the configuration
const app = initializeApp(firebaseConfig);

// Get Firebase Authentication instance
export const auth = getAuth(app);

// Create Google Auth Provider for Google Sign-In
export const googleProvider = new GoogleAuthProvider();
// Get Firestore instance
export const db = getFirestore(app);
