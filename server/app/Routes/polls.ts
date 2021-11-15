import { Router, Request, Response } from "express";
import mongo from "../Utils/Helpers/mongo";
import { generateRandomQuestionId } from "../Utils/utils";
const router = Router();


router.get(
    '/',
    function (req: Request, res: Response) {
        let query_parms = req.query;
        if(!query_parms.id){res.statusCode=400;res.send();return;}
        mongo.fetchQuestionData(query_parms.id as string).
        then(question_data=>{
            res.json(question_data);
        }).catch(err=>{
            console.error(err);
            res.statusCode=400;res.send();return;
        })
        
    }
)



router.get(
    '/vote',
    function (req: Request, res: Response) {
        let query_parms = { question_id: 'AAAA', option_index: '2' }
        //let query_parms= req.query;
        if (!(query_parms.question_id && query_parms.option_index)) {
            res.statusCode = 400;
            res.send('Invalid query parameters!');
            return;
        }
        if (!parseInt(query_parms.option_index)) {
            res.statusCode = 400;
            res.send('Invalid query parameters!'); return;
        }
        let question_id = query_parms.question_id as string;
        let option_index = parseInt(query_parms.option_index as string);
        mongo.voteToQuestion(question_id, option_index).then(result => {
            res.send('voted'); return;
        }).catch(err => {
            res.statusCode = 500; res.send(err); return;
        })

    })

router.post(
    '/create',
    function (req: Request, res: Response) {
        const data = { options: ['opt-1', 'opt-2', 'opt-3'], question_id: 'AAAA', question: 'This is Question?' }
        //const data =  req.body;

        if (!(data.options && data.question)) {
            res.statusCode = 400; // ? ==================> 400 Bad Request <==================
            res.send()
        }
        if (data.options.length < 2) {
            res.statusCode = 203 //? ==================>  203 Non-Authoritative Information <==================
            res.send('Number of \'options\' is less than 2.');
        }
        var question_id = data.question_id ? data.question_id : generateRandomQuestionId();
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