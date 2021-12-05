import {db} from '../../index'
import {doc, getDoc, setDoc} from "firebase/firestore";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut} from "firebase/auth";
import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";

module.exports = class User {

    static users = new Map();

    #pfp;

    constructor({username, id, profilePictureURI}) {

        this.username = username;
        this.id = id;
        this.#pfp = profilePictureURI;


    }

    get pfp() {
        return this.#pfp
    }

    static async get(id) {

        const user = User.users.get(id);
        if (user) return user;

        const docRef = doc(db, 'users', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const user = new User(docSnap.data());
            User.users.set(user.id, user);
            return user;
        }
        return null;
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
                .then(async (userCredential) => {
                    const user = userCredential.user;
                    const data = await User.getUser(user.uid);
                    const user1 = new User(data);
                    User.users.set(user1.id, user1);
                    resolve(user1);
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
        fetch(profilePicture).then(async res => {// doesn't work on simulator
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

    async getProfilePicture() {
        const storage = getStorage();
        try {
            const url = await getDownloadURL(ref(storage, this.id + '/pfp.jpg'))
            this.#pfp = url;
            return url;
        } catch {
            return null;
        }

    }

    async save() {
        await setDoc(doc(db, 'users', this.id), JSON.parse(JSON.stringify(this)));
    }

}