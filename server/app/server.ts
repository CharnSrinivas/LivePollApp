import express, { NextFunction, Request, Response } from 'express';
import MongoHelper from './Utils/Helpers/mongo';
import PollRouter from './Routes/polls';
import cookie_parser from 'cookie-parser'
import cors from 'cors'
const PORT = 5000;
const app = express();


export default async function main() {
    await MongoHelper.connectDb().catch((err) => { console.log('unable to connect '); })
    let auth_router = await import ('./Routes/auth');
    app.use(express.json(), cors({
        origin: 
        ['http://localhost:3000', 'http://127.0.0.1:3000','http://0.0.0.0:3000']
        , credentials: true, 
    }), PollRouter , auth_router.default)
    
    app.listen(PORT, () => {
        console.log('Listening to port ' + PORT);
    })

}
