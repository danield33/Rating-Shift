import API from "./api";
import User from './firebase/collections/user/User'
import Apps from './firebase/collections/apps'

class RShift {

    api = new API();
    apps = new Apps();

}

export const errorCodes = {
    "auth/email-already-in-use": "Email is already in use! Please try again",
    "auth/wrong-password": "Invalid email or password",
    "auth/user-not-found": "Invalid email or password"
}

export {User as Users}
export default new RShift();
