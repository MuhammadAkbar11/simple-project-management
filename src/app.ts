function Logger(logString: string) {
  return function (constructor: Function) {
    console.log(logString);
    console.log(constructor);
  };
}

function WithTemplate(template: string, hookId: string) {
  return function <T extends { new (...args: any[]): { name: string } }>(
    originalConstructor: T
  ) {
    return class extends originalConstructor {
      constructor(..._: any[]) {
        super();
        console.log("Rendering Template");
        const wrapperEl = document.createElement("div");
        wrapperEl.className = "decorator-wrapper";
        wrapperEl.id = "decorator-wrapper";

        const button = document.createElement("button");
        button.textContent = "Click me!";
        button.id = "btn";

        if (hookId) {
          wrapperEl.innerHTML = template;
          wrapperEl.querySelector("h1")!.textContent = "Hay " + this.name;
          document.getElementById(hookId)?.appendChild(wrapperEl);
          document.getElementById(hookId)?.appendChild(button);
        }
      }
    };
  };
}

@Logger("LOGGING - PERSON")
@WithTemplate("<h1>My Person Object</h1>", "root")
class Person {
  name = "Baaev Legieuvn";

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

function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
  console.log("Acessor decorator!");
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

function Log3(
  target: any,
  name: string | Symbol,
  descriptor: PropertyDescriptor
) {
  console.log("Method decorator!");
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

function Log4(target: any, name: string | Symbol, position: number) {
  console.log("Param decorator!");
  console.log(target);
  console.log(name);
  console.log(position);
}

class Product {
  @Log
  title: string;
  private _price: number;

  @Log2
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

  @Log3
  getPriceWithTax(@Log4 tax: number) {
    return this._price * (1 + tax);
  }
}

function AutoBind(
  _target: any,
  _methodName: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };

  return adjDescriptor;
}

class Printer {
  message = "this works!";

  @AutoBind
  showMessage() {
    console.log(this.message);
  }
}

const printer = new Printer();

const button = document.querySelector("#btn")!;

button.addEventListener("click", printer.showMessage);

interface ValidatorConfig {
  [proeperty: string]: {
    [validatableProps: string]: string[];
  };
}

const registredValidators: ValidatorConfig = {};

function Required(target: any, propName: string) {
  registredValidators[target.constructor.name] = {
    ...registredValidators[target.constructor.name],
    [propName]: ["required"],
  };
}
function PositiveNumber(target: any, propName: string) {
  registredValidators[target.constructor.name] = {
    ...registredValidators[target.constructor.name],
    [propName]: ["positive"],
  };
}

function validate(obj: any): any {
  const objValidatorConfig = registredValidators[obj.constructor.name];

  if (!objValidatorConfig) {
    return true;
  }

  let isValid = true;
  for (const prop in objValidatorConfig) {
    console.log(prop);
    for (const validator of objValidatorConfig[prop]) {
      switch (validator) {
        case "required":
          isValid = isValid && !!obj[prop];
          break;
        case "positive":
          isValid = isValid && obj[prop] > 0;
          break;
        default:
          break;
      }
    }
  }
  return isValid;
}

type Courses = {
  title: string;
  price: number;
};

class Course {
  @Required
  title: string;
  @PositiveNumber
  price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }

  save() {
    const ListCourseEl = document.querySelector("#list-course")!;
    const CourseItemEl = document.createElement("li");
    console.log(this.price);
    CourseItemEl.innerHTML = `Name: ${this.title}, price: ${this.price}`;
    if (!ListCourseEl) {
      const ListCourseElInit = document.createElement("ul");
      ListCourseElInit.appendChild(CourseItemEl);
      document.getElementById("root")?.appendChild(ListCourseElInit);
    } else {
      ListCourseEl.appendChild(CourseItemEl);
    }
  }
}

const CouseForm = document.querySelector("form")!;

CouseForm.addEventListener("submit", event => {
  event.preventDefault();
  const TitleEl = document.getElementById("title") as HTMLInputElement;
  const PriceEl = document.getElementById("price") as HTMLInputElement;

  const title = TitleEl.value;
  const price = +PriceEl.value;

  const createdCourse = new Course(title, price);

  if (!validate(createdCourse)) {
    alert("Invalid Input, please try again");
    return;
  }

  createdCourse.save();
  TitleEl.value = "";
  PriceEl.value = "";
});
