const Reviews = require("./subcollections/reviews/Reviews");

module.exports = class Application {

    #_reviews;

    constructor(appData) {
        console.log('new app')
        Object.assign(this, appData);
        // this.#_reviews = new Reviews(appData.reviews, this);
        // console.log(this.trackCensoredName, this.reviews);
    }

    // get reviews(){
    //     // return this.reviews;
    //     console.log('get review')
    //     return this.#_reviews.reviews;
    // }

    static createApp(appData) {

    }

}