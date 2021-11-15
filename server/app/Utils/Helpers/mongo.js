"use strict";
exports.__esModule = true;
var mongodb_1 = require("mongodb");
var DB_Name = 'LivePollApp';
var url = 'mongodb://127.0.0.1:27017';
// 'mongodb+srv://charan:admin@cluster.mnp3q.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
var LivePollsCollectionName = 'LivePolls';
/*
use LivePollApp
db.LivePolls.find().pretty()
*/
var MongoHelper = /** @class */ (function () {
    function MongoHelper() {
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
                })["catch"](function (err) {
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
    MongoHelper.prototype.createNewPoll = function (question) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var _a;
            if (!_this.db) {
                console.log('createNewPoll Db is undefined');
                reject('createNewPoll Db id undefined.');
            }
            var options = [];
            question.options.forEach(function (opt, index) {
                options.push({ no_of_polls: 0, option: opt, index: index });
            });
            var _question = { created_time: question.created_time, options: options, question: question.question, question_id: question.question_id };
            (_a = _this.db) === null || _a === void 0 ? void 0 : _a.collection(LivePollsCollectionName).insertOne(_question).then(function (doc) {
                resolve(doc);
            });
        });
    };
    MongoHelper.prototype.voteToQuestion = function (question_id, opt_index) {
        var _this = this;
        return new Promise(function (res, rej) {
            if (!_this.db) {
                console.error('updatePoll db is undefined');
                rej('db is undefined');
            }
            var collection = _this.db.collection(LivePollsCollectionName);
            collection.findOne({ 'question_id': question_id }).then(function (db_question) {
                if (!db_question) {
                    rej('\n \t\t ++++++++++++++ Invalid question Id. ++++++++++');
                }
                ;
                collection.updateOne({
                    'question_id': question_id,
                    'options.index': opt_index
                }, {
                    $inc: {
                        'options.$.no_of_polls': 1
                    }
                }).then(function (result) { res(result); })["catch"](function (err) { return rej(err); });
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
    return MongoHelper;
}());
exports["default"] = new MongoHelper();
