"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomQuestionId = void 0;
var uuid_1 = require("uuid");
function generateRandomQuestionId(length) {
    var len = length ? length : 4;
    var result = (0, uuid_1.v4)().slice(0, len);
    // let chars = ['ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz','0123456789'];
    // for (let i = 0; i < len; i++) {
    //     let char_list = chars[Math.floor(Math.random()* chars.length)];
    //     result+= char_list[Math.floor(Math.random()) * char_list.length];
    // }
    return result;
}
exports.generateRandomQuestionId = generateRandomQuestionId;
