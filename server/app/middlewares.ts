import { Response, Request, NextFunction } from "express";

export function cookie_parser(req: Request, res: Response, next: NextFunction) {
    let cookie_str = req.headers['cookie'];
    if (!cookie_str) { next(null); return; }
    var cookies:any = {}
    cookie_str?.split(';').forEach(pair => {
        let cookie = pair.split('=');
        console.log(cookie[1]);
        cookies[cookie[0]] = cookie[1];
    })
    req.cookies=cookies
    next(null); return;
}
