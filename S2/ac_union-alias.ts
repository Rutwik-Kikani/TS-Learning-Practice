type CombineType = number | string;
type CombineDescription = 'as-number' | 'as-string'

function combine(number1: CombineType, number2: CombineType, resultAs: CombineDescription) {
    let result;
    if (typeof number1 === 'number' && typeof number2 === 'number' || resultAs === 'as-number') {
        result = +number1 + +number2;
    } else {
        result = number1.toString() + number2.toString()
    }
    return result
    // if(resultAs === 'as-number'){
    //     return +result
    // }else{
    //     return result.toString()
    // }
}

const combineAges = combine(22, 12, 'as-number');
console.log(combineAges);//34

const combineStringAges = combine('22', '12', 'as-number')
console.log(combineStringAges);//34

const combineNames = combine('R', 'K', 'as-string');
console.log(combineNames);//rk

const combineNamesAsNumber = combine('R', 'K', 'as-number');
console.log(combineNamesAsNumber);//nan