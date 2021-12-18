import { Router, Request, Response } from "express";
import { verifyUser } from "../middlewares";
import mongo from "../Utils/Helpers/mongo";
import { User, DbQuestion } from "../Utils/models/db_models";

const router = Router();



router.get('/dashboard', verifyUser, (req, res) => {
    let _req = req as any;
    var { polls_ids, username, xp, profile_img } = _req.user as User;
    var questions_data: any[] = []
    mongo.fetchQuestionCreatedByUser(username).then(question_list => {
        questions_data = question_list;
        let data = {
            username, polls_ids, xp, profile_img, questions_data
        }

        res.json(data).end(); return;
    }).catch(err => {
        res.json({ error: true, msg: err }).end();
        return
    })
})

router.get('/', (req, res) => {

})

export default router;
