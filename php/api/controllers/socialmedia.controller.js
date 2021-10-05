const mongoose = require('mongoose');
const User = mongoose.model('User');

const add = function (req, res) {
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
        const newSocialMedia = {
            name: req.body.name,
            username: req.body.username,
            noOfFollowers: req.body.noOfFollowers
        };
        user.socialMedias.push(newSocialMedia);
        user.save(function (err, user) {
            if (err) {
                console.log('Error creating socialMedia');
                res.status(500).json(err);
                return;
            }
            console.log('socialMedia Created', newSocialMedia);
            res.status(201).json({
                message: 'SocialMedia created'
            });
        });
    });
}

const getAll = function (req, res) {
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
        if (!user.socialMedias) {
            res.status(404).json({
                message: "No social medias matched with the given userId"
            });
            return;
        }
        res.status(200).json(user.socialMedias);
        return;
    });
}

const getSingle = function (req, res) {
    var userId = req.params.userId;
    var socialMediaId = req.params.socialMediaId;
    if (!mongoose.isValidObjectId(userId) || !mongoose.isValidObjectId(socialMediaId)) {
        console.log("Given userId/socialMediaId is not valid");
        res.status(400).json({
            "message": "Given userId/socialMediaId is not valid"
        });
        return;
    }
    User.findById(userId).select("socialMedias").exec(function (err, user) {
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
        // console.log(user.socialMedias);
        // return;
        singleSocialMedia = user.socialMedias.id(socialMediaId);
        if (!singleSocialMedia) {
            res.status(404).json({
                message: "No socialMedia matched with the given socialMediaId"
            });
            return;
        }
        res.status(200).json(singleSocialMedia);
        return;
    });
}

const update = function (req, res) {
    var userId = req.params.userId;
    var socialMediaId = req.params.socialMediaId;
    if (!mongoose.isValidObjectId(userId) || !mongoose.isValidObjectId(socialMediaId)) {
        console.log("Given userId/socialMediaId is not valid");
        res.status(400).json({
            "message": "Given userId/socialMediaId is not valid"
        });
        return;
    }
    User.findById(userId).select("socialMedias").exec(function (err, user) {
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
        const newSocialMedia = {
            name: req.body.name,
            username: req.body.username,
            noOfFollowers: req.body.noOfFollowers
        };
        const updateSocialMedia = user.socialMedias.id(socialMediaId);
        if (!updateSocialMedia) {
            res.status(404).json({
                message: "No socialMedia matched with the given socialMediaId"
            });
            return;
        }
        updateSocialMedia.name = req.body.name;
        updateSocialMedia.username = req.body.username;
        updateSocialMedia.noOfFollowers = req.body.noOfFollowers;
        user.save(function (err, user) {
            if (err) {
                console.log('Error updating socialMedia');
                res.status(500).json(err);
                return;
            }
            console.log('socialMedia Updated', updateSocialMedia);
            res.status(200).json({
                message: 'SocialMedia updated'
            });
        });
    });
}

const deleteSocialMedia = function (req, res) {
    var userId = req.params.userId;
    var socialMediaId = req.params.socialMediaId;
    if (!mongoose.isValidObjectId(userId) || !mongoose.isValidObjectId(socialMediaId)) {
        console.log("Given userId/socialMediaId is not valid");
        res.status(400).json({
            "message": "Given userId/socialMediaId is not valid"
        });
        return;
    }
    User.findById(userId).select("socialMedias").exec(function (err, user) {
        if (err) {
            console.log("Error getting user");
            res.status(500).json({
                message: "Error getting user"
            });
            return;
        }
        else if (!user) {
            res.status(404).json({
                message: "No user matched with the given userId"
            });
            return;
        }
        const deleteSocialMedia = user.socialMedias.id(socialMediaId);
        if (!deleteSocialMedia) {
            res.status(404).json({
                message: "No socialMedia matched with the given socialMediaId"
            });
            return;
        }
        user.socialMedias.remove(deleteSocialMedia);
        user.save(function (err, user) {
            if (err) {
                console.log('Error deleting socialMedia');
                res.status(500).json(err);
                return;
            }
            console.log('socialMedia deleted', deleteSocialMedia);
            res.status(200).json({
                message: 'SocialMedia deleted'
            });
        });
    });
}

module.exports = {
    getAll: getAll,
    getSingle: getSingle,
    add: add,
    update: update,
    delete: deleteSocialMedia
}