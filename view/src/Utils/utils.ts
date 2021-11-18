import { SERVER_URL } from "../config";
const QUESTION_KEY = 'QUESTION_ID';
const POLL_KEY = 'POLL_KEY'
export function saveQuestionId(id: string) {
    localStorage.removeItem(QUESTION_KEY);
    localStorage.setItem(QUESTION_KEY, id);
}
export function getSavedQuestionId() {
    let id = localStorage.getItem(QUESTION_KEY);
    return id ? id : undefined;
}


export function savePollId(id: string) {
    localStorage.removeItem(POLL_KEY);
    localStorage.setItem(POLL_KEY, id);
}
export function getSavedPollId() {
    let id = localStorage.getItem(POLL_KEY);
    return id ? id : undefined;
}

export function sendQuestionData(data: { options: string[], question: string }): Promise<any> {

    return new Promise(function (res, rej) {
        fetch(`${SERVER_URL}/create`, { method: "POST", mode: 'cors', headers:{'Content-Type':'application/json'},body: JSON.stringify(data) }).then(fetch_res => {
            fetch_res.json().then(res_json => { res(res_json); });
        }).catch(err => rej(err));

    })

}

export function getQuestionData(id: string): Promise<Response> {
    return new Promise(function (res, rej) {
        fetch(`${SERVER_URL}/fetch_poll?id=${id}`, { method: "GET", mode: 'cors' }).then(fetch_res => {
            res(fetch_res);
        }).catch(err => rej(err));

    })
}

export function vote(question_id: string, option_index: number,onInValidQuestionId?:Function) {
    return new Promise(function (res, rej) {
        fetch(`${SERVER_URL}/vote?question_id=${question_id}&option_index=${option_index}`,
            { method: "GET", mode: 'cors'})
            .then(fetch_res => {
                res(fetch_res);
            }).catch(
                err => {
                    if (!err) {
                        rej();return
                    };
                    if(onInValidQuestionId)onInValidQuestionId();
                    rej(err);
                });
    })
}
export function check_vote(question_id:string):Promise<Response>
{
    return new Promise((res,rej)=>{
        fetch(`${SERVER_URL}/check_vote`,{method:'POST',mode:'cors',body:JSON.stringify({question_id})}).then(fetch_res=>{
            res(fetch_res);
        }).catch(err=>rej(err))
    })
}