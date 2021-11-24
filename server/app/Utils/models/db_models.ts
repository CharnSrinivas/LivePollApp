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
    question_title:string;
    question:string;
    options:string[];
    created_time:Date;
    total_votes:number
    question_description:string;
}
export interface DbVote{
    created_time:Date;
    ip_addr:string;
    name:string;
    option_index:number;
        
}
export interface DbQuestion{
    question_id:string;
    question_title:string;
    question:string;
    options:Option[];
    created_time:Date;
    votes:DbVote[];
    total_votes:number;
    question_description:string;

}