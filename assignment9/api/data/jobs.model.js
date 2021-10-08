const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    coordinates: {
        type: [String],
        required: true
    }
});
const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    location: locationSchema,
    description: String,
    experience: String,
    skills: [String],
    postDate: Date
});

mongoose.model('Job', jobSchema, 'jobs');