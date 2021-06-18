//*Const and Let 
const userName = 'Rk';
// userName = 'Rutwik';
let age = 20;
age = 19;

// function add(a: number, b: number) {
//   let result;
//   result = a + b;
//   return result;
// }

// if (age > 20) {
//   let isOld = true;
// }

// console.log(isOld);

// console.log(result);

//*arrow functions
// const add = (a:number, b:number = 1) => a+b;

// const printOutput: (a: number | string) => void =  output => console.log(output);

// const button = document.querySelector('button');

// if(button){
//     button.addEventListener('click',event=>console.log(event));
// }

// printOutput(add(5,2));
// printOutput(add(5));


//*arrays and objects
//Array spread operator
const hobbies = ['Sports', 'Reading'];
const activeHobbies = ['Hiking', ...hobbies];
// OR
const activeHobbies1 = ['Hiking'];
activeHobbies1.push(...hobbies);
//Object spread operator
const person = {name:'Rutwik', age:22}
const copyPerson = {...person}
//Rest parameters
const add = function(...numbers:number[]){
    // let result=0;
    // for(let number in numbers){  
    //     result += numbers[+number];
    // }
    // return result
                //OR
    return numbers.reduce((curResult, curValue)=>{
        return curResult + curValue;
    },0)

    // let result=0;
    // numbers.forEach((curValue)=>{
    //     result+=curValue;
    // })
    // return result;
}

console.log(add(10,10,10,6));

//* object, array destructuring
const [h1,h2]=hobbies;
console.log(h1,h2);
const {age:userAge}=person;
console.log(age,userAge);