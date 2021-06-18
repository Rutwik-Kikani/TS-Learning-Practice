let userInput: unknown;
let userName: string;

userInput=5;
userInput='Rutwik';
// userName = userInput //Error
if(typeof userInput === 'string')
    userName = userInput


function generateError(message: string, code: number){
    throw { message: message,  errorCode:code}
}

generateError('An Error Occurs !',500);