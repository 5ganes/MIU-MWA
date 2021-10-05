const express = require('express');

const studentController = require('../controllers/students.controller');

const router = express.Router();

router.route('/students')
    .get(studentController.getStudents);
router.route('/students/:studentId')
    .get(studentController.getSingle);
router.route('/students/:studentId/courses')
    .get(studentController.getCourses);
router.route('/students/:studentId/courses/:courseId')
    .get(studentController.getOneCourse);

module.exports = router;