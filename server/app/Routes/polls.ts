import { Router, Request, Response } from "express";
import { getUserData, verifyUser } from "../middlewares";
import mongo from "../Utils/Helpers/mongo";
import { User } from "../Utils/models/db_models";
import { generateRandomQuestionId } from "../Utils/utils";
const router = Router();

router.get(
    '/fetch_poll',
    function (req: Request, res: Response) {
        let query_parms = req.query;
        if (!query_parms.id) { res.statusCode = 400; res.json({ error: true, msg: "Invalid query parameters." }); return; }
        mongo.fetchQuestionData(query_parms.id as string).
            then(question_data => {
                res.json(question_data).end();
            }).catch(err => {
                console.error(err);
                res.statusCode = 400; res.json({ error: false, msg: "Success" }).end(); return;
            })
    }
)
router.post(
    '/check_vote',
    function (req: Request, res: Response) {
        let data = req.body;
        let ip_addr = req.connection.remoteAddress || req.socket.remoteAddress as string;
        if (data.question_id, ip_addr) {
            mongo.isVotedToPoll(data.question_id, ip_addr.toString()).then(is_voted => {
                res.json({ is_voted, ip_addr: ip_addr.toString() }); return
            }).catch(err => { res.statusCode = 500; res.json({ error: true, msg: err }).end() })
        }
    }
)

/* router.post(
    '/add_visit',
    function (req, res) {
        let body = req.body as any;
        if(!body.question_id){
            res.json({error:true,msg:"Question id not set."}).end();return;
        }
        let ip_addr = req.connection.remoteAddress || req.socket.remoteAddress as string;
    }
) */
router.get('/add_visit', (req, res) => {
    try {
        let ip_addr = req.connection.remoteAddress || req.socket.remoteAddress as string;
        let question_id = req.query['question_id'] as string;
        if (!ip_addr) { res.statusCode = 500; res.json({ error: true, msg: "Unable to get remote ip_address from request." }).end(); return; }
        if (!question_id) { res.statusCode = 401; res.json({ error: true, msg: "Invalid query parameters." }).end(); return; }

        mongo.addVisit(question_id, ip_addr).then(({ error, msg }) => {
            if (error) {
                res.statusCode = 406;
                res.json({ error, msg }).end(); return;
            } res.json({ error, msg }).end(); return;

        }).catch((err) => {
            res.statusCode = 500;
            res.json({ error: true, msg: err })
        })
    }
    catch (err) {
        res.json({ error: true, err: err }).end(); return;
    }
})

router.get(
    '/vote',
    async function (req: Request, res: Response) {
        let query_parms = req.query;

        let ip_addr = req.connection.remoteAddress || req.socket.remoteAddress as string;
        if (!(query_parms.question_id && query_parms.option_index)) {
            res.statusCode = 400;
            res.json({ msg: 'Invalid query parameters 1!' });
            return;
        }
        try {
            let is_already_voted = await mongo.isVotedToPoll(query_parms.question_id as string, ip_addr);
            if (is_already_voted) {
                res.statusCode = 400; res.json({ is_already_voted: true }).end(); return
            }
        } catch (error) {
            res.statusCode = 500; res.json({ error: error }).end()
        }

        let option_index = parseInt(query_parms.option_index as string);

        if (option_index === NaN || option_index == NaN) {
            res.statusCode = 400;
            res.json({ msg: 'Invalid query parameters .Option_index in is not valid integer.' });
            return;
        }
        let question_id = query_parms.question_id as string;
        mongo.voteToQuestion(question_id, option_index, ip_addr.toString()).then(doc_update_result => {
            res.send().end()
        }).catch(err => {
            res.statusCode = 500; res.send(err); return;
        })

    })

router.post(
    '/create', getUserData,
    function (req: Request, res: Response) {
        const data = req.body;

        if (!(data.options && data.question &&  data.question_title)) {
            res.statusCode = 400; // ? ==================> 400 Bad Request <==================
            res.send('Insufficient data!'); return;
        }
        if (data.options.length < 2) {
            res.statusCode = 203 //? ==================>  203 Non-Authoritative Information <==================
            res.send('Number of \'options\' is less than 2.'); return
        }
        var question_id = generateRandomQuestionId();
        var created_time = new Date();
        const _req = req as any;
        const user_data = _req.user as User;
        var created_by = null;

        if (user_data) {
            created_by = user_data.username
        }
        mongo.createNewPoll({
            created_time,
            options: data.options,
            question: data.question,
            question_id: question_id,
            total_votes: 0,
            question_description: data.question_description ? data.question_description : null,
            question_title: data.question_title,
            created_date: new Date().toLocaleDateString(),
            expire_at: data.expire_at ? new Date(data.expire_at) : null,
            visits: [], no_of_visits: 0, created_by
        }).then((doc) => {
            res.statusCode = 201;  //? ==================>  201 Created <==================
            res.send({ created_time, question_id }); return
        }).catch(err => {
            console.log(err);
            res.statusCode = 500;  //? ==================>  500 Internal server error <==================
            res.send(); return
        });
    })

export default router;