import {db} from '../../index'
import {addDoc, collection, getDocs} from "firebase/firestore";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut} from "firebase/auth";
import {getStorage, ref, uploadBytes} from "firebase/storage";

module.exports = class User {

    static users = new Map();

    constructor({username, id, profilePictureURI}){

        this.username = username;
        this.id = id;
        this.pfp = profilePictureURI;


    }

    async save() {
        await addDoc(collection(db, 'users'), JSON.parse(JSON.stringify(this)));
    }

    static signOut() {
        const auth = getAuth();
        return new Promise((resolve, reject) => {
            signOut(auth).then(() => {
                resolve(true)
            }).catch(err => {
                reject(err)
            })
        })
    }

    static logUserIn({email, password}) {
        const auth = getAuth();
        return new Promise((resolve, reject) => {
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    resolve(user);
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    reject([errorCode, errorMessage]);
                });
        })
    }

    static uploadProfilePicture(profilePicture, path) {
        const storage = getStorage();
        const picRef = ref(storage, path);
        fetch(profilePicture).then(async res => {
            console.log()//TODO remove this
            (await res).blob().then(blob => {
                uploadBytes(picRef, blob)
            })
        })

    }

    static createAccount({username, email, password, pfp}) {
        const auth = getAuth();
        return new Promise((resolve, reject) => {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    if (pfp)
                        User.uploadProfilePicture(pfp, user.uid + '/pfp.jpg')
                    const user1 = new User({id: user.uid, username, profilePictureURI: pfp});
                    User.users.set(user1.id, user1);
                    user1.save();
                    resolve(user1);
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    reject([errorCode, errorMessage])
                });
        })
    }

}