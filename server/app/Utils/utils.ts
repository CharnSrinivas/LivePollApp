import { v4 as uuid_v4 } from "uuid";

export function generateRandomQuestionId(length?: number) {
    let len = length ? length : 4;
    var result = uuid_v4().slice(0,len);
    
    // let chars = ['ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz','0123456789'];
    // for (let i = 0; i < len; i++) {
    //     let char_list = chars[Math.floor(Math.random()* chars.length)];
    //     result+= char_list[Math.floor(Math.random()) * char_list.length];
    // }
    return result;
}