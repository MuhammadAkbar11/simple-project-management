function Logger(logString: string) {
  return function (constructor: Function) {
    console.log(logString);
    console.log(constructor);
  };
}

function WithTemplate(template: string, hookId: string) {
  return function (constructor: any) {
    console.log("Rendering Template");
    const wrapperEl = document.createElement("div");
    wrapperEl.className = "decorator-wrapper";
    wrapperEl.id = "decorator-wrapper";

    const p = new constructor();

    if (hookId) {
      wrapperEl.innerHTML = template;
      wrapperEl.querySelector("h1")!.textContent = "Hay " + p.name;
      document.getElementById(hookId)?.appendChild(wrapperEl);
    }
  };
}

@Logger("LOGGING - PERSON")
@WithTemplate("<h1>My Person Object</h1>", "root")
class Person {
  name = "baaev";

  constructor() {
    console.log("Creating person object...");
  }
}

const pers = new Person();

console.log(pers);

console.log("//---");

function Log(target: any, propertyName: string | Symbol) {
  console.log("Property decorator");
  console.log(target, propertyName);
}

class Product {
  @Log
  title: string;
  private _price: number;

  set price(val: number) {
    if (val > 0) {
      this._price = val;
    } else {
      throw new Error("Invalid Price - should be positive");
    }
  }

  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }
  getPriceWithTax(tax: number) {
    return this._price * (1 + tax);
  }
}
