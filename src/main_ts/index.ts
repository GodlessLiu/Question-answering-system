const enumNumber = ['一','二','三','四','五','六','七','八','九','十','十一','十二','十三','十四','十五','十六','十七','十八','十九']



export function numberConversion(n: number) {
    return enumNumber[n]
}

export function getLengthWithoutEmpty(strs:string[]){
    let l = strs.length
    for (const i of strs) {
        if (i === '') l--
    }
    return l
}