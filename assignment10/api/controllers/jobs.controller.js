const mongoose = require('mongoose');

const Job = mongoose.model('Job');

const getAll = function (req, res) {
    let offset = 0;
    let count = 5;
    const maxCount = 15;
    if (req.query) {
        if (req.query.offset)
            offset = parseInt(req.query.offset);
        if (req.query.count)
            count = parseInt(req.query.count);
        if (isNaN(offset) || isNaN(count)) {
            res.status(400).json({
                err: "Please enter valid URL"
            });
            return;
        }
        if (count > maxCount) {
            res.status(400), json({
                msg: "Can not exceed max of " + maxCount
            });
            return;
        }
        Job.find().skip(offset).limit(count).exec(function (err, jobs) {
            if (err) {
                res.status(500).json(err);
            }
            else if (jobs.length == 0) {
                res.status(400).json({
                    msg: "No jobs found"
                });
            }
            else {
                res.status(200).json(jobs);
            }
        });
    }
}

const findOne = function (req, res) {
    const jobId = req.params.jobId;
    if (!mongoose.isValidObjectId(jobId)) {
        res.status(400).json({
            message: "Given jobId is not valid"
        });
        return;
    }
    Job.findById(jobId).exec(function (err, job) {
        if (err) {
            res.status(500).json(err);
        }
        else if (!job) {
            res.status(400).json({
                message: "No job found with given jobId"
            });
        }
        else {
            res.status(200).json(job);
        }
    });
}

const addOne = function (req, res) {
    newJob = {
        title: req.body.title,
        salary: parseFloat(req.body.salary),
        location: req.body.location,
        description: req.body.description,
        experience: req.body.experience,
        skills: req.body.skills,
        postDate: req.body.postDate
    };
    Job.create(newJob, function (err, job) {
        if (err) {
            res.status(500).json(err);
        }
        else {
            res.status(201).json({
                message: "Job Created"
            });
        }
    })
}

const updateOne = function (req, res) {
    const jobId = req.params.jobId;
    if (!mongoose.isValidObjectId(req.params.jobId)) {
        res.status(400).json({
            message: "Invalid jobId"
        });
        return;
    }
    Job.findById(jobId).exec(function (err, job) {
        if (err) {
            res.status(500).json(err);
        }
        else if (!job) {
            res.status(400).json({
                message: "Job not found with given jobId"
            });
        }
        else {
            job.title = req.body.title;
            job.salary = parseFloat(req.body.salary);
            job.location = req.body.location;
            job.description = req.body.description;
            job.experience = req.body.experience;
            job.skills = req.body.skills;
            job.postDate = req.body.postDate;
            job.save(function (err, job) {
                if (err) {
                    res.status(500).json(err);
                }
                else {
                    res.status(200).json({
                        message: "User updated"
                    });
                }
            });
        }
    });
}

const deleteOne = function (req, res) {
    const jobId = req.params.jobId;
    if (!mongoose.isValidObjectId(req.params.jobId)) {
        res.status(400).json({
            message: "Invalid jobId"
        });
        return;
    }
    Job.findByIdAndRemove(jobId).exec(function (err, job) {
        if (err) {
            res.status(500).json(err);
        }
        else if (!job) {
            res.status(400).json({
                message: "Job not found with given jobId"
            });
        }
        else {
            res.status(200).json({
                message: "Job deleted"
            });
        }
    })
}

module.exports = {
    getAll: getAll,
    findOne: findOne,
    addOne: addOne,
    updateOne: updateOne,
    deleteOne: deleteOne
};