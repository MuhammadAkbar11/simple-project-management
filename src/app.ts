// using Interface

// interface Admin {
//   name: string;
//   privileges: string[];
// }

// interface Employee {
//   name: string;
//   startDate: Date;
// }

// interface ElevatedEmployee extends Admin, Employee {}

type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
  name: "Baev",
  privileges: ["create-server"],
  startDate: new Date(),
};
console.log(e1);
type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric;
