class Department {
  // public name: string;
  private employees: string[] = [];
  constructor(private id: string, public name: string) {
    // this.id = id;
    // this.name = n;
  }

  describe(this: Department) {
    console.log(`Departement: (${this.id}): ${this.name}`);
  }

  addEmployee(employee: string) {
    this.employees.push(employee);
  }

  printEmployeeInformation() {
    console.info(this.employees.length);
    console.info(this.employees.join(" - "));
  }
}

const accounting = new Department("d1", "Accounting");

accounting.addEmployee("Baevzev");
accounting.addEmployee("Dahyun");

// accounting.employees[2] = "Sharon";
accounting.describe();

accounting.printEmployeeInformation();

// const accountingCopy = { name: "Tech", describe: accounting.describe };
// accountingCopy.describe();
