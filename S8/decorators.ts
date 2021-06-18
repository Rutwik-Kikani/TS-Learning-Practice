
//? ---> Decorators -->?//
console.log("-------------Decorator--------------");
//? it is a function applied to class which executes at the time of class definition.
// function Logger(constructor:Function){
//     console.log('Logging...');
//     console.log(constructor);
// }
//? Decorator Factory --->
//? while calling Logger('Logging-Person') this will call a that anonymous function.
function Logger(LogString: string) {
    console.log('Logging Factory!!');
    return function (construction: Function) {
        console.log(LogString);
        console.log(construction);
    }
}


//? decorator which has execute when class is define
function WithTemplate(hookId: string, template: string) {
    // return function(_:Function){ //* '_' in parameter means this what ever comes in parameter 
    //* we don't care and also we are not using it in this function.
    console.log('WithTemplate Factory!!');
    return function (constructor: any) {
        console.log('WithTemplate Decorator!!');
        const hookEl = document.getElementById(hookId);
        const p1 = new constructor();
        if (hookEl) {
            hookEl.innerHTML = template
            hookEl.querySelector('h1')!.textContent = p1.name;
        }
    }
}

//? decorator which has execute when class is instantiated
function WithTemplate2(hookId: string, template: string) {
    console.log('WithTemplate2 Factory!!');
    return function <T extends { new(...args: any[]): { name: string } }>(originalConstructor: T) {
        console.log('WithTemplate2 Decorator!!');
        return class extends originalConstructor {
            constructor(..._: any[]) {
                super();
                const hookEl = document.getElementById(hookId);
                const p1 = new originalConstructor();
                if (hookEl) {
                    hookEl.innerHTML = template
                    hookEl.querySelector('h1')!.textContent = p1.name;
                }
            }
        }

    }
}

//? Note: --->
//? factory function follows a javascript top top-down fashion 
//* means 'Logger' factory function called first and than 'WithTemplate'.
//? while actual decorator will be called in bottom-up fashion
//* means 'WithTemplate' is applied to class first.

@Logger('Logging-Person')
// @WithTemplate("app","<h1>This is a Person</h1>")
@WithTemplate2("app", "<h1>This is a Person</h1>")
class Person {
    name = "Rutwik";
    constructor() {
        console.log('Creating person objects....');
    }
}
const p1 = new Person();
console.log('this is a p1', p1);

//? ---> Types Decorators -->?//
console.log("-------------Types of Decorator--------------");
//? property decorator takes 2 args. one-> target for instance property structure/Interface/prototype, for static property constructor function.
//?                                  two-> property's name
//? it's applied on the property of class
function Log(target: any, propertyName: string | Symbol) {
    console.log('Property decorator!!');
    console.log(target, propertyName);
}

//? Accessor decorator takes 3 args. one-> target for instance property structure/Interface/prototype, for static property constructor function.
//?                                  two-> property's name
//?                                  three-> property descriptor of type 'PropertyDescriptor'   
function Log2(target: any, propertyName: string | Symbol, descriptor: PropertyDescriptor) {
    console.log('Accesssor decorator!!');
    console.log(target, propertyName, descriptor);
}

//? Method decorator takes 3 args. one-> target, for instance method structure/Interface/prototype, for static method constructor function.
//?                                  two-> method's name
//?                                  three-> method descriptor of type 'PropertyDescriptor'   
function Log3(target: any, methodName: string | Symbol, descriptor: PropertyDescriptor) {
    console.log('Method decorator!!');
    console.log(target, methodName, descriptor);
}

//? parameter decorator takes 3 args. one-> target, for instance method structure/Interface/prototype, for static method constructor function.
//?                                  two-> method's name
//?                                  three-> args. position as number
//? --> Note the sequence in the calling.
function Log4(target: any, methodName: string | Symbol, position: number) {
    console.log('Parameter decorator!!');
    console.log(target, methodName, position);
}

class Product {
    @Log
    title: string;
    private _price: number;

    @Log2
    set price(val: number) {
        if (val > 0) {
            this._price = val;
        } else {
            throw new Error("Price should be +ve!!");
        }
    }

    constructor(title: string, price: number) {
        this.title = title;
        this._price = price;
    }

    @Log3
    getPriceWithTax(@Log4 tax: number) {
        return this._price * (1 + tax);
    }
}
//* Note ---> class, method and accessor decorator able to return something

//?----Autobind----?//

function Autobind (_:any, _2: string|Symbol, descriptor: PropertyDescriptor){
    const originalMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get(){
            //* 'this' keyword inside the method refers to the 'object' whoever trigger them.
            const boundFunction = originalMethod.bind(this);
            return boundFunction;
        }
    }
    console.log({descriptor, adjDescriptor});
    return adjDescriptor;
}

class Printer {
    message = 'Here it\'s work!!';

    @Autobind
    showMessage(){
        console.log(this.message);
    }
}

const p = new Printer();

const button = document.querySelector('button')! as HTMLButtonElement;
// button.addEventListener('click',p.showMessage.bind(p));
button.addEventListener('click',p.showMessage);

//?---- validation with decorators----?//
interface ValidatorConfig {
    [property: string]: {
        [validatableProp: string]: string[] //['required', 'positive']
    }
}
const registeredValidators: ValidatorConfig = {};

function Require(target: any, propName: string) {
    registeredValidators[target.constructor.name]={
        ...registeredValidators[target.constructor.name],
        [propName]:['required']
    }
}
function PositiveNumber(target: any, propName: string){
    registeredValidators[target.constructor.name]={
        ...registeredValidators[target.constructor.name],
        [propName]:['positive']
    }
}
function validate(obj: any){
    const objValidatorConfig = registeredValidators[obj.constructor.name]
    console.log(objValidatorConfig, registeredValidators);
    if(!objValidatorConfig){
        return true;
    }
    let isValid = true;
    for(const prop in objValidatorConfig){
        for(const validator of objValidatorConfig[prop]){
            switch(validator){
                case 'required':
                    isValid = isValid && !!obj[prop]
                    break;
                case 'positive':
                    isValid = isValid && obj[prop] > 0;
                    break;
            }
        }
    }
    return isValid;
}

class Course{
    @Require
    title: string;
    @PositiveNumber
    price: number;

    constructor(t: string, p: number){
        this.title=t;
        this.price=p;
    }
}

const courseForm = document.querySelector('form')! as HTMLFormElement;
courseForm.addEventListener('submit',event => {
    event.preventDefault();
    const titleEl = document.getElementById('title') as HTMLInputElement;
    const priceEl = document.getElementById('price') as HTMLInputElement;

    const title = titleEl.value;
    const price = +priceEl.value;
    const createdCourse = new Course(title, price);
    if(!validate(createdCourse)){
        console.log('Invalid input, please try again!!');
        return;
    }
    console.log(createdCourse);
})