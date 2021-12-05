import {db} from "../../index";

const Reviews = require("./subcollections/reviews/Reviews");
import { doc, updateDoc, getDoc, setDoc } from "firebase/firestore";
import {averageUserRating} from "./schema";

module.exports = class Application {

    _reviews;

    constructor(appData) {
        this.trackId = appData.trackId
        this.artworkUrl512 = appData.artworkUrl512
        this.formattedPrice = appData.formattedPrice
        this.price = appData.price
        this.description = appData.description
        this.fileSizeBytesNumeric = appData.fileSizeBytesNumeric
        this.screenshotUrls = appData.screenshotUrls
        this.trackCensoredName = appData.trackCensoredName
        this.primaryGenreId = appData.primaryGenreId
        this.lang = appData.lang
        this.i18n_lang = appData.i18n_lang
        this.subtitle = appData.subtitle
        this.artistName = appData.artistName
        this._reviews = new Reviews(appData.reviews, this);
        this.averageUserRating = appData.averageUserRating
        this.userRatingCount = appData.userRatingCount

    }

    async waitForData(){
        const docRef = doc(db, 'apps', this.trackId);
        const snap = await getDoc(docRef);
        if(snap.exists()){
            Object.assign(this, snap.data())
        }
    }

    async addRating(ratingCount, user){
        if(ratingCount){//checks for 0
            this.userRatingCount++;
            this.averageUserRating = (this.averageUserRating * this.userRatingCount + ratingCount)/this.userRatingCount;
            const appRef = doc(db, 'apps', this.trackId);
            const docSnap = await getDoc(appRef);

            if(!docSnap.exists()) await this.createDoc();
            await updateDoc(appRef, {
                userRatingCount: this.userRatingCount,
                averageUserRating: this.averageUserRating
            });
        }
    }

    async createDoc(){
        await setDoc(doc(db, 'apps', this.trackId), {
            averageUserRating: this.averageUserRating,
            userRatingCount: this.userRatingCount
        })
    }

    get reviews() {
        return this._reviews;
    }

}