const mongoose = require('mongoose');

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
    }
});

mongoose.model('User', userSchema, 'users');