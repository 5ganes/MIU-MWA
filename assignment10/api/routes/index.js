const express = require('express');

const jobsController = require("../controllers/jobs.controller");

const router = express.Router();

router.route('/jobs')
    .get(jobsController.getAll)
    .post(jobsController.addOne);

router.route('/jobs/:jobId')
    .get(jobsController.findOne)
    .put(jobsController.updateOne)
    .delete(jobsController.deleteOne);

module.exports = router;