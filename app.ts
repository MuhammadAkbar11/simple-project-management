const person: {
  name: string;
  age: number;
  hobbies: string[];
  role: [number, string]; // Tuples
} = {
  name: "Zurg",
  age: 20,
  hobbies: ["Sports", "Cooking", "Gaming"],
  role: [2, "autohor"],
};

// person.role.push("admin");
// person.role[1] = 10;

person.role = [0, "admin"];

let favActivities: string[];
favActivities = ["Sports"];

console.log(person);

for (const hobby of person.hobbies) {
  console.log(hobby.toUpperCase());
}
