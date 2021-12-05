const {db} = require("../../../../index");
import { doc, getDocs, collection, setDoc } from "firebase/firestore";
module.exports = class Review{

    #app;
    id;
    type;
    attributes;
    constructor(reviewData, app) {
        this.#app = app;
        Object.assign(this, reviewData);
    }

    async save() {
        await setDoc(doc(db, 'apps/'+this.#app.trackId+'/reviews', this.id), JSON.parse(JSON.stringify(this)));
    }

}