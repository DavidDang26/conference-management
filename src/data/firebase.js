import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";

const config = {
    apiKey: "AIzaSyCFDtilLLCLJ2SKTC6U1gavJsMnYUlg7Us",
    authDomain: "learn-fb-a116f.firebaseapp.com",
    projectId: "learn-fb-a116f",
    storageBucket: "learn-fb-a116f.appspot.com",
    messagingSenderId: "920113807228",
    appId: "1:920113807228:web:f2ef6ed3dfe39913e4aef9",
    measurementId: "G-MLP04WT8X1",
    databaseURL: "https://learn-fb-a116f-default-rtdb.asia-southeast1.firebasedatabase.app",
};

const app = firebase.initializeApp(config);

export const auth = firebase.auth();
export const db = firebase.database(app);
export const provider = new firebase.auth.GoogleAuthProvider();
