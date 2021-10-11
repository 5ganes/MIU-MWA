const mongoose = require('mongoose');

const socialMediaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    noOfFollowers: Number
});

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        min: 20,
        max: 100,
        required: true
    },
    socialMedias: [socialMediaSchema]
});

mongoose.model('User', userSchema, 'users');