import { Router, Request, Response } from "express";
import mongo from "../Utils/Helpers/mongo";
import { generateRandomQuestionId } from "../Utils/utils";
const router = Router();


router.get(
    '/fetch_poll',
    function (req: Request, res: Response) {
        let query_parms = req.query;
        if (!query_parms.id) { res.statusCode = 400; res.send(); return; }
        mongo.fetchQuestionData(query_parms.id as string).
            then(question_data => {                
                res.json(question_data).end();
            }).catch(err => {
                console.error(err);
                res.statusCode = 400; res.send().end()
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
            }).catch(err => { res.statusCode = 500; res.send(err).end() })
        }
    }
)

router.get(
    '/vote',
    async function (req: Request, res: Response) {
        // let query_parms = { question_id: 'AAAA', option_index: '2' }
        let query_parms = req.query;

        let ip_addr = req.connection.remoteAddress || req.socket.remoteAddress as string;
        if (!(query_parms.question_id && query_parms.option_index)) {
            res.statusCode = 400;
            res.json({ msg: 'Invalid query parameters 1!' });
            return;
        }
        try {
            let is_already_voted = await mongo.isVotedToPoll(query_parms.question_id as string, ip_addr);
            if (is_already_voted) { res.statusCode = 400; res.json({is_already_voted:true}).end() }
        } catch (error) {
            res.statusCode = 500; res.json({error:error}).end()
        }

        let option_index = parseInt(query_parms.option_index as string);

        if (option_index === NaN || option_index == NaN) {
            res.statusCode = 400;
            res.json({ msg: 'Invalid query parameters .Option_index in is not valid integer.' });
            return;
        }
        let question_id = query_parms.question_id as string;
        mongo.voteToQuestion(question_id, option_index, ip_addr.toString()).then(doc_update_result => {
            res.json({...doc_update_result}).end()
        }).catch(err => {
            res.statusCode = 500; res.send(err); return;
        })

    })

router.post(
    '/create',
    function (req: Request, res: Response) {
        const data = req.body;

        if (!(data.options && data.question && data.question_description && data.question_title)) {
            res.statusCode = 400; // ? ==================> 400 Bad Request <==================
            res.send('Insufficient data!'); return;
        }
        if (data.options.length < 2) {
            res.statusCode = 203 //? ==================>  203 Non-Authoritative Information <==================
            res.send('Number of \'options\' is less than 2.'); return
        }
        var question_id = generateRandomQuestionId();
        var created_time = new Date();
        mongo.createNewPoll({
            created_time,
            options: data.options,
            question: data.question,
            question_id: question_id,
            total_votes: 0, 
            question_description: data.question_description, 
            question_title: data.question_title,
            created_date:new Date().toLocaleDateString(),
            expire_at:data.expire_at? new Date(data.expire_at) : null
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