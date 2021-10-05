const mongoose = require('mongoose');

const Student = mongoose.model('Student');

const getStudents = function (req, res) {
    let offset = 0;
    let count = 5;
    const maxCount = 15;
    if (req.query) {
        if (req.query.count)
            count = parseInt(req.query.count);
        if (req.query.offset)
            offset = parseInt(req.query.offset);
    }
    if (isNaN(count) || isNaN(offset)) {
        res.status(400).json({
            err: "Please enter valid API url"
        });
        return;
    }
    if (count > maxCount) {
        res.status(400).json({
            message: "Cannot exceed count of " + maxCount
        });
        return;
    }

    Student.find().skip(offset).limit(count).exec(function (err, students) {
        if (err) {
            console.log('Error finding students');
            res.status(500).json(err);
            return;
        }
        if (students.length == 0) {
            res.status(404).json({
                message: "No students found"
            });
            return;
        }
        console.log('Students found. Total', students.length);
        res.json(students);
    });
};

const getSingle = function (req, res) {
    const studentId = req.params.studentId;
    if (!mongoose.isValidObjectId(studentId)) {
        console.log("Given studentId is not valid");
        res.status(400).json({
            "message": "Given studentId is not valid"
        });
        return;
    }
    const student = Student.findById(studentId).exec(function (err, student) {
        if (err) {
            console.log('Error finding student');
            res.status(500).json(err);
            return;
        }
        if (student) {
            console.log('Student found : ', student);
            res.status(200).json(student);
        }
        else {
            console.log('No student found with given studentId : ', studentId);
            res.status(404).json({
                "message": "No student found with given studentId - " + studentId
            });
        }
    });
}

const getCourses = function (req, res) {
    const studentId = req.params.studentId;
    if (!mongoose.isValidObjectId(studentId)) {
        console.log("Given studentId is not valid");
        res.status(400).json({
            "message": "Given studentId is not valid"
        });
        return;
    }
    const course = Student.findById(studentId).select('courses').exec(function (err, student) {
        if (err) {
            console.log('Error finding student');
            res.status(500).json(err);
            return;
        }
        if (student.courses.length > 0) {
            console.log('Courses found :', student.courses);
            res.status(200).json(student.courses);
        }
        else {
            console.log('No courses found with given studentId : ', studentId);
            res.status(404).json({
                "message": "No courses found with given studentId - " + studentId
            });
        }
    });
}

const getOneCourse = function (req, res) {
    console.log("in");
    const studentId = req.params.studentId;
    const courseId = req.params.courseId;
    if (!mongoose.isValidObjectId(studentId) || !mongoose.isValidObjectId(courseId)) {
        console.log("Given studentId/courseId is not valid");
        res.status(400).json({
            "message": "Given studentId/courseId is not valid"
        });
        return;
    }
    Student.findById(studentId).select("courses").exec(function (err, student) {
        if (err) {
            console.log('Error finding student');
            res.status(500).json(err);
            return;
        }
        if (!student) {
            console.log('Student not found with studentId :', studentId);
            res.status(200).json({
                message: "Student not found with studentId : " + studentId
            });
            return;
        }
        const course = student.courses.id(courseId);
        if (course) {
            console.log('Course found :', course);
            res.status(200).json(course);
            return;
        }
        else {
            console.log('No course found with given courseId : ', courseId);
            res.status(404).json({
                "message": "No course found with given courseId - " + courseId
            });
            return;
        }
        res.status(200).json(course);
    });
}

module.exports = {
    getStudents: getStudents,
    getSingle: getSingle,
    getCourses: getCourses,
    getOneCourse: getOneCourse
}