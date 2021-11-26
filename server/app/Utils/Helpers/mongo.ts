import { MongoClient, Db, InsertOneResult, UpdateResult } from 'mongodb';
import { DB_USERS_COLL_NAME } from '../../../config';
import { DbQuestion, Question as QuestionInterface, Option, DbVote } from '../models/db_models';
const DB_Name = 'LivePollApp';
const url = 'mongodb://127.0.0.1:27017'
// 'mongodb+srv://charan:admin@cluster.mnp3q.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const LivePollsCollectionName = 'LivePolls'

/*
use LivePollApp
db.LivePolls.find().pretty()
*/


class MongoHelper {
    public client: MongoClient | undefined;
    public db: Db | undefined;


    public connectDb(db_name?: string): Promise<boolean | Db> {
        return new Promise((resolve, reject) => {
            try {
                const mongo_client = new MongoClient(url!);
                mongo_client.connect()
                    .then((client) => {
                        this.client = client;
                        console.log('Connected successfully to server');
                        this.db = this.client.db(db_name ? db_name : DB_Name);
                        resolve(this.db);
                    })
                    .catch((err) => {
                        console.error(err);
                        reject(false);
                    })
            } catch (error) {
                console.error(error)
                reject(false);
            }
        })
    }

    public createNewPoll(question: QuestionInterface): Promise<InsertOneResult> {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                console.log('createNewPoll Db is undefined')
                reject('createNewPoll Db id undefined.');return;
            }
            let options: Option[] = [];
            question.options.forEach((opt, index) => {
                options.push({ no_of_polls: 0, option: opt, index });
            })

            let _question: DbQuestion = { ...question, votes: [], options: options };
            this.db.collection(LivePollsCollectionName).createIndex({'expire_at':1},{expireAfterSeconds:0});
            this.db.collection(LivePollsCollectionName).insertOne(_question).then((doc) => {
                resolve(doc);
            })
        })
    }

    public voteToQuestion(question_id: string, opt_index: number, req_ip_addr: string,): Promise<UpdateResult> {
        return new Promise((res, rej) => {
            if (!this.db) {
                console.error('updatePoll db is undefined')
                rej();
            }
            let collection = this.db!.collection(LivePollsCollectionName);
            let vote: DbVote = { created_time: new Date(), ip_addr: req_ip_addr, name: 'temp name', option_index: opt_index }
            collection.findOne({ 'question_id': question_id }).then(db_question => {
                if (!db_question) {
                    rej('Invalid poll id!')
                };
                collection.updateOne(
                    {
                        'question_id': question_id,
                        'options.index': opt_index
                    }, {
                    $inc: {
                        'options.$.no_of_polls': 1,
                        'total_votes': 1
                    }, $addToSet: {
                        'votes': vote
                    }
                }
                ).then(result => { res(result) }).catch(err => rej())
            })
        })
    }
    public isVotedToPoll = (question_id: string, ip_addr: string): Promise<boolean> => {
        return new Promise((res, rej) => {
            this.db!.collection(LivePollsCollectionName).find({ "question_id": question_id, "votes.ip_addr": ip_addr }).project({ votes: 0, _id: 0 }).toArray().then(data => {
                console.log(data);

                if (!data) { res(false); return; }
                if (data.length > 0) {
                    res(true); return;
                } res(false);
            }).catch(err => rej(err))
        })
    }
    public fetchAllQuestionData() {
        return new Promise((res, rej) => {
            if (!this.db) {
                console.error('fetchAllQuestionData  db is undefined')
                rej('db is undefined');
            }
            let all_questions = this.db!.collection(LivePollsCollectionName).find({}).toArray();
            res(all_questions);
        })
    }
    public fetchQuestionData(question_id: string) {
        return new Promise((res, rej) => {
            if (!this.db) {
                console.error('fetchQuestionData  db is undefined')
                rej('db is undefined');
            }
            this.db!.collection(LivePollsCollectionName).findOne({ 'question_id': question_id }, function (err, doc) {
                if (err) rej(err);
                if (!doc) { rej('Invalid question id!') }
                res(doc)
            })
        })
    }

    public findUser(id: string) {
        return new Promise((res, rej) => {
            if (!this.db) {
                console.error('findUser  db is undefined')
                rej('db is undefined');
            }
            try {
                this.db!.collection(DB_USERS_COLL_NAME).findOne({ 'id': id }, function (err, doc) {
                    if (err) rej(err);
                    if (!doc) { rej('Invalid question id!') }
                    res(doc)
                })
            }
            catch (err) {
                rej(err)
            }
        })
    }

}
export default new MongoHelper();