import { SERVER_URL } from "../config";
const QUESTION_KEY = 'QUESTION_ID';
const POLL_KEY = 'POLL_KEY'
export const saveQuestionId = (id: string) => {
    localStorage.removeItem(QUESTION_KEY);
    localStorage.setItem(QUESTION_KEY, id);
}
export const getSavedQuestionId = () => {
    let id = localStorage.getItem(QUESTION_KEY);
    return id ? id : undefined;
}


export const savePollId = (id: string) => {
    localStorage.removeItem(POLL_KEY);
    localStorage.setItem(POLL_KEY, id);
}
export const getSavedPollId = () => {
    let id = localStorage.getItem(POLL_KEY);
    return id ? id : undefined;
}

export const sendQuestionData = (data: { options: string[], question: string }): Promise<any> => {

    return new Promise((res, rej) => {
        try {
            fetch(`${SERVER_URL}/create`, { method: "POST", mode: 'cors', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }).then(fetch_res => {
                fetch_res.json().then(res_json => { res(res_json); });
            }).catch(err => rej(err));
        } catch (err) { rej(err); }
    })

}

export const getQuestionData = (id: string): Promise<Response> => {
    return new Promise(function (res, rej) {
        try {
            fetch(`${SERVER_URL}/fetch_poll?id=${id}`, { method: "GET", mode: 'cors' }).then(fetch_res => {
                res(fetch_res);
            }).catch(err => rej(err));
        } catch (err) { rej(err); }
    })
}

export function vote(question_id: string, option_index: number, onInValidQuestionId?: Function) {
    return new Promise(function (res, rej) {
        try {
            fetch(`${SERVER_URL}/vote?question_id=${question_id}&option_index=${option_index}`,
                { method: "GET", mode: 'cors' })
                .then(fetch_res => {
                    res(fetch_res);
                }).catch(
                    err => {
                        if (!err) {
                            rej(); return
                        };
                        if (onInValidQuestionId) onInValidQuestionId();
                        rej(err);
                    });
        }
        catch (err) { rej(err) }
    })
}
export function check_vote(question_id: string): Promise<Response> {
    return new Promise((res, rej) => {
        try {
            fetch(`${SERVER_URL}/check_vote`, { method: 'POST', mode: 'cors', body: JSON.stringify({ question_id }) }).then(fetch_res => {
                res(fetch_res);
            }).catch(err => rej(err))
        } catch (err) { rej(err); }
    })
}

export const timeAgo = (prevDate: Date): string => {
    const ms = new Date().getTime() - prevDate.getTime();
    const seconds = Math.floor(ms / 1000);

    if (seconds < 2) { return "a moment ago"; };
    if (seconds < 5) { return "few moments ago"; };
    if (seconds < 60) { return `${seconds} seconds ago.`; };
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) { 
        if(minutes ===1){
        return `${minutes} minute ago`; 
        }
        return `${minutes} minutes ago`; 
    };
    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
        if(hours === 1){
         return `${hours} hour ago` 
        }
         return `${hours} hours ago` 
        }
    const days = Math.floor(hours / 24);
    if(days < 7){
        if(days ===1){return `${days} day ago`}
        return `${days} days ago`
    }
    const weeks = Math.floor(days/7);
    if(days < 30){
        if(weeks ===1){return `${weeks} week ago`}
        return `${weeks} weeks ago`
    }
    const months = Math.floor(days/30);
    if(months < 12){
        if(months ===1){
            return `${months} month ago`
        }
        return `${months} months ago`
    }
    const years = Math.floor(months/12);
    if(years ===1){
    return`${years} year ago`;
    }
    return`${years} years ago`;
}