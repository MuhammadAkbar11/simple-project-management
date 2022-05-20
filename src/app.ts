// const names: Array<string> = []; // ["Baev", "Jieun", 23];
// // names[0].split(" ");

// const promise: Promise<string> = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve("This is Done");
//   }, 2000);
// });

// promise.then(data => console.log(data));

function merge<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}
const mergedObj = merge(
  { name: "baev", skills: ["ReactJS", "Nodejs"] },
  { age: 500 }
);
console.log(mergedObj);

console.log("==============");

interface Lengthty {
  length: number;
}

function countAndDescribe<T extends Lengthty>(element: T): [T, string] {
  let descTxt = "Got no value.";

  if (element.length === 1) {
    descTxt = `Got 1 Element`;
  } else if (element.length > 1) {
    descTxt = `Got ${element.length} elements`;
  }
  return [element, descTxt];
}

console.log(countAndDescribe(["Sports", "Reading"]));

console.log("==============");

function extractAndConvert<T extends object, U extends keyof T>(
  obj: T,
  key: U
) {
  return `Value ${obj[key]}`;
}

extractAndConvert({ name: "baev" }, "name");

class DataStorage<T extends string | number | boolean> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    if (this.data.indexOf(item) === -1) return;
    else this.data.splice(this.data.indexOf(item), 1);
  }

  getItems() {
    return [...this.data];
  }
}

const textStorage = new DataStorage<string>();

textStorage.addItem("Baaev");
textStorage.addItem("Baevze");
textStorage.removeItem("Baevze");
console.log(textStorage.getItems());

const numberStorage = new DataStorage<string | number>();

// const objStorage = new DataStorage<object>();
// const baaevObj = { name: "Baaev" };
// objStorage.addItem(baaevObj);
// objStorage.addItem({ name: "IU" });
// // ...
// objStorage.removeItem(baaevObj);
// console.log(objStorage.getItems(), "obj");
