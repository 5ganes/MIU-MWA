const express = require('express');

const studentController = require('../controllers/students.controller');

const router = express.Router();

router.route('/students')
    .get(studentController.getStudents);
router.route('/students/add')
    .post(studentController.addStudent);
router.route('/students/:studentId')
    .get(studentController.getSingle)
    .put(studentController.updateStudent)
    .delete(studentController.deleteStudent);

router.route('/students/:studentId/course')
    .get(studentController.getCourse);

module.exports = router;