const mongoose = require('mongoose');

const DB_URL = 'mongodb://127.0.0.1:27017/recruit';

const models = {
    user:{
        'user':{type:String,require:true},
        'pwd':{type:String,require:true},
        'type':{type:String,require:true},
        'avatar':{type:String,require:true},
        //resume
        'doc':{type:String},
        //offer
        'title':{type:String},
        //boss
        'company':{type:String},
        'money':{type:String},
    },
    message:{

    }
}

for(let model in models){
    mongoose.model(model,new mongoose.Schema(
        models[model]
    ))
}

class Database {
    connect() {
        mongoose.connect(DB_URL)
        mongoose.connection.on('connected', () => {
            console.log('mongoDB connect successfully');
        })
    }
    getModel(modelName){
        return mongoose.model(modelName)
    }
}

module.exports = Database;