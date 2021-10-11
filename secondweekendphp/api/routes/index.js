const express = require('express');

const usersController = require('../controllers/users.controller');
const socialMediaController = require('../controllers/socialmedia.controller');

const router = express.Router();

router.route('/users')
    .get(usersController.getUsers);
router.route('/users/add')
    .post(usersController.addUser);
router.route('/users/:userId')
    .get(usersController.getSingle)
    .put(usersController.updateUser)
    .delete(usersController.deleteUser);

router.route('/users/:userId/socialmedias')
    .get(socialMediaController.getAll)
    .post(socialMediaController.add);

router.route('/users/:userId/socialmedias/:socialMediaId')
    .get(socialMediaController.getSingle)
    .put(socialMediaController.update)
    .delete(socialMediaController.delete);

router.route('/users/search')
    .post(usersController.searchUsers);

module.exports = router;