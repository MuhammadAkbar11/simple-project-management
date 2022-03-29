class Department {
  name: string;
  constructor(n: string) {
    this.name = n;
  }

  describe(this: Department) {
    console.log(`Departement: ${this.name}`);
  }
}

const accounting = new Department("Accounting");
accounting.describe();

const accountingCopy = { name: "Tech", describe: accounting.describe };
accountingCopy.describe();
