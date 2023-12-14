import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: process.env.FIREBASE_ENV_KEY,
    authDomain: "dropbox-db60e.firebaseapp.com",
    projectId: "dropbox-db60e",
    storageBucket: "dropbox-db60e.appspot.com",
    messagingSenderId: "882249613592",
    appId: "1:882249613592:web:92791b2055c2e0c0f25e6d"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app)
const storage = getStorage(app)

export { db, storage }