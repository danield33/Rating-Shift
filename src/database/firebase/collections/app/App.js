import {db} from "../../index";
import {doc, getDoc, setDoc, updateDoc} from "firebase/firestore";

const Reviews = require("./subcollections/reviews/Reviews");

/**
 * A class to manage and manipulate information about an app
 * @type {Application}
 */
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

    /**
     * Waits for data from the database and assign it to this object
     * @returns {Promise<void>}
     */
    async waitForData() {
        const snap = await getDoc(this.#ref);
        if (snap.exists()) {
            Object.assign(this, snap.data())
        }
    }

    /**
     * Computes a new rating to the app whenever someone changes their rating
     * @param oldRatingCount the rating count before the change
     * @param newRatingCount the the new rating given
     * @returns {Promise<void>}
     */
    async replaceSingleRating(oldRatingCount, newRatingCount) {
        this.averageUserRating = (this.averageUserRating * this.userRatingCount - oldRatingCount + newRatingCount) / this.userRatingCount;
        this.updateRatings();
    }

    /**
     * Creates a new rating from a user to this app
     * @param ratingCount the rating given
     * @returns {Promise<void>}
     */
    async addRating(ratingCount) {
        if (ratingCount) {//needed in order to check for 0
            this.userRatingCount++;
            this.averageUserRating = (this.averageUserRating * this.userRatingCount + ratingCount) / this.userRatingCount;
            this.updateRatings();
        }
    }

    /**
     * Updates the userRatingCount and averageUserRating of this app and saves it to firebase
     * @returns {Promise<void>}
     */
    async updateRatings() {
        const docSnap = await getDoc(this.#ref);

        if (!docSnap.exists()) await this.createDoc();
        await updateDoc(this.#ref, {
            userRatingCount: this.userRatingCount,
            averageUserRating: this.averageUserRating
        });
    }

    /**
     * Creates a new document in firebase to store information
     * @returns {Promise<void>}
     */
    async createDoc() {
        await setDoc(this.#ref, {
            averageUserRating: this.averageUserRating,
            userRatingCount: this.userRatingCount
        })
    }

    /**
     * Gets the review information saved in firebase and the appstore
     * @returns {*}
     */
    get reviews() {
        return this._reviews;
    }

}
