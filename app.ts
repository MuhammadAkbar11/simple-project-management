function add(n1: number, n2: number) {
  return n1 + n2;
}

function printResult(num: number): void {
  console.log("Result: " + num);
}

function addAndHandler(n1: number, n2: number, cb: (num: number) => void) {
  const result = n1 + n2;
  cb(result);
}

printResult(add(1, 5));

let combineValues: (a: number, b: number) => number;

combineValues = add;
// combineValues = 2  false

addAndHandler(10, 20, result => {
  console.log(result);
});
