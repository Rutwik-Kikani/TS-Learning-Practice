function add(n1:number, n2:number){
    return n1+n2;
}

function printResult(num: number) : void{
    console.log('Result: '+num)
}

printResult(add(5,12));// print result of add(5,12)
// console.log(printResult(5)); return undefined 

// let combineValues: Function;
let combineValues: (a: number, b: number) => number;

combineValues = add;
// combineValues = printResult;
// combineValues = 5
console.log(combineValues(8,8));

function addAndHandle(n1:number, n2:number, cb:(num:number) => void){
    const result = n1 + n2;
    cb(result);
}

addAndHandle(10,20,(result)=>{
    console.log(result);
})