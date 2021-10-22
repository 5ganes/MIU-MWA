const mongoose = require('mongoose');

const User = mongoose.model('User');

const bcrypt = require('bcrypt');

const addUser = function (req, res) {
    bcrypt.hash(req.body.password, 10, function (err, hash) {
        if (err) {
            return next(err);
        }
        const newUser = {
            name: req.body.name,
            username: req.body.username,
            password: hash
        };
        // console.log(newUser);
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
        // next();
    })

}

module.exports = {
    addUser: addUser
}