"use strict";
exports.__esModule = true;
exports.generateRandomQuestionId = void 0;
function generateRandomQuestionId(length) {
    var len = length ? length : 4;
    var result = '';
    var chars = ['ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz', '0123456789'];
    for (var i = 0; i < len; i++) {
        var char_list = chars[Math.floor(Math.random() * chars.length)];
        result += char_list[Math.floor(Math.random()) * char_list.length];
    }
    return result;
}
exports.generateRandomQuestionId = generateRandomQuestionId;
