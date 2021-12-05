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

    add(rating, review, user){

        const reviewObj = {...ReviewSchema};
        const attribs = reviewObj.attributes;
        attribs.data = new attribs.date().toISOString();
        attribs.isEdited = attribs.isEdited(false);
        attribs.rating = attribs.rating(rating);
        attribs.review = attribs.review(review);
        reviewObj.id = createUUID('xxxxxxx');
        reviewObj.type = "RatingShift-User-Review";
        const newReview = new Review(reviewObj);
        this.reviews.unshift(newReview);
        newReview.save();
        return newReview;

    }

    async getSavedReviews(){
        const subColRef = collection(db, 'apps', this.#app.trackId, 'reviews');
        const snap = await getDocs(subColRef);
        const reviews = snap.docs.map(review => {
            return (new Review({id: review.id, ...review.data()}))
        });

        this.reviews = reviews.concat(this.reviews);
    }

}