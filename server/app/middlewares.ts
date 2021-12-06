import { Response, Request, NextFunction } from "express";
import mongo from "./Utils/Helpers/mongo";
import jwt from "jsonwebtoken";
import { jwt_secret_key } from "./server";
import { ObjectId } from "mongodb";

export function cookie_parser(req: Request, res: Response, next: NextFunction) {
    let cookie_str = req.headers['cookie'];
    if (!cookie_str) { next(null); return; }
    var cookies: any = {}
    cookie_str?.split(';').forEach(pair => {
        let cookie = pair.split('=');
        cookies[cookie[0]] = cookie[1];
    })
    req.cookies = cookies
    next(null); return;
}

export function verifyUser(req: Request, res: Response, next: NextFunction) {
    if (!req.cookies) {
        res.statusCode = 500;
        res.statusMessage = "Cookies are empty"
        res.json({ error: true, msg: "Cookies missing" }); return;
    }
    const token: string | undefined = req.cookies['auth-token']
    if (!token) {
        res.statusCode = 401;
        res.statusMessage = "Unauthorize access!"
        res.json({ error: true, msg: "auth-token is missing" }); return;
    }
    const id = jwt.verify(token, jwt_secret_key).toString();
    const _id = new ObjectId(id);
    mongo.findUser(_id).then(user_data => {
        if (!user_data) {
            res.statusCode = 401;
            res.statusMessage = "Unauthorize access!"
            res.json({ error: true, msg: "Unauthorized access.", is_auth: false }); return;
        }
        let _req = req as any;
        _req.user = user_data;
        req = _req;
        next(); return;
    })
        .catch((err) => {
            res.json({ error: true, msg: err }).end(); return;
        })
}

export function getUserData(req: Request, res: Response, next: NextFunction) {
    if (!req.cookies) {
        next(); return;
    }
    const token: string | undefined = req.cookies['auth-token']
    if (!token) {
        next(); return;
    }
    const id = jwt.verify(token, jwt_secret_key).toString();
    const _id = new ObjectId(id);
    mongo.findUser(_id).then(user_data => {
        if (!user_data) {next();return}
        let _req = req as any;
        _req.user = user_data;
        req = _req;
        next(); return;
    })
        .catch((err) => {
            next(); return;
        })
}