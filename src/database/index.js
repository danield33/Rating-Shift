import FTMatters from "./42Matters";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

class RShift {

    ftMatters = new FTMatters();

    createAccount({username, email, password}){
        const auth = getAuth();
        return new Promise((resolve, reject) => {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
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
    "auth/email-already-in-use": "Email is already in use! Please try again"
}
