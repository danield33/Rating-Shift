module.exports = {
    username: String,
    age: Number,
    activity: {
        ratings: {
            //trackId: ratingCount
        },
        reviews: {
            //trackId: [review ids]
        }
    }
}