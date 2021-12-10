import {db} from "../../index";
import {doc, getDoc, setDoc, updateDoc} from "firebase/firestore";
import {averageUserRating} from "./schema";

const Reviews = require("./subcollections/reviews/Reviews");

module.exports = class Application {

    _reviews;
    #ref;

    constructor(appData) {
        this.trackId = appData.trackId;
        this.artworkUrl512 = appData.artworkUrl512;
        this.formattedPrice = appData.formattedPrice;
        this.price = appData.price;
        this.description = appData.description;
        this.fileSizeBytesNumeric = appData.fileSizeBytesNumeric;
        this.screenshotUrls = appData.screenshotUrls;
        this.trackCensoredName = appData.trackCensoredName;
        this.primaryGenreId = appData.primaryGenreId;
        this.lang = appData.lang;
        this.i18n_lang = appData.i18n_lang;
        this.subtitle = appData.subtitle;
        this.artistName = appData.artistName;
        this._reviews = new Reviews(appData.reviews, this);
        this.averageUserRating = appData.averageUserRating;
        this.userRatingCount = appData.userRatingCount;
        this.contentAdvisoryRating = appData.contentAdvisoryRating;
        this.#ref = doc(db, 'apps', this.trackId);
    }

    async waitForData() {
        const snap = await getDoc(this.#ref);
        if (snap.exists()) {
            Object.assign(this, snap.data())
        }
    }

    async replaceSingleRating(oldRatingCount, newRatingCount) {
        this.averageUserRating = (this.averageUserRating * this.userRatingCount - oldRatingCount + newRatingCount) / this.userRatingCount;
        this.updateRatings();
    }

    async addRating(ratingCount) {
        if (ratingCount) {//checks for 0
            this.userRatingCount++;
            this.averageUserRating = (this.averageUserRating * this.userRatingCount + ratingCount) / this.userRatingCount;
            this.updateRatings();
        }
    }

    async updateRatings() {
        const docSnap = await getDoc(this.#ref);

        if (!docSnap.exists()) await this.createDoc();
        await updateDoc(this.#ref, {
            userRatingCount: this.userRatingCount,
            averageUserRating: this.averageUserRating
        });
    }

    async createDoc() {
        await setDoc(this.#ref, {
            averageUserRating: this.averageUserRating,
            userRatingCount: this.userRatingCount
        })
    }

    get reviews() {
        return this._reviews;
    }

}