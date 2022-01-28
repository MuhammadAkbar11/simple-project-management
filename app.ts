let userInput: unknown;
let userName: string;

userInput = 5;
userInput = "Noze";

if (typeof userInput === "string") {
  userName = userInput;
}

function genereteError(message: string, code: number): never {
  throw { message: message, statusCode: code };
}

genereteError("Opss", 500);
