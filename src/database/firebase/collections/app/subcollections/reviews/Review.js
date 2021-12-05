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

        await setDoc(doc(db, 'apps/reviews', this.id), JSON.parse(JSON.stringify(this)));
        const subColRef = collection(db, 'apps', this.#app.trackId, 'reviews');
        const snap = await getDocs(subColRef);
        console.log(snap.docs.map(d => ({id: d.id, ...d.data()})));
    }

}