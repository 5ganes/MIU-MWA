const express = require('express');

const usersController = require('../controllers/users.controller');

const router = express.Router();

router.route('/users')
    .get(usersController.getUsers);
router.route('/users/add')
    .post(usersController.addUser);
router.route('/users/:userId')
    .get(usersController.getSingle)
    .put(usersController.updateUser)
    .delete(usersController.deleteUser);

module.exports = router;