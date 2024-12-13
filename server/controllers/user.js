const User = require("../models/user");

exports.userById = (req, res, next, id) => {
    User.findById(id).exec()
        .then((user => {
            req.profile = user;
            next();
        }))
        .catch((err) => {
            return res.status(400).json({
                error: "User not found"
            });
        })
};

exports.read = (req, res) => {
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;

    return res.json(req.profile);
}

exports.update = (req, res) => {
    User.findOneAndUpdate({ _id: req.profile._id }, { $set: req.body }, { new: true })
        .then((user) => {
            user.hashed_password = undefined;
            user.salt = undefined;
            res.json(user)
        })
        .catch((err) => {
            return res.status(400).json({
                err: 'You are not authorized to perform this action'
            })
        })
}
