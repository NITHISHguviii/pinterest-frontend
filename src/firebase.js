// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCzx3dq2RKD3YQ7udnmFBT7y7dpAjpAwmc",
  authDomain: "pinterest-siva.firebaseapp.com",
  projectId: "pinterest-siva",
  storageBucket: "pinterest-siva.appspot.com",
  messagingSenderId: "229795027591",
  appId: "1:229795027591:web:0da84dd7869feed12f7622",
  measurementId: "G-8C77SFEFY6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export { app, storage };