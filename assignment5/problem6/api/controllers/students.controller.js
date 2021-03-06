const mongoose = require('mongoose');

const Student = mongoose.model('Student');

const getStudents = function (req, res) {
    let offset = 0;
    let count = 10;
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
    const student = Student.findOne({ _id: studentId }).exec(function (err, student) {
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
            res.status(400).json({
                "message": "No student found with given studentId - " + studentId
            });
        }
    });
}

const getCourse = function (req, res) {
    const studentId = req.params.studentId;
    if (!mongoose.isValidObjectId(studentId)) {
        console.log("Given studentId is not valid");
        res.status(400).json({
            "message": "Given studentId is not valid"
        });
        return;
    }
    const course = Student.findById(studentId).select('courses').exec(function (err, courses) {
        if (err) {
            console.log('Error finding courses');
            res.status(500).json(err);
            return;
        }
        if (courses.courses.length > 0) {
            console.log('Courses found :', courses);
            res.status(200).json(courses.courses);
        }
        else {
            console.log('No courses found with given studentId : ', studentId);
            res.status(400).json({
                "message": "No courses found with given studentId - " + studentId
            });
        }
    });
}

const addStudent = function (req, res) {
    console.log('sdf');
    const newStudent = {
        name: req.body.name,
        gpa: parseFloat(req.body.gpa),
        courses: []
    };
    Student.create(newStudent, function (err, student) {
        if (err) {
            console.log('Error creating student');
            res.status(500).json(err);
            return;
        }
        console.log('Student Created', student);
        res.status(201).json({
            message: 'Student created'
        });
    });
}

const updateStudent = function (req, res) {
    var studentId = req.params.studentId;
    if (!mongoose.isValidObjectId(studentId)) {
        console.log("Given studentId is not valid");
        res.status(400).json({
            "message": "Given studentId is not valid"
        });
        return;
    }
    Student.findById(studentId).exec(function (err, student) {
        if (err) {
            console.log("Error finding student");
            res.status(500).json({
                message: "Error finding student"
            });
            return;
        }
        else if (!student) {
            res.status(404).json({
                message: "No student matched with the given studentId"
            });
            return;
        }
        student.name = req.body.name;
        student.gpa = parseFloat(req.body.gpa);
        student.save(function (err, student) {
            if (err) {
                console.log('Error updating student');
                res.status(500).json(err);
                return;
            }
            console.log('Student Updated', student);
            res.status(200).json({
                message: 'Student updated'
            });
        });
    });
}

const deleteStudent = function (req, res) {
    var studentId = req.params.studentId;
    if (!mongoose.isValidObjectId(studentId)) {
        console.log("Given studentId is not valid");
        res.status(400).json({
            "message": "Given studentId is not valid"
        });
        return;
    }
    Student.findByIdAndRemove(studentId).exec(function (err, student) {
        if (err) {
            console.log("Error deleting student");
            res.status(500).json({
                message: "Error deleting student"
            });
            return;
        }
        else if (!student) {
            res.status(404).json({
                message: "No student matched with the given student"
            });
            return;
        }
        console.log('Student Deleted', student);
        res.status(200).json({
            message: 'Student Deleted'
        });
    });
}

module.exports = {
    getStudents: getStudents,
    getSingle: getSingle,
    getCourse: getCourse,
    addStudent: addStudent,
    updateStudent: updateStudent,
    deleteStudent: deleteStudent
}