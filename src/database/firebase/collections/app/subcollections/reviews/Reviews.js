const Review = require("./Review");
const {collection, getDocs} = require("firebase/firestore");
const {db} = require("../../../../index");
const ReviewSchema = require('./schema');
const {createUUID} = require("../../../../../../global/util");
module.exports = class Reviews{

    #app;
    constructor(reviewArr, app) {
        this.#app = app
        this.reviews = reviewArr.map((review) => {
            return new Review(review, app);
        });
        this.getSavedReviews();
    }

    add(rating, review, title, user){

        const reviewObj = Object.assign({}, ReviewSchema);
        const attribs = reviewObj.attributes;
        attribs.date = new Date().toISOString();
        attribs.rating = rating;
        attribs.review = review;
        attribs.userName = user.username;
        attribs.title = title
        reviewObj.id = createUUID('xxxxxxx');
        reviewObj.type = "RatingShift-User-Review";
        const newReview = new Review(reviewObj, this.#app);
        this.reviews.unshift(newReview);
        newReview.save();
        return newReview;

    }

    async getSavedReviews(){
        const subColRef = collection(db, 'apps', this.#app.trackId, 'reviews');
        const snap = await getDocs(subColRef);
        snap.docs.forEach(review => {
            this.reviews.unshift(new Review({id: review.id, ...review.data()}))
        });

    }

}