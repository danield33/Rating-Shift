// const {RShift} = require('../../../index')
import RShift from '../../../index';

module.exports = class Apps {

    static apps = new Map();

    get(trackId, callback) {
        if (this.apps.has(trackId)) {
            callback(this.apps.get(trackId));
            return new AbortController();
        } else {
            return RShift.api.get(trackId, (app) => {
                this.apps.set(trackId, app);
                callback(app);
            });

        }

    }

    get apps() {
        return Apps.apps;
    }

}
