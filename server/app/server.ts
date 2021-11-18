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
    // const auth_router = (await import('./Routes/auth')).default;
    // let _vote =await mongo.db?.collection('LivePolls').find({"votes.name":"temp name"}).project({votes:0,_id:0}).toArray();
    // console.log(_vote,typeof(_vote![0].created_time));
    app.use(express.json(), cors({
        origin: '*'
        // ['http://localhost:3000', 'http://127.0.0.1:3000','http://0.0.0.0:3000']
        , credentials: true
    }), PollRouter)
    app.get('/', function (req: Request, res: Response) {
        let ip_addr = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress as string;
        console.log(req.headers['x-forwarded-for'], "From headers \n");
        console.log(req.connection.remoteAddress, "from connection\n");
        console.log(req.socket.remoteAddress, "From socket \n");
        res.send("Ok bye")
    })
    app.listen(PORT, () => {
        console.log('Listening to port ' + PORT);
    })

}
