// type AddFn = (a : number, b : number) => number
interface AddFn {
  (a: number, b: number): number;
}

let add: AddFn;

add = (n1: number, n2: number) => {
  return n1 + n2;
};

interface Named {
  readonly name: string;
  readonly lastName?: string;
  joinName?(): void;
}

interface Aged {
  readonly age: number;
}
// iterface can multiple Extends
interface Greetable extends Named, Aged {
  greet(phrase: string): void;
}

class Person implements Greetable {
  name: string;
  lastName?: string;
  age: number = 30;
  constructor(n: string, ln?: string) {
    if (ln) {
      this.lastName = ln;
    }
    this.name = n;
  }

  greet(phrase: string) {
    const result = this.lastName ? `${this.name} ${this.lastName}` : this.name;
    console.log(`${phrase} ${result}`);
  }
}

let unit1: Greetable;
unit1 = new Person("Baev", "Zev");

unit1.greet("Hi there I am");
console.table(unit1);
