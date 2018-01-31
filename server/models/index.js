const User = require('./user');

class Models {
    constructor(app) {
        this.user = new User(app);
    }
}

module.exports = Models