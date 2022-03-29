class Department {
  public name: string;
  private employees: string[] = [];
  constructor(n: string) {
    this.name = n;
  }

  describe(this: Department) {
    console.log(`Departement: ${this.name}`);
  }

  addEmployee(employee: string) {
    this.employees.push(employee);
  }

  printEmployeeInformation() {
    console.info(this.employees.length);
    console.info(this.employees.join(" - "));
  }
}

const accounting = new Department("Accounting");

accounting.addEmployee("Baevzev");
accounting.addEmployee("Dahyun");

// accounting.employees[2] = "Sharon";
accounting.describe();

accounting.printEmployeeInformation();

// const accountingCopy = { name: "Tech", describe: accounting.describe };
// accountingCopy.describe();
