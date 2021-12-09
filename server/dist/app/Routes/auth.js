"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var mongo_1 = __importDefault(require("../Utils/Helpers/mongo"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var config_1 = require("../../config");
var bcrypt_1 = __importDefault(require("bcrypt"));
var middlewares_1 = require("../middlewares");
var server_1 = require("../server");
var users_coll = mongo_1.default.db.collection(config_1.DB_USERS_COLL_NAME);
var auth_router = (0, express_1.Router)();
auth_router.post('/register', function (req, res) {
    var body = req.body;
    if (!users_coll) {
        res.statusCode = 500;
        res.json({ error: true, msg: "User collection not found in db." });
        return;
    }
    if (body.username && body.password) {
        if (body.username.length > 5 && body.password.length > 8 && body.username.length < 25) {
            users_coll.findOne({ username: body.username }).then(function (db_user) {
                if (db_user) {
                    res.statusMessage = "Username already exists,Please try again!";
                    res.statusCode = 401;
                    res.json({ error: true, msg: "Username already exists,Please try again!" });
                    return;
                }
                else {
                    bcrypt_1.default.hash(body.password, 12)
                        .then(function (password) {
                        var user = {
                            username: body.username, password: password, polls_ids: [], xp: 0
                        };
                        users_coll.insertOne(user, function (err, user_document) {
                            if (err) {
                                res.statusCode = 500;
                                res.statusMessage = err.name + "  : " + err.message;
                                res.json({ error: true, msg: err.name + "  : " + err.message }).end();
                                return;
                            }
                            if (!user_document) {
                                res.statusCode = 500;
                                res.json({ error: true, msg: "Inserted document is empty." }).end();
                                return;
                            }
                            var _id = user_document.insertedId.toString();
                            var token = jsonwebtoken_1.default.sign(_id, server_1.jwt_secret_key);
                            res.statusCode = 200;
                            // ?Cookie expires after 6 months
                            var date = new Date();
                            date.setMonth(date.getMonth() + 6);
                            res.cookie('auth-token', token, { sameSite: 'none', secure: true, expires: date });
                            res.json({ error: false, msg: "Signed Up successfully!" });
                            return;
                        });
                    });
                }
            });
        }
        else {
            res.statusMessage = "Invalid email or password";
            res.statusCode = 401;
            res.json({ error: true, msg: "Invalid email or password" });
            return;
        }
    }
    else {
        res.statusMessage = "Invalid email or password";
        res.statusCode = 401;
        res.json({ error: true, msg: "Invalid email or password" });
        return;
    }
});
auth_router.get('/is_auth', middlewares_1.verifyUser, function (req, res) {
    res.json({ error: false, is_auth: true });
});
auth_router.post('/login', function (req, res) {
    var body = req.body;
    users_coll.findOne({ username: body.username }).then(function (user) {
        if (user) {
            res.statusCode = 200;
            var user_id = user._id.toString();
            var token = jsonwebtoken_1.default.sign(user_id, server_1.jwt_secret_key);
            var date = new Date();
            date.setMonth(date.getMonth() + 6);
            res.cookie('auth-token', token, { sameSite: 'none', secure: true, expires: date });
            res.json({ error: false, msg: "Signed Up successfully!" });
            return;
        }
        else {
            res.statusCode = 400;
            res.statusMessage = "Invalid username or password";
            res.json({ error: true, msg: "Invalid email or password" });
            return;
        }
    }).catch(function (err) {
        console.log(err);
        res.statusCode = 500;
        res.statusMessage = "Internal server error";
        res.json({ error: true, msg: 'Cookies is manipulated!' });
        return;
    });
});
exports.default = auth_router;
