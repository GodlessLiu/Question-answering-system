type QuestionType = 'radio' | 'checkbox' | 'judge' | 'blank'

interface BaseQuestionType {
    id: string;
    type: QuestionType;
    score:number;
    question: string;
    answers?: RadioType | CheckboxType | judgeType
}

type RadioAnswersType = string[]

type CheckboxAnswersType = string[]

type judgeAnswersType = string[]

interface Question extends BaseQuestionType{
}



//  --------------------------------


interface myAnswersType {
    type:QuestionType
    id:string
    answers:string[] | string 
}