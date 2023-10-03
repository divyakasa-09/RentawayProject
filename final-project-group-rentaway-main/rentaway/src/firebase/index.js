// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBn7G6qmfr84hGT4nOfzDJVH5oD5E_tzJM",
  authDomain: "rentaway-0913.firebaseapp.com",
  projectId: "rentaway-0913",
  storageBucket: "rentaway-0913.appspot.com",
  messagingSenderId: "396634611277",
  appId: "1:396634611277:web:b942df0b5ff20e697c0604",
  measurementId: "G-HHSV9ESGC9"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


const storage = firebase.storage();

export{
    storage, firebase as default
}