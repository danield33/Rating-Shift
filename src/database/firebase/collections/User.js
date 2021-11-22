import {db} from '../index'
import { collection, addDoc, getDocs } from "firebase/firestore";

module.exports = class User {

    constructor() {

    }

    async save() {
        const docRef = await addDoc(collection(db, 'users'), JSON.parse(JSON.stringify(this)));
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`);
        });
    }


}