import { NextFunction, Request, Response } from "express"
// export const setCanonicalTag = (req: Request, res: Response, next: NextFunction) => {

// }
export const sendIndexFile = (req: Request, res: Response, next: NextFunction) => {
    var req_path = req.originalUrl;
    if (req_path == '/signin') {
        // req_path = IndexHtml;
    }
}