import {db} from '../../index'
import {doc, getDoc, setDoc, updateDoc, deleteDoc} from "firebase/firestore";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut, deleteUser} from "firebase/auth";
import {getDownloadURL, getStorage, ref, uploadBytes, deleteObject} from "firebase/storage";
import DefaultUser from './schema'
import {Users} from "../../../index";

module.exports = class User {

    static users = new Map();

    #pfp;
    #ref;

    constructor({username, id, profilePictureURI, activity = {}}) {

        this.username = username;
        this.id = id;
        this.activity = activity;
        this.#pfp = profilePictureURI;
        this.#ref = doc(db, 'users', this.id);

    }

    async delete(){
        await deleteUser(getAuth().currentUser)
        await deleteDoc(doc(db, "users", this.id));
    }

    async addRating(trackId, ratingCount) {
        const {ratings} = this.activity;
        ratings[trackId] = ratingCount;
        await updateDoc(this.#ref, {
            activity: this.activity
        });
    }

    async addReview(trackId, review) {

        const reviews = this.activity.reviews[trackId] || [];
        reviews.unshift(review.id);

        this.activity.reviews[trackId] = reviews;

        await updateDoc(this.#ref, {
            activity: this.activity
        })

        this.addRating(trackId, review.attributes.rating);

    }

    async setUsername(name) {
        this.username = name;
        await updateDoc(this.#ref, {
            username: name
        })
    }

    async deleteProfilePicture(){
        const picRef = ref(getStorage(), this.id+'/pfp.jpg');
        await deleteObject(picRef)

    }

    async setProfilePicture(fileURI) {
        this.#pfp = fileURI;
        await User.uploadProfilePicture(fileURI, this.id + '/pfp.jpg')
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
        await setDoc(this.#ref, JSON.parse(JSON.stringify(this)));
    }

    get pfp() {
        return this.#pfp
    }

    static async get(id) {

        const user = User.users.get(id);
        if (user) return Promise.resolve(user);

        const docRef = doc(db, 'users', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const user = new User(docSnap.data());
            User.users.set(user.id, user);
            return Promise.resolve(user);
        }
        return Promise.resolve(null);
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
                    const data = await User.get(user.uid);
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

    static async uploadProfilePicture(profilePicture, path) {
        const storage = getStorage();
        const picRef = ref(storage, path);
        const res = await fetch(profilePicture);
        (await res).blob().then(blob => {
            uploadBytes(picRef, blob)
        })

    }

    static createAccount({username, email, password, pfp}) {
        const auth = getAuth();
        return new Promise((resolve, reject) => {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    if (pfp)
                        User.uploadProfilePicture(pfp, user.uid + '/pfp.jpg');

                    const defaultUser = JSON.parse(JSON.stringify(DefaultUser));
                    defaultUser.username = username;
                    defaultUser.id = user.uid;
                    defaultUser.profilePictureURI = pfp;
                    const user1 = new User(defaultUser);
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