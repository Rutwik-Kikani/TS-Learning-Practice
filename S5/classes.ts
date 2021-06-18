//* classes define object blueprints.
abstract class Department{
    // private readonly id: number;
    // private name:string;
    //* protected property  accessible by  class as well as a class who inherited class
    protected employeesList: string[] = [];

    constructor(protected readonly id: number,private name:string){
        // this.name = name;
        // this.id = id;
        // console.log(Department.fiscalYear);
    }

    //* static property is only accessible by class name 
    //* weather you use it in class or outside of class
    static readonly fiscalYear:number = 2000;
    static createEmployee(name:string){
        return{name:name}
    }

    //* abstract will enforce the subclass to override this property and method
    abstract describe(this: Department) : void //{
        // console.log(`Department: ${this.name} Id: ${this.id}`);
    // }

    addEmployees(e:string){
        this.employeesList.push(e);
    }

    printEmployeeInformation(){
        console.log('list length: ',this.employeesList.length);
        console.log('list :',this.employeesList)
    }
}

//* create employee using static method
console.log("--------------------------Static-------------------------------------");
const employee1 = Department.createEmployee('Rutwik');
console.log(employee1);
// Department.fiscalYear = 2052; //error //* can not reassign the readonly property
console.log(Department.fiscalYear)
console.log("---------------------------------------------------------------------");

console.log("---------------------------Simple Class Demo-----------------------------------");
//* Abstract class can not be instantiated 
// const hrDepartment = new Department(1,'HR'); 
// console.log("HRDepartment Instance: ",hrDepartment);
// hrDepartment.describe();
// hrDepartment.addEmployees('Gupta');
// hrDepartment.addEmployees('Mishra');
// hrDepartment.employeesList[2] = 'Kikani'; //using private will prevent you to use this method
// hrDepartment.printEmployeeInformation();

// const cpHR =  {name:'Dummy',describe: hrDepartment.describe}
// cpHR.describe(); // Dummy
console.log("---------------------------------------------------------------------------------");


class ItDepartment extends Department{
    admins: string[];
    constructor(id:number,admins:string[]){
        super(id,'it');
        this.admins = admins;
    }

    //* override abstract property describe
    describe(){
        console.log(`IT Department Id:-${this.id}` );
    }
}

console.log("-----------------------------Inheritance----------------------------------");
const itD1 = new ItDepartment(2,['Mihir', 'Dhaval', 'Urmil']);
itD1.describe();
itD1.addEmployees('pradhan');
itD1.addEmployees('Khorja');
itD1.printEmployeeInformation();
console.log('ITD1:',itD1);
console.log("--------------------------------------------------------------------------");

//* you can't extend a singleton class because constructor is private.
class AccountDepartment extends Department{
    
    //*private property only accessible by this class
    private lastReport:string;

    //*2..to store a class instance there should be one static property of type class
    private static instance: AccountDepartment;

    //*1.to create singleton class instance constructor should be 'private'
    private constructor(id: number, private reports: string[]){
        super(id,'account');
        this.lastReport = reports[0];
    }

    //*3.to get that single instance of class one static method should be inside class
    static getInstance(){
        //* Inside static method 'this' keyword can be replace by Class Name.
        if(AccountDepartment.instance){
            return this.instance //* 'this' keyword inside the static method points to class itself.
        }
        this.instance = new AccountDepartment(2, []);
        return this.instance;
    }
    //*getter for private property lastReport
    get mostRecentReport(){
        if(this.lastReport){
            return this.lastReport;
        }
        throw new Error('No report found');
    }
    //* setter for private property lastreport
    set mostRecentReport(value : string){
        if(!value){
            throw new Error('Please pass in a valid value!!');  
        }
        this.addReport(value)
    }
    //*overriding abstract property describe
    describe(){
        console.log(`Accounting Department Id:-${this.id}`);
    }
    //*overriding a addEmployees method of super class
    addEmployees(name:string){
        if(name === 'Test'){
            return;
        }
        this.employeesList.push(name);
    }
    addReport(text:string){
        this.reports.push(text);
        this.lastReport = text;
    }
    printReports(){
        console.log(this.reports);
    }
}

console.log("----------------------------Inheritance getters and setters-----------------------------------");
const AcD1 =  AccountDepartment.getInstance();
AcD1.describe();
AcD1.addEmployees('Me');
AcD1.addEmployees('herSelf');
AcD1.addEmployees('Test');
AcD1.printEmployeeInformation();
// console.log("Recent Report: ",AcD1.mostRecentReport) //*throw an error
AcD1.addReport('Something went wrong !!');
// AcD1.mostRecentReport = '';  //*throw an error
AcD1.mostRecentReport = 'Year hold Report !!';
console.log("Recent Report: ",AcD1.mostRecentReport)
AcD1.printReports();

const AcD2 = AccountDepartment.getInstance();
console.log("Instance 1",AcD1,"\nInstance 2",AcD2)

console.log("-----------------------------------------------------------------------------------------------");
