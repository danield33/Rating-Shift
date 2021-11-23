import FTMatters from "./42Matters";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut} from "firebase/auth";
import {getStorage, ref, uploadBytes} from "firebase/storage";

class RShift {

    ftMatters = new FTMatters();

    signOut() {
        const auth = getAuth();
        return new Promise((resolve, reject) => {
            signOut(auth).then(() => {
                resolve(true)
            }).catch(err => {
                reject(err)
            })
        })
    }

    logUserIn({email, password}) {
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

    async uploadProfilePicture(profilePicture, path) {
        const storage = getStorage();
        const pfpRes = await fetch(profilePicture);
        const picRef = ref(storage, path);
        const blob = await pfpRes.blob();
        uploadBytes(picRef, blob).then(r => console.log(r))
    }

    createAccount({username, email, password, pfp}) {
        const auth = getAuth();
        return new Promise((resolve, reject) => {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    if (pfp)
                        this.uploadProfilePicture(pfp, user.uid + '/pfp.jpg')
                    resolve(user);
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    reject([errorCode, errorMessage])
                });
        })
    }

}

export default new RShift();

export const errorCodes = {
    "auth/email-already-in-use": "Email is already in use! Please try again",
    "auth/wrong-password": "Invalid email or password",
    "auth/user-not-found": "Invalid email or password"
}
