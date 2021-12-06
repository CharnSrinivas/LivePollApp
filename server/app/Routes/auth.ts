import { Router, Request } from 'express'
import { Register, Login } from '../Utils/models/auth_models';
import MongoHelper from '../Utils/Helpers/mongo';
import jwt from 'jsonwebtoken'
import { User } from '../Utils/models/db_models';
import { DB_USERS_COLL_NAME } from '../../config';
import bcrypt from 'bcrypt'
import { cookie_parser, verifyUser } from '../middlewares';
import { v4 as uuid } from 'uuid'
import mongo from '../Utils/Helpers/mongo';
import { jwt_secret_key } from '../server';
const users_coll = MongoHelper.db!.collection(DB_USERS_COLL_NAME);
const auth_router = Router();

auth_router.post('/register', (req, res) => {
    let body = req.body as Register;
    if (!users_coll) { res.statusCode = 500; res.json({ error: true, msg: "User collection not found in db." }); return; }
    if (body.username && body.password) {
        if (body.username.length > 5 && body.password.length > 8 && body.username.length < 25) {
            users_coll.findOne({ username: body.username }).then((db_user) => {
                if (db_user) {
                    res.statusMessage = "Username already exists,Please try again!";
                    res.statusCode = 401;
                    res.json({ error: true, msg: "Username already exists,Please try again!" }); return;
                } else {
                    bcrypt.hash(body.password, 12)
                        .then((password) => {
                            const user: User = {
                                username: body.username, password: password, polls_ids: [],xp:0
                            }
                            users_coll.insertOne(user, (err, user_document) => {
                                if (err) {
                                    res.statusCode = 500;
                                    res.statusMessage = err.name + "  : " + err.message;
                                    res.json({error:true,msg:err.name + "  : " + err.message}).end();return;
                                }
                                if(!user_document){
                                    res.statusCode = 500;
                                    res.json({error:true,msg:"Inserted document is empty."}).end();
                                    return;
                                }
                                const _id = user_document.insertedId.toString()
                                
                                const token = jwt.sign(_id, jwt_secret_key);
                                res.statusCode = 200;
                                res.cookie('auth-token', token, { sameSite: 'none', secure: true });
                                res.json({ error: false, msg: "Signed Up successfully!" }); return;
                            })
                        })
                }
            })

        }
        else {
            res.statusMessage = "Invalid email or password";
            res.statusCode = 401;
            res.json({ error: true, msg: "Invalid email or password" }); return;
        }
    } else {
        res.statusMessage = "Invalid email or password"; res.statusCode = 401
        res.json({ error: true, msg: "Invalid email or password" }); return;
    }

})


auth_router.get('/is_auth',verifyUser,(req,res)=>{
    res.json({error:false,is_auth:true})
})

auth_router.post('/login',  (req, res) => {

    const body = req.body as Login;

        users_coll.findOne({ username: body.username }).then((user) => {
            if (user) {
                res.statusCode = 200;
                const user_id = user._id.toString();
                const token = jwt.sign(user_id, jwt_secret_key);
                res.cookie('auth-token', token, { sameSite: 'none', secure: true });
                res.json({ error: false, msg: "Signed Up successfully!" }); return;
            } else {
                res.statusCode = 400;
                res.statusMessage = "Invalid username or password";
                res.json({ error: true, msg: "Invalid email or password" }); return;
            }
        }).catch(err =>{
    console.log(err);
        res.statusCode = 500;
        res.statusMessage = "Internal server error";
        res.json({ error: true, msg: 'Cookies is manipulated!' }); return;
        })

})

export default auth_router;
