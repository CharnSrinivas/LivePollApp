export interface User{
    username:string;
    password:string;
    polls_ids:string[]
    profile_img?:string;
    xp:number;
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
    created_date:string;
    expire_at:Date|null
    total_votes:number
    question_description:string;
    visits:string[];
    no_of_visits:number
    created_by:string |null;

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
    created_date:string;
    votes:DbVote[];
    total_votes:number;
    question_description:string;
    visits:string[];
    no_of_visits:number
    created_by:string|null;
}