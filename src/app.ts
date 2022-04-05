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
