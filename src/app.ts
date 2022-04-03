interface Named {
  readonly name: string;
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
  age: number = 30;
  constructor(n: string) {
    this.name = n;
  }

  greet(phrase: string) {
    console.log(`${phrase} ${this.name}`);
  }
}

let unit1: Greetable;
unit1 = new Person("Baevzev");

unit1.greet("Hi there I am");
console.table(unit1);
