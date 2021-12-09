"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserData = exports.verifyUser = exports.cookie_parser = void 0;
var mongo_1 = __importDefault(require("./Utils/Helpers/mongo"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var server_1 = require("./server");
var mongodb_1 = require("mongodb");
function cookie_parser(req, res, next) {
    var cookie_str = req.headers['cookie'];
    if (!cookie_str) {
        next(null);
        return;
    }
    var cookies = {};
    cookie_str === null || cookie_str === void 0 ? void 0 : cookie_str.split(';').forEach(function (pair) {
        var cookie = pair.split('=');
        cookies[cookie[0]] = cookie[1];
    });
    req.cookies = cookies;
    next(null);
    return;
}
exports.cookie_parser = cookie_parser;
function verifyUser(req, res, next) {
    if (!req.cookies) {
        res.statusCode = 500;
        res.statusMessage = "Cookies are empty";
        res.json({ error: true, msg: "Cookies missing" });
        return;
    }
    var token = req.cookies['auth-token'];
    if (!token) {
        res.statusCode = 401;
        res.statusMessage = "Unauthorize access!";
        res.json({ error: true, msg: "auth-token is missing" });
        return;
    }
    var id = jsonwebtoken_1.default.verify(token, server_1.jwt_secret_key).toString();
    var _id = new mongodb_1.ObjectId(id);
    mongo_1.default.findUser(_id).then(function (user_data) {
        if (!user_data) {
            res.statusCode = 401;
            res.statusMessage = "Unauthorize access!";
            res.json({ error: true, msg: "Unauthorized access.", is_auth: false });
            return;
        }
        var _req = req;
        _req.user = user_data;
        req = _req;
        next();
        return;
    })
        .catch(function (err) {
        res.json({ error: true, msg: err }).end();
        return;
    });
}
exports.verifyUser = verifyUser;
function getUserData(req, res, next) {
    if (!req.cookies) {
        next();
        return;
    }
    var token = req.cookies['auth-token'];
    if (!token) {
        next();
        return;
    }
    var id = jsonwebtoken_1.default.verify(token, server_1.jwt_secret_key).toString();
    var _id = new mongodb_1.ObjectId(id);
    mongo_1.default.findUser(_id).then(function (user_data) {
        if (!user_data) {
            next();
            return;
        }
        var _req = req;
        _req.user = user_data;
        req = _req;
        next();
        return;
    })
        .catch(function (err) {
        next();
        return;
    });
}
exports.getUserData = getUserData;
