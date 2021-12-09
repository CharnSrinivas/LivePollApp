"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var middlewares_1 = require("../middlewares");
var mongo_1 = __importDefault(require("../Utils/Helpers/mongo"));
var router = (0, express_1.Router)();
router.get('/dashboard', middlewares_1.verifyUser, function (req, res) {
    var _req = req;
    var _a = _req.user, polls_ids = _a.polls_ids, username = _a.username, xp = _a.xp, profile_img = _a.profile_img;
    var questions_data = [];
    mongo_1.default.fetchQuestionCreatedByUser(username).then(function (question_list) {
        questions_data = question_list;
        var data = {
            username: username,
            polls_ids: polls_ids,
            xp: xp,
            profile_img: profile_img,
            questions_data: questions_data
        };
        res.json(data).end();
        return;
    }).catch(function (err) {
        res.json({ error: true, msg: err }).end();
        return;
    });
});
exports.default = router;
