//# let and const
const userName = "Baev";
// userName = "Baevzev";  const cant be changed

let age = 30;
age = 29; // Can be changed

//# Arraw Functions

// Arraw Functions with multipe expresions
// const add = (a: number, b: number) => {
//   return a + b;
// };

/*
const add = (a: number, b: number) => a + b; // Arrow Functions if only have one expresion
*/

// console.log(add(1, 2));

const printOut: (a: number | string) => void = output => console.log(output);

// # Default Function Params

const add = (a: number = 1, b: number = 5) => a + b;

// # Spread Operator

const hobbies = ["Sports", "Reading"];

const activeHobbies = ["Hiking"];

activeHobbies.push(...hobbies);

const person = {
  name: "baev",
  age: 500,
};

const baevzev = { ...person, lastname: "zev" };
