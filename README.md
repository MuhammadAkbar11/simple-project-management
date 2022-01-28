# Understanding TypeScript - 2022 Edition

## Section 2 - TypeScript Basics & Basic Types

### TypeScript Core Types

- number = 1, 5.3, -10
- string = "Hi", 'Hi', `Hi`
- boolean = true, false
- object = {name: "Bae"}
- array = [1, 2, 3]
- tuple = [1, 2] (Added By Typescript : Fixed-length array)
- enum = enum {NEW, OLD} (Added By Typescript : Automactically enumarated global constant identifiers)
- any = \* (Any kind of value, no specific type assignment)
- union = number | string
- literal = "as-number" | "as-text"
- aliases = type User = number

<br>

### Function

#### Function return types

Assign the type to return in a function, types can be string, number, boolean dan other Core Types.
for example if assign is number but the return is string it will get error

<br>

#### Function return "void" type

Assign void type in a function if the function doesn't return a statement

<br>

### Function as type

To set type of variable can use "Function". "Function" is type provided by TypeScript, for example

```
let nameOfFunction: Function;
```

using "Function" as type, the type can be changed

Function types ar types that describe a functiuon regarding the paramaters and the return value of function.
Function type is created with this arrow function notation. Not like "Function", when the type not function it will get error

```
let nameOfFunction: (a: number, b: number) => number;
```

### Function Types & Callbacks
