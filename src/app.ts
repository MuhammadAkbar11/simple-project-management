function Logger(logString: string) {
  return function (constructor: Function) {
    console.log(logString);
    console.log(constructor);
  };
}

function WithTemplate(template: string, hookId: string) {
  return function (constructor: any) {
    const wrapperEl = document.createElement("div");
    wrapperEl.className = "decorator-wrapper";
    wrapperEl.id = "decorator-wrapper";

    const p = new constructor();

    if (hookId) {
      wrapperEl.innerHTML = template;
      wrapperEl.querySelector("h1")!.textContent = p.name;
      document.getElementById(hookId)?.appendChild(wrapperEl);
    }
  };
}

// @Logger("LOGGING - PERSON")
@WithTemplate("<h1>My Person Object</h1>", "root")
class Person {
  name = "baaev";

  constructor() {
    console.log("Creating person object...");
  }
}

const pers = new Person();

console.log(pers);
