const person: {
  name: string;
  age: number;
  hobbies: string[];
} = {
  name: "Zurg",
  age: 20,
  hobbies: ["Sports", "Cooking", "Gaming"],
};

let favActivities: string[];
favActivities = ["Sports"];

console.log(person);

for (const hobby of person.hobbies) {
  console.log(hobby.toUpperCase());
}
