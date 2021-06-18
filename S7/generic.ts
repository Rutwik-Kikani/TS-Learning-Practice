//? -------------- // Built in Generic types // -------------- ?//
//*1.Array<Type>
// const names:Array<string> = []
// names[0].split(' ');
//*2.Promise<Type>
// const promise:Promise<string> = new Promise((resolve, reject)=>{
//     setTimeout(() => {
//         resolve('This is Done!') //resolve the string so... above type would be string
//     },2000)
// })

// promise.then(data => {
//     data.split(' ');
// })
//? -------------- // Generic Function // -------------- ?//

function merge(objA:object, objB:object){
    return Object.assign(objA, objB)
}

const mergeObj = merge({name: "rutwik"},{age: 20}); //implicitly return as type 'object'
// console.log(mergeObj.name); //TypeScript don't know that 'mergeObj' has property 'name'
//* explicitly type cast a return object, for accessing property in return object.
const mergeObj1 = merge({name:'zk'},{age:20,hobbies:['Sports','Writing']}) as {name:string,age:number,hobbies:string[]}
console.log(mergeObj1, mergeObj1.name) //

//? Note:---------------------------------------------------------
//? genericMerge<T,U> ---> here T and U represent a any type  
//? genericMerge<T extends object, U extends object> ---> here T and U represent a any kind of object, not other than object.
//? T and U will be assigned a type at time of function call (when genericMerge function call)    
//? implicit return type will be 'T & U' (intersection of T and U)  

function genericMerge<T extends object,U extends object>(objA:T, objB:U){
    return Object.assign(objA, objB);
}
//syntax A
const mergeObj2 = genericMerge({name:'Zakir'},{age:20,hobbies:['Sports','Reading']})
console.log(mergeObj2.age) //will not give a error
//syntax B
const mergeObj3 = genericMerge<{name:string,study:string},{age:number}>({name:'Pakir', study:'12th'},{age:16});
console.log(mergeObj3.study) //will not give an error

//? -------------- // Working with Constrain // -------------- ?//
//*syntax 
//*function [functionName] <T extends [Type], U extends [Type]> (a: T, b: U){...}

// this will not gives error for function genericMerge<T,U>(objA:T, objB:U){...}
// error should be occur because 2nd argument is not object.
// console.log(genericMerge({name:"Pakirshah",age:50},30)) 
console.log(genericMerge({name:"Pakirshah",age:50},{age:30}));


//? -------------- // Another Generic function // -------------- ?//

interface Lengthily {
    length: number;
}
// remove a return type of function and hover over function and function-called.
function countAndDescribe<T extends Lengthily>(element: T) : [T,string]{
    let describeText = 'Got no value';
    if(element.length === 1){
        describeText ='Got 1 element';
    }else if(element.length > 1){
        describeText ='Got '+ element.length+' elements';
    }
    return [element, describeText]
}


console.log(countAndDescribe('Hi there!'));
console.log(countAndDescribe([1]));
console.log(countAndDescribe(['sports',1]));

//? -------------- // 'key of' constrain // -------------- ?//
// function extractAndCount(obj: object, key: string){
    //return obj[key] //typescript don;t know that key is exist in obj. that's why it's give an error.   
// }

function extractAndConvert<T extends object, U extends keyof T>(obj:T, key:U){
    return 'Value of '+ obj[key];
}

extractAndConvert({name:'Max'},'name');

//? -------------- // Generic classes // -------------- ?//

class DataStorage <T>{
    private data: T[] = [];

    addItem(item: T){
        this.data.push(item);
    }

    removeItem(item: T){
        //check for -1 so by mistake it will not remove last item
        //comment it and run you will find difference
        if(this.data.indexOf(item)===-1){
            return
        }
        this.data.splice(this.data.indexOf(item),1);
    }

    getItem(){
        return [...this.data];
    }
}

const stringDataStorage = new DataStorage <string>();
stringDataStorage.addItem('Rutwik');
stringDataStorage.addItem('Pkisha');
stringDataStorage.addItem('holasha');
stringDataStorage.removeItem('Rutwik');
stringDataStorage.removeItem('rutwik');// indexof will retrun -1 so last item will be remove with out if check on removeItem
console.log(stringDataStorage.getItem());

const numberDataStorage = new DataStorage<number>();
// ...likewise

const objectDataStorage = new DataStorage <object>();
const rObj = {name: 'rk'};
const pObj = {name:'pk'};
const sObj = {name:'sk'};
objectDataStorage.addItem(rObj);
objectDataStorage.addItem({name:'qk'});
objectDataStorage.addItem(pObj);
objectDataStorage.addItem(sObj);
//object are reference type
objectDataStorage.removeItem({name:'rk'}) //indexof will retrun -1 so last item will be remove with out if check on removeItem
objectDataStorage.removeItem(sObj);
console.log(objectDataStorage.getItem());

//? -------------- // Generic Utility Types// -------------- ?//
//Partial
interface CourseGoal{
    title:string,
    description: string,
    completeUntil: Date,
}

function createCourseGoal(title:string, description: string, date: Date): CourseGoal{
    // 1st way to return object of structure CourseGoal
    // return{title:title,description:description,completeUntil:date}

    //2nd way 
    //Constructs a type with all properties of Type set to optional.
    let courseGoal:Partial<CourseGoal> ={}
    courseGoal.title=title;
    courseGoal.description=description;
    courseGoal.completeUntil=date;
    return courseGoal as CourseGoal;

}
//Readonly 
const names:Readonly<string[]> = ["Rj","Rk"];
//'names' is readonly so that's why this gives an error
// names.push("Gk");
// names.pop()

//? Note: -----------
//? Generics help you create data structures --->
//? that work together or wrap values of a broad variety of types 
//? (e.g. an array that can hold any type of data).

//? Union types would be more common for following.--->
//? In cases where you have fixed set of types that allowed in certain place 
//? (eg. a function parameter that's either a string aor number)

