import { getApp, getApps, initializeApp } from "firebase/app";
import {getMessaging, getToken, isSupported} from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyBWOyAr55R84CTjRw_pZBbb-c49934WmMU",
    authDomain: "mwonya-mobile.firebaseapp.com",
    databaseURL: "https://mwonya-mobile-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "mwonya-mobile",
    storageBucket: "mwonya-mobile.appspot.com",
    messagingSenderId: "711054634569",
    appId: "1:711054634569:web:a087cbf00ce4a4e5db5998",
    measurementId: "G-QMPMKGPZYP"
  };


const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();


const messaging = async () => {
    const supported = await isSupported();
    return supported ? getMessaging(app) : null;
};


export const fetchToken = async () => { 
try {
    
} catch (error) {
    
}
}

