//?---------------// INTERSECTION TYPE //----------------?//
//interface Admin {...}
type Admin = {
    name:string;
    privileges:string[];
}
//interface Employee {...}
type Employee = {
    name:string;
    startDate:Date;
}

//interface ElevatedEmployee extends Admin, Employee {...}
type ElevatedEmployee =  Admin & Employee;

const e1 : ElevatedEmployee = {
    name:'Rutwik',
    privileges:['create-server'],
    startDate:new Date(),
}

type Combinable = string | number;
type Numeric = number | boolean;

type intersectionType = Combinable & Numeric;

//?---------------// TYPE GUARDS & FUNCTION OVERLOADS //----------------?//

//* Type guards on primitive type
// function AddORConcatenate which allow 'number' | 'string' as argument parameters
// and base on string it's concatenate and base on number it will add number at runtime
function AddORConcatenate (a:number,b:number): number;
function AddORConcatenate (a:string,b:string): string;
function AddORConcatenate (a: Combinable, b:Combinable) {
    // return a+b will give an error, so runtime check is necessary.
    if(typeof a === 'string' || typeof b === 'string'){
        return a.toString()+b.toString();
    }
    return a+b;
}
const result = AddORConcatenate("Rutwik"," Kikani");
result.split(' ')
const result1 = AddORConcatenate(5,6);
//result1.spilt(' ')//* gives an error

//* Type Guard on Object who has structure of custom type 
type UnknownEmployee = Employee | Admin

// function printEmployeeInformation will take 'Employee' | 'Admin' as argument parameters
// base on it's of type 'Admin' or 'Employee', function will print information.
function printEmployeeInformation(emp: UnknownEmployee){
    console.log('Name: '+emp.name); //common property so not give error
    // if(typeof emp === 'object'){...}// this will not work because emp is always object type
    // if(emp.privileges){...}// this will not work as guard uncomment it and see
    if('privileges' in emp){
        console.log('Privileges: '+emp.privileges);
    }
    if('startDate' in emp){
        console.log('Start Date: '+emp.startDate);
    }
}

printEmployeeInformation(e1);
printEmployeeInformation({name:'Hoal', startDate:new Date()});

//* Type Guard on Object who is created using class
class Car{
    drive(){
        console.log('driving...');
    }
}
class Truck{
    drive(){
        console.log('driving...');
    }
    loadCargo(amount: number){
        console.log('loading cargo ...: '+ amount);
    }
}
const v1 = new Car();
const v2 = new Truck();

type Vehicle = Car | Truck;
function useVehicle(vehicle: Vehicle){
    vehicle.drive();
    //if('loadCargo' in vehicle ){...} //this will work also
    //* you can use 'instanceof' keyword while using classes because javascript know about classes while "Interfaces" is unknown for javascript
    if(vehicle instanceof Truck){
        vehicle.loadCargo(100)
    }
}

useVehicle(v1);
useVehicle(v2);

//?---------------// DISCRIMINATED UNIONS //----------------?//

//* use discriminated property for object or interface.
interface Bird{
    type: 'bird'; //this is a object literal like const n1:5   
    flyingSpeed:number;
}
interface Horse{
    type: 'horse';
    runningSpeed: number;
}

type Animal = Bird | Horse;
function moveAnimal(animal: Animal){
    let speed;
    switch(animal.type){
        case 'bird':
            speed=animal.flyingSpeed;
            break;
        case 'horse':
            speed=animal.runningSpeed;
            break;
    }
    console.log('Moving Speed:'+ speed);
}

moveAnimal({type: 'bird', flyingSpeed:10});

//?---------------// TYPE CASTING //----------------?//

// below querySelector implicit type casting will be HTMLParagraphElement | null
// const paragraphElement = document.querySelector('p');
// while getElementById while has implicit type as HTMLElement | null
// const paragraphElement = document.getElementById('output-paragraph');

//*1st syntax 
// const userInputElement = <HTMLInputElement>document.getElementById('user-input')!;
//*2nd syntax
//A for null use '!' if sure it's not return null
const userInputElement1 = document.getElementById('user-input')! as HTMLInputElement;
userInputElement1.value = 'Hi universe';
//B for null add if check
const userInputElement2 = document.getElementById('user-input')
if(userInputElement2){
    (userInputElement2 as HTMLInputElement).value="Hi Universe!!";
}


//?---------------// INDEX TYPE //----------------?//

interface ErrorContainer{
    //need to define structure of object where not only sure there is 
    //properties name of type string and value of that properties are also a string
    //eg {email: 'Should be required', username: 'Should be required'}

    //id: number //this is gives error don't allow you to create a any other property whose value is other than string
    [propertyName: string]: string;
}

const errorBag: ErrorContainer = {
    email:'Should be valid email',
    username:'Should be valid username',
}

//?---------------// Optional Chain & Nullish Coalescing//----------------?//

const fetchUserData = {
    id:'id',
    name:'rutwik',
    job:{title:'Jr. associative Engineer', description:'Work as Employee'}
}

// console.log(fetchUserData.job && fetchUserData.job.title)
console.log(fetchUserData?.job?.title);

const uInput='';
const storeData = uInput || 'Default';
const storeData1 = uInput ?? 'Default';
console.log(storeData, storeData1);