import { MongoClient, Db, InsertOneResult, UpdateResult } from 'mongodb';
import { DbQuestion, Question as QuestionInterface, Option } from '../models/db_models';
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
                reject('createNewPoll Db id undefined.');
            }

            let options: Option[] = [];
            question.options.forEach((opt, index) => {
                options.push({ no_of_polls: 0, option: opt, index });
            })

            let _question: DbQuestion = { created_time: question.created_time, options, question: question.question, question_id: question.question_id };

            this.db?.collection(LivePollsCollectionName).insertOne(_question).then((doc) => {
                resolve(doc);
            })
        })
    }

    public voteToQuestion(question_id: string, opt_index: number): Promise<UpdateResult> {
        return new Promise((res, rej) => {
            if (!this.db) {
                console.error('updatePoll db is undefined')
                rej('db is undefined');
            }
            let collection = this.db!.collection(LivePollsCollectionName);
            collection.findOne({ 'question_id': question_id }).then(db_question => {
                if (!db_question) {
                    rej('\n \t\t ++++++++++++++ Invalid question Id. ++++++++++')
                };
                collection.updateOne(
                    {
                        'question_id': question_id,
                        'options.index': opt_index
                    }, {
                    $inc: {
                        'options.$.no_of_polls': 1
                    }
                }
                ).then(result => { res(result) }).catch(err=>rej(err))
            })
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
                if (!doc){rej('Invalid question id!')}
                res(doc)
            })
        })
    }

}
export default new MongoHelper();