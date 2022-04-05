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

function combine(a: Combinable, b: Combinable) {
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + a.toString();
  }

  return a + b;
}

type UnknownEmployee = Employee | Admin;

function printEmployeeInformation(emp: UnknownEmployee) {
  console.log(`Name: ${emp.name}`);

  "privileges" in emp && console.log(`Privileges: ${emp.privileges}`);
  "startDate" in emp && console.log(`Privileges: ${emp.startDate}`);
}
printEmployeeInformation(e1);
printEmployeeInformation({ name: "Baev2", startDate: new Date() });

console.log("================");

class Car {
  drive() {
    console.log("Driving...");
  }
}

class Truck {
  drive() {
    console.log("Driving a truck...");
  }

  loadCargo(amount: number) {
    console.log(`Loading cargo ...${amount}`);
  }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
  vehicle.drive();
  "loadCargo" in vehicle && vehicle.loadCargo(100);
  vehicle instanceof Truck && vehicle.loadCargo(50);
}

useVehicle(v1);
useVehicle(v2);
