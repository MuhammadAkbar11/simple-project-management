function combine(n1: number | string, n2: number | string) {
  let result;
  if (typeof n1 === "number" && typeof n2 === "number") result = n1 + n2;
  else result = n1.toString() + n2.toString();
  return result;
}

const combineAges = combine(20, 50);
console.log(combineAges);
const combineNames = combine("Suzy", "Bae");
console.log(combineNames);
