const Reviews = require("./subcollections/reviews/Reviews");

module.exports = class Application {

    _reviews;

    constructor(appData) {
        this.trackId = appData.trackId
        this.artworkUrl512 = appData.artworkUrl512
        this.averageUserRating = appData.averageUserRating
        this.userRatingCount = appData.userRatingCount
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

    }


    get reviews() {
        return this._reviews;
    }

}