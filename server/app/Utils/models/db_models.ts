export interface User{
    id:string;
    username:string;
    password:string;
}


export interface Option{
    index:number;
    option:string;
    no_of_polls:number;
}

export interface Question{
    question_id:string;
    question:string;
    options:string[];
    created_time:Date;

}
export interface DbVote{
    created_time:Date;
    ip_addr:string;
    name:string;
    option_index:number;
        
}
export interface DbQuestion{
    question_id:string;
    question:string;
    options:Option[];
    created_time:Date;
    votes:Db[]
}