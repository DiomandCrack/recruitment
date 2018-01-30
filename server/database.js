const mongoose = require('mongoose');

const DB_URL = 'mongodb://127.0.0.1:27017/recruit';

const User = mongoose.model('user', new mongoose.Schema({
    user: { type: String, require: true },
    age: { type: Number, require: true },
}));
//

// User.remove({}, (err, result) => {
//     console.log(err ? err : result)
// });
User.update({ 'user': 'xiaohua' }, { '$set': { age: 26 } }, (err, result) => {
    console.log(err ? err : result)
});
class Database {
    connect() {
        mongoose.connect(DB_URL)
        mongoose.connection.on('connected', () => {
            console.log('mongoDB connect successfully');
        })
    }
    createUser(user) {
        return new Promise((resolve, reject) => {
            User.create(user, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    }
    findUser(user) {
        console.log('find User', user)
        return new Promise((resolve, reject) => {
            User.find(user, (err, result) => {
                console.log(result);
                return err ? reject(err) : resolve(result);
            })
        });
    }
}

module.exports = Database;