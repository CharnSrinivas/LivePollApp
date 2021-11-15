export function generateRandomQuestionId(length?:number)
{
    let len = length? length : 4;
    var result = '';
    let chars = ['ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz','0123456789'];
    for (let i = 0; i < len; i++) {
        let char_list = chars[Math.floor(Math.random()* chars.length)];
        result+= char_list[Math.floor(Math.random()) * char_list.length];
    }
    return result;
}