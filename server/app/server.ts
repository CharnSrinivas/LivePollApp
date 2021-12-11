import express from 'express';
import MongoHelper from './Utils/Helpers/mongo';
import PollRouter from './Routes/polls';
import cors from 'cors'
import { getClientIp } from 'request-ip'
import { cookie_parser } from './middlewares';
const PORT = process.env.PORT || 5000;
const app = express();

export const jwt_secret_key = process.env['SECRET_KEY'] || '123466789';

export default async function main() {
    await MongoHelper.connectDb().catch((err) => { console.log('unable to connect '); })
    let auth_router = await import('./Routes/auth');
    let general_router = await import('./Routes/routes');

    app.set('trust-proxy', true);
    app.enable('trust proxy');

    app.get('/', (req, res) => {
        res.send('<h1>This is api for live poll app </h1>');
        console.log("\n +++++++++++++++++++ Ip address +++++++++++++");
        console.log(getClientIp(req));
        console.log(req.ip);
        console.log(req.socket.remoteAddress)
        console.log("\n +++++++++++++++++++ Ip address +++++++++++++\n");
    }
    )

    app.use(express.json(), cookie_parser, cors({
        origin:
            [
                'http://localhost:3000',
                'http://127.0.0.1:3000',
                'http://0.0.0.0:3000',
                'http://192.168.42.13:3000',
                'https://live-poll-app.herokuapp.com',
                'https://charnsrinivas.github.io'
            ]
        , credentials: true,
    }), PollRouter, auth_router.default, general_router.default)


    app.listen(PORT, () => {
        console.log('Listening to port ' + PORT);
    })

}
