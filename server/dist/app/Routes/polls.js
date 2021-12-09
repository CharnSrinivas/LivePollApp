"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var middlewares_1 = require("../middlewares");
var mongo_1 = __importDefault(require("../Utils/Helpers/mongo"));
var utils_1 = require("../Utils/utils");
var router = (0, express_1.Router)();
router.get('/fetch_poll', function (req, res) {
    var query_parms = req.query;
    if (!query_parms.id) {
        res.statusCode = 400;
        res.json({ error: true, msg: "Invalid query parameters." });
        return;
    }
    mongo_1.default.fetchQuestionData(query_parms.id).
        then(function (question_data) {
        res.json(question_data).end();
    }).catch(function (err) {
        console.error(err);
        res.statusCode = 400;
        res.json({ error: false, msg: "Success" }).end();
        return;
    });
});
router.post('/check_vote', function (req, res) {
    var data = req.body;
    var ip_addr = req.connection.remoteAddress || req.socket.remoteAddress;
    if (data.question_id, ip_addr) {
        mongo_1.default.isVotedToPoll(data.question_id, ip_addr.toString()).then(function (is_voted) {
            res.json({ is_voted: is_voted, ip_addr: ip_addr.toString() });
            return;
        }).catch(function (err) { res.statusCode = 500; res.json({ error: true, msg: err }).end(); });
    }
});
/* router.post(
    '/add_visit',
    function (req, res) {
        let body = req.body as any;
        if(!body.question_id){
            res.json({error:true,msg:"Question id not set."}).end();return;
        }
        let ip_addr = req.connection.remoteAddress || req.socket.remoteAddress as string;
    }
) */
router.get('/add_visit', function (req, res) {
    try {
        var ip_addr = req.connection.remoteAddress || req.socket.remoteAddress;
        var question_id = req.query['question_id'];
        if (!ip_addr) {
            res.statusCode = 500;
            res.json({ error: true, msg: "Unable to get remote ip_address from request." }).end();
            return;
        }
        if (!question_id) {
            res.statusCode = 401;
            res.json({ error: true, msg: "Invalid query parameters." }).end();
            return;
        }
        mongo_1.default.addVisit(question_id, ip_addr).then(function (_a) {
            var error = _a.error, msg = _a.msg;
            if (error) {
                res.statusCode = 406;
                res.json({ error: error, msg: msg }).end();
                return;
            }
            res.json({ error: error, msg: msg }).end();
            return;
        }).catch(function (err) {
            res.statusCode = 500;
            res.json({ error: true, msg: err });
        });
    }
    catch (err) {
        res.json({ error: true, err: err }).end();
        return;
    }
});
router.get('/vote', function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var query_parms, ip_addr, is_already_voted, error_1, option_index, question_id;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query_parms = req.query;
                    ip_addr = req.connection.remoteAddress || req.socket.remoteAddress;
                    if (!(query_parms.question_id && query_parms.option_index)) {
                        res.statusCode = 400;
                        res.json({ msg: 'Invalid query parameters 1!' });
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, mongo_1.default.isVotedToPoll(query_parms.question_id, ip_addr)];
                case 2:
                    is_already_voted = _a.sent();
                    if (is_already_voted) {
                        res.statusCode = 400;
                        res.json({ is_already_voted: true }).end();
                        return [2 /*return*/];
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    res.statusCode = 500;
                    res.json({ error: error_1 }).end();
                    return [3 /*break*/, 4];
                case 4:
                    option_index = parseInt(query_parms.option_index);
                    if (option_index === NaN || option_index == NaN) {
                        res.statusCode = 400;
                        res.json({ msg: 'Invalid query parameters .Option_index in is not valid integer.' });
                        return [2 /*return*/];
                    }
                    question_id = query_parms.question_id;
                    mongo_1.default.voteToQuestion(question_id, option_index, ip_addr.toString()).then(function (doc_update_result) {
                        res.send().end();
                    }).catch(function (err) {
                        res.statusCode = 500;
                        res.send(err);
                        return;
                    });
                    return [2 /*return*/];
            }
        });
    });
});
router.post('/create', middlewares_1.getUserData, function (req, res) {
    var data = req.body;
    if (!(data.options && data.question && data.question_title)) {
        res.statusCode = 400; // ? ==================> 400 Bad Request <==================
        res.send('Insufficient data!');
        return;
    }
    if (data.options.length < 2) {
        res.statusCode = 203; //? ==================>  203 Non-Authoritative Information <==================
        res.send('Number of \'options\' is less than 2.');
        return;
    }
    var question_id = (0, utils_1.generateRandomQuestionId)();
    var created_time = new Date();
    var _req = req;
    var user_data = _req.user;
    var created_by = null;
    if (user_data) {
        created_by = user_data.username;
    }
    mongo_1.default.createNewPoll({
        created_time: created_time,
        options: data.options,
        question: data.question,
        question_id: question_id,
        total_votes: 0,
        question_description: data.question_description ? data.question_description : null,
        question_title: data.question_title,
        created_date: new Date().toLocaleDateString(),
        expire_at: data.expire_at ? new Date(data.expire_at) : null,
        visits: [], no_of_visits: 0,
        created_by: created_by
    }).then(function (doc) {
        res.statusCode = 201; //? ==================>  201 Created <==================
        res.send({ created_time: created_time, question_id: question_id });
        return;
    }).catch(function (err) {
        console.log(err);
        res.statusCode = 500; //? ==================>  500 Internal server error <==================
        res.send();
        return;
    });
});
exports.default = router;
