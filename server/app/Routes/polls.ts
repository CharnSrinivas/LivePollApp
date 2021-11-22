import { Router, Request, Response } from "express";
import mongo from "../Utils/Helpers/mongo";
import { generateRandomQuestionId } from "../Utils/utils";
const router = Router();


router.get(
    '/fetch_poll',
    function (req: Request, res: Response) {
        console.log(req.connection.remoteAddress, req.socket.remoteAddress);
        var forwardedIpsStr = req.header('x-forwarded-for');
        console.log(forwardedIpsStr);
        console.log(req.ip, req.ips);

        let query_parms = req.query;
        if (!query_parms.id) { res.statusCode = 400; res.send(); return; }
        mongo.fetchQuestionData(query_parms.id as string).
            then(question_data => {
                res.json(question_data);
            }).catch(err => {
                console.error(err);
                res.statusCode = 400; res.send(); return;
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
            }).catch(err => { res.statusCode = 500; res.send(err); return; })
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
            res.send('Invalid query parameters!');
            return;
        }
        try {
            let is_already_voted = await mongo.isVotedToPoll(query_parms.question_id as string, ip_addr);
            if (is_already_voted) { res.statusCode = 400; res.send("You have already voted to this poll."); return; }
        } catch (error) {
            res.statusCode = 500; res.send(error); return;
        }

        let option_index = parseInt(query_parms.option_index as string);
        if (!option_index) {
            res.statusCode = 400;
            res.send('Invalid query parameters!'); return;
        }
        let question_id = query_parms.question_id as string;
        mongo.voteToQuestion(question_id, option_index, ip_addr.toString()).then(doc_update_result => {
            res.send('voted'); return;
        }).catch(err => {
            res.statusCode = 500; res.send(err); return;
        })

    })

router.post(
    '/create',
    function (req: Request, res: Response) {
        const data = req.body;
        console.log(data);

        if (!(data.options && data.question)) {
            res.statusCode = 400; // ? ==================> 400 Bad Request <==================
            res.send('Insufficient query parameters')
        }
        if (data.options.length < 2) {
            res.statusCode = 203 //? ==================>  203 Non-Authoritative Information <==================
            res.send('Number of \'options\' is less than 2.');
        }
        var question_id = generateRandomQuestionId();
        var created_time = new Date();
        mongo.createNewPoll({
            created_time,
            options: data.options,
            question: data.question,
            question_id: question_id
        }).then((doc) => {
            console.log('\n\t\tcreated...\n');
            res.statusCode = 201;  //? ==================>  201 Created <==================
            res.send({ created_time, question_id })
        }).catch(err => {
            console.log(err);
            res.statusCode = 500;  //? ==================>  500 Internal server error <==================
            res.send();
        });
    })

export default router;