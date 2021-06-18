//*interface defines a structure of object.
// simple example
// interface Person{
//     name: string;
//     age: number;
//     greet(phrase:string):void;
// }

//we can use custom type in replacement of interface.
//* custom type is more flexible (we can use union type in custom type) 
//* -and interface is more cleaner.
//* custom type is not provide the functionality of readonly.
//like below.
// type Person = {
//     name: string;
//     age: number;
//     greet(phrase:string):void;
// }

//In case some object needs to have 'name' and some object needs to have both 'name' and 'greet' property
//that time extending interface come in handy.
interface Named{
    readonly name:string; //*'private' and 'public' access modifier can't be used inside interface.
    outputName?: string;  //* optional property of interface: [property-name]? .
    //eg. of optional method //* optionalMethod?(param1:[typeof param1],...):[return type of method]
}
interface Greetable extends Named {
    greet(greetText: string): void;
}

//* Class is not bound to implement the optional property of interface.
class Person implements Greetable{
    name:string;
    age: number = 30;
    constructor(name: string){
        this.name=name;  //* readonly property can only assign one time then it's never changes.
    }
    greet(text:string){
        console.log(text+' '+this.name)
    }
}

// let user1:Person; // you csn use a person class as type of user1
// user1={
//     name:'Rutwik',
//     age:30,
//     greet(phrase:string){
//         console.log(phrase+' '+this.name)
//     }
// }

let user1:Greetable; //* interface can be used as type for a constant or variable.
user1 = new Person('Rutwik');
user1.greet('Hi - I am ');
console.log("This is a user1: ",user1);
// user1.name = "Rutwik" //* Error can't assign name it is readonly 


//* use interface to define function type
//* simple way to define function type using custom type
//type AddFunction = (a:number, b:number) => number
//*  define function using interface
interface AddFunction{
    (a:number, b:number):number;
}

const add:AddFunction = (n1:number, n2:number) => {
    return n1+n2;
}
console.log("Add 5 and 2 :",add(5,2));

//? Note: 
//? Interface can extends more than one interface 
//* eg:interface Greetable extends Named, AnotherInterface {...}
//? Classes can extends only one class but implement more than one interface
//* class Account extends Department implements Greetable, Named {...}