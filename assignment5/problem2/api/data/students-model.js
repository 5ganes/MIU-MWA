const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    level: Number
});

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    gpa: {
        type: Number,
        required: true
    },
    courses: {
        type: [courseSchema],
        required: true
    }
});

mongoose.model('Student', studentSchema, 'students');