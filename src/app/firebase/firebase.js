// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAtoiz_1agST96P3NwYqATTb6BRLt4La9A",
  authDomain: "cprg-306-project-a5233.firebaseapp.com",
  databaseURL: "https://cprg-306-project-a5233-default-rtdb.firebaseio.com",
  projectId: "cprg-306-project-a5233",
  storageBucket: "cprg-306-project-a5233.firebasestorage.app",
  messagingSenderId: "5528490539",
  appId: "1:5528490539:web:1869aad04808184b95506e",
  measurementId: "G-CG4DNSZKWB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app); 

export {app, auth, db};