const Review = require("./Review");
module.exports = class Reviews{

    #app;
    constructor(reviewArr, app) {
        this.#app = app
        this.reviews = reviewArr.map((review) => {
            return new Review(review);
        });
    }

    add(rating, review, user){
        this.reviews[0].save();
    }

}