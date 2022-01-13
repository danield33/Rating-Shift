import {initializeApp} from "firebase/app"
import {getFirestore} from "firebase/firestore"

const firebaseConfig = initializeApp({//not gonna throw this into an env b/c school project
    apiKey: "AIzaSyAR6UO4rw-SHEsiuUmhV-6BGx5Dfff2ij4",
    authDomain: "rating-shift.firebaseapp.com",
    projectId: "rating-shift",
    storageBucket: "rating-shift.appspot.com",
    messagingSenderId: "20114868150",
    appId: "1:20114868150:web:b51dc2e2f72afc8b716317",
    measurementId: "G-HGEFMV2CBC"
});

export const db = getFirestore(firebaseConfig);
