const User = require("../models/user");
const jwt = require("jsonwebtoken"); // to generate signed token
const expressJwt = require("express-jwt"); // for authorization check
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.signup = (req, res) => {
    const user = new User(req.body);

    user.save()
        .then((user) => {
            user.salt = undefined;
            user.hashed_password = undefined;
            res.json({
                user
            });
        })
        .catch((err) => {
            return res.status(400).json({
                error: errorHandler(err)
            });
        })
};

exports.signin = (req, res) => {
    // find the user based on email
    const { email, password } = req.body;
    User.findOne({ email })
        .then((user) => {
            // Make sure the password matches the password for this email
            if (!user.authenticate(password)) {
                return res.status(401).json({
                    error: "Password is incorrect"
                });
            }
            // generate a signed token with user id and secret
            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
            // persist the token as 't' in cookie with expiry date
            res.cookie("t", token, { expire: new Date() + 9999 });
            // return response with user and token to frontend client
            const { _id, name, email, role } = user;
            return res.json({ token, user: { _id, email, name, role } });
        })
        .catch((err) => {
            return res.status(400).json({
                error: "User with that email does not exist. Please signup"
            });
        })
};

exports.signout = (req, res) => {
    res.clearCookie("t");
    res.json({ message: "Signout success" });
};

exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty: "auth"
});

exports.isAuth = (req, res, next) => {
    let user = req.profile && req.auth && req.profile._id == req.auth._id;
    if (!user) {
        return res.status(403).json({
            error: "Access denied"
        });
    }
    next();
};

exports.isAdmin = (req, res, next) => {
    if (req.profile.role === 0) {
        return res.status(403).json({
            error: "Admin resource! Access denied"
        });
    }
    next();
};
