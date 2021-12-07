// const person: {
//   name: string;
//   age: number;
//   hobbies: string[];
//   role: [number, string]; // Tuples
// } = {
//   name: "Zurg",
//   age: 20,
//   hobbies: ["Sports", "Cooking", "Gaming"],
//   role: [2, "autohor"],
// };

// const ADMIN = 0;
// const READ_ONLY = 1;
// const AUTHOR = 2;

enum Role {
  ADMIN = "ADMIN", // can asign your own value 1, "ADMIN", 100 etc..
  READ_ONLY = "READ_ONLY",
  AUTHOR = "AUTHOR",
}

const person: {
  name: string;
  age: number;
  hobbies: string[];
  role: any; // <== Any Type
} = {
  name: "Zurg",
  age: 20,
  hobbies: ["Sports", "Cooking", "Gaming"],
  role: Role.ADMIN,
};

// person.role.push("admin");
// person.role[1] = 10;

// person.role = [0, "admin"];

if (person.role === Role.ADMIN) {
  console.log("is admin");
}
let favActivities: string[];
favActivities = ["Sports"];

console.log(person);

for (const hobby of person.hobbies) {
  console.log(hobby.toUpperCase());
}
