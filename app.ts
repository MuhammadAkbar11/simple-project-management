type Combinable = number | string;
type ConversionDesc = "as-number" | "as-text";

function combine(
  n1: Combinable,
  n2: Combinable,
  resultConversion: ConversionDesc
) {
  let result;
  if (
    (typeof n1 === "number" && typeof n2 === "number") ||
    resultConversion == "as-number"
  ) {
    result = +n1 + +n2;
  } else {
    result = n1.toString() + n2.toString();
  }
  return result;
}

const combineAges = combine(20, 50, "as-number");
console.log(combineAges);

const combineStringAges = combine("30", "26", "as-number");
console.log(combineStringAges);

const combineNames = combine("Suzy", "Bae", "as-text");
console.log(combineNames);
