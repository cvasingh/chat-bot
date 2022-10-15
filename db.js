var mongoose = require('mongoose');

//mongoDB url
const mongoUrl = require('./Config').mongoUrl;

//Attempt to connect to DB
mongoose.connect(mongoUrl).then(() => {
    console.log('mongoDB connect successfull');
}).catch((err) => {
    console.log(`mongoDB not connect ${err} `);
})

// userSchema
const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
    },
    lastname: {
        type: String,
    },
    phone: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    dob: {
        type: String,
    },
    lang: {
        type: String,
    },
    gender: {
        type: String,
    },
    messages: {
        type: Array,
    },
    role: {
        type: Number,
    },
})

//collection  
const User = new mongoose.model("User", userSchema);

module.exports =  {User}