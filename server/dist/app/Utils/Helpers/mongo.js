"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongodb_1 = require("mongodb");
var config_1 = require("../../../config");
var DB_Name = 'LivePollApp';
var url = 'mongodb+srv://charan:admin@cluster.mnp3q.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
// 'mongodb://127.0.0.1:27017'
var LivePollsCollectionName = 'LivePolls';
var MongoHelper = /** @class */ (function () {
    function MongoHelper() {
        var _this = this;
        this.isVotedToPoll = function (question_id, ip_addr) {
            return new Promise(function (res, rej) {
                _this.db.collection(LivePollsCollectionName).find({ "question_id": question_id, "votes.ip_addr": ip_addr }).project({ votes: 0, _id: 0 }).toArray().then(function (data) {
                    console.log(data);
                    if (!data) {
                        res(false);
                        return;
                    }
                    if (data.length > 0) {
                        res(true);
                        return;
                    }
                    res(false);
                }).catch(function (err) { return rej(err); });
            });
        };
    }
    MongoHelper.prototype.connectDb = function (db_name) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            try {
                var mongo_client = new mongodb_1.MongoClient(url);
                mongo_client.connect()
                    .then(function (client) {
                    _this.client = client;
                    console.log('Connected successfully to server');
                    _this.db = _this.client.db(db_name ? db_name : DB_Name);
                    resolve(_this.db);
                })
                    .catch(function (err) {
                    console.error(err);
                    reject(false);
                });
            }
            catch (error) {
                console.error(error);
                reject(false);
            }
        });
    };
    MongoHelper.prototype.fetchQuestionCreatedByUser = function (user_name) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            try {
                if (!_this.db) {
                    console.log('createNewPoll Db is undefined');
                    reject('fetchQuestionCreatedByUser Db id undefined.');
                    return;
                }
                _this.db.collection(LivePollsCollectionName).find({ created_by: user_name }).project({ _id: 0 })
                    .toArray()
                    .then(function (question_list) { return resolve(question_list); });
            }
            catch (err) {
                reject(err);
            }
        });
    };
    MongoHelper.prototype.createNewPoll = function (question) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!_this.db) {
                console.log('createNewPoll Db is undefined');
                reject('createNewPoll Db id undefined.');
                return;
            }
            var options = [];
            question.options.forEach(function (opt, index) {
                options.push({ no_of_polls: 0, option: opt, index: index });
            });
            var _question = __assign(__assign({}, question), { votes: [], options: options });
            _this.db.collection(LivePollsCollectionName).createIndex({ 'expire_at': 1 }, { expireAfterSeconds: 0 });
            _this.db.collection(LivePollsCollectionName).insertOne(_question).then(function (doc) {
                resolve(doc);
            });
        });
    };
    /* public addShare(question_id: string):Promise<UpdateResult> {
        return new Promise((res, rej) => {
            try {
                if (!this.db) {
                    console.log('\ncreateNewPoll Db is undefined\n')
                    rej('addShare Db id undefined.'); return;
                }
                this.db.collection(LivePollsCollectionName)
                    .updateOne({
                        'question_id': question_id
                    }, {
                        $inc: { 'shares': 1 }
                    }).then(result => {
                        res(result);
                    }).catch(err=>rej(err));
            } catch (error) {
                rej(error);
            }
        })
    } */
    MongoHelper.prototype.addVisit = function (question_id, ip_addr) {
        var _this = this;
        return new Promise(function (res, rej) {
            try {
                if (!_this.db) {
                    console.log('\ncreateNewPoll Db is undefined\n');
                    res({ error: true, msg: 'addVisit Db id undefined.' });
                    return;
                }
                _this.db.collection(LivePollsCollectionName).findOne({
                    'question_id': question_id,
                    'visits': ip_addr
                }, function (err, document) {
                    if (err) {
                        rej(err);
                        return;
                    }
                    if (document) {
                        res({ error: true, msg: "Already visited." });
                        return;
                    }
                    _this.db.collection(LivePollsCollectionName)
                        .updateOne({
                        'question_id': question_id
                    }, {
                        $inc: { 'no_of_visits': 1 }, $addToSet: { 'visits': ip_addr }
                    }).then(function (result) {
                        res({ error: false, msg: 'success' });
                    }).catch(function (err) { return rej(err); });
                });
            }
            catch (error) {
                rej(error);
            }
        });
    };
    MongoHelper.prototype.voteToQuestion = function (question_id, opt_index, req_ip_addr) {
        var _this = this;
        return new Promise(function (res, rej) {
            if (!_this.db) {
                console.error('updatePoll db is undefined');
                rej();
            }
            var collection = _this.db.collection(LivePollsCollectionName);
            var vote = { created_time: new Date(), ip_addr: req_ip_addr, name: 'temp name', option_index: opt_index };
            collection.findOne({ 'question_id': question_id }).then(function (db_question) {
                if (!db_question) {
                    rej('Invalid poll id!');
                }
                ;
                collection.updateOne({
                    'question_id': question_id,
                    'options.index': opt_index
                }, {
                    $inc: {
                        'options.$.no_of_polls': 1,
                        'total_votes': 1
                    }, $addToSet: {
                        'votes': vote
                    }
                }).then(function (result) { res(result); }).catch(function (err) { return rej(); });
            });
        });
    };
    MongoHelper.prototype.fetchAllQuestionData = function () {
        var _this = this;
        return new Promise(function (res, rej) {
            if (!_this.db) {
                console.error('fetchAllQuestionData  db is undefined');
                rej('db is undefined');
            }
            var all_questions = _this.db.collection(LivePollsCollectionName).find({}).toArray();
            res(all_questions);
        });
    };
    MongoHelper.prototype.fetchQuestionData = function (question_id) {
        var _this = this;
        return new Promise(function (res, rej) {
            if (!_this.db) {
                console.error('fetchQuestionData  db is undefined');
                rej('db is undefined');
            }
            _this.db.collection(LivePollsCollectionName).findOne({ 'question_id': question_id }, function (err, doc) {
                if (err)
                    rej(err);
                if (!doc) {
                    rej('Invalid question id!');
                }
                res(doc);
            });
        });
    };
    MongoHelper.prototype.findUser = function (_id) {
        var _this = this;
        return new Promise(function (res, rej) {
            if (!_this.db) {
                console.error('findUser  db is undefined');
                rej('db is undefined');
            }
            try {
                _this.db.collection(config_1.DB_USERS_COLL_NAME).findOne({ '_id': _id }, function (err, doc) {
                    if (err)
                        rej(err);
                    if (!doc) {
                        rej('User not found.');
                    }
                    res(doc);
                });
            }
            catch (err) {
                rej(err);
            }
        });
    };
    return MongoHelper;
}());
exports.default = new MongoHelper();
