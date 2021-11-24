import express, { NextFunction, Request, Response } from 'express';
import MongoHelper from './Utils/Helpers/mongo';
import { generateRandomQuestionId } from './Utils/utils';
import PollRouter from './Routes/polls';
import cors from 'cors'
import mongo from './Utils/Helpers/mongo';
const PORT = 5000;
const app = express();


export default async function main() {
    await MongoHelper.connectDb().catch((err) => { console.log('unable to connect '); })
    
    app.use(express.json(), cors({
        origin: '*'
        // ['http://localhost:3000', 'http://127.0.0.1:3000','http://0.0.0.0:3000']
        , credentials: true
    }), PollRouter)
    
    app.listen(PORT, () => {
        console.log('Listening to port ' + PORT);
    })

}
