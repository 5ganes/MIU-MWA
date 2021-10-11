const e = require('express');
const mongoose = require('mongoose');

const User = mongoose.model('User');

const getUsers = function (req, res) {
    let offset = 0;
    let count = 50;
    const maxCount = 100;
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

    User.find().skip(offset).limit(count).exec(function (err, users) {
        if (err) {
            console.log('Error finding users');
            res.status(500).json(err);
            return;
        }
        if (users.length == 0) {
            res.status(400).json({
                message: "No users found"
            });
            return;
        }
        console.log('Users found. Total', users.length);
        res.status(200).json(users);
    });
};

const getSingle = function (req, res) {
    const userId = req.params.userId;
    if (!mongoose.isValidObjectId(userId)) {
        console.log("Given userId is not valid");
        res.status(400).json({
            "message": "Given userId is not valid"
        });
        return;
    }
    const user = User.findById(userId).exec(function (err, user) {
        if (err) {
            console.log('Error finding user');
            res.status(500).json(err);
            return;
        }
        if (user) {
            console.log('User found : ', user);
            res.status(200).json(user);
        }
        else {
            console.log('No user found with given userId : ', userId);
            res.status(400).json({
                "message": "No user found with given userId - " + userId
            });
        }
    });
}

const addUser = function (req, res) {
    const newUser = {
        name: req.body.name,
        gender: req.body.gender,
        age: parseInt(req.body.age)
    };
    User.create(newUser, function (err, user) {
        if (err) {
            console.log('Error creating user');
            res.status(500).json(err);
            return;
        }
        console.log('User Created', user);
        res.status(201).json({
            message: 'User created'
        });
    });
}

const updateUser = function (req, res) {
    var userId = req.params.userId;
    if (!mongoose.isValidObjectId(userId)) {
        console.log("Given userId is not valid");
        res.status(400).json({
            "message": "Given userId is not valid"
        });
        return;
    }
    User.findById(userId).exec(function (err, user) {
        if (err) {
            console.log("Error finding user");
            res.status(500).json({
                message: "Error finding user"
            });
            return;
        }
        else if (!user) {
            res.status(404).json({
                message: "No user matched with the given userId"
            });
            return;
        }
        user.name = req.body.name;
        user.gender = req.body.gender;
        user.age = parseInt(req.body.age);
        user.save(function (err, user) {
            if (err) {
                console.log('Error updating user');
                res.status(500).json(err);
                return;
            }
            console.log('User Updated', user);
            res.status(200).json({
                message: 'User updated'
            });
        });
    });
}

const deleteUser = function (req, res) {
    var userId = req.params.userId;
    if (!mongoose.isValidObjectId(userId)) {
        console.log("Given userId is not valid");
        res.status(400).json({
            "message": "Given userId is not valid"
        });
        return;
    }
    User.findByIdAndRemove(userId).exec(function (err, user) {
        if (err) {
            console.log("Error deleting user");
            res.status(500).json({
                message: "Error deleting user"
            });
            return;
        }
        else if (!user) {
            res.status(404).json({
                message: "No user matched with the given userId"
            });
            return;
        }
        console.log('User Deleted', user);
        res.status(200).json({
            message: 'User Deleted'
        });
    });
}

const searchUsers = function (req, res) {
    const keyword = req.body.keyword;
    User.find({
        name: keyword
    }).exec(function (err, users) {
        if (err) {
            console.log("Error searching users");
            res.status(500).json(err);
            return;
        }
        else if (users.length == 0) {
            res.status(404).json({
                message: "No users matched with given keyword"
            });
            return;
        }
        console.log('Users found');
        res.status(200).json(users);
    });
}

module.exports = {
    getUsers: getUsers,
    getSingle: getSingle,
    addUser: addUser,
    updateUser: updateUser,
    deleteUser: deleteUser,
    searchUsers: searchUsers
}