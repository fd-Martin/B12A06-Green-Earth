# Readme

## 1) What is the difference between var, let, and const?

- **`var`**

  - Function-scoped.
  - Can be re-declared and updated.
  - Hoisted (moved to the top of scope with undefined).

- **`let`**

  - Block-scoped.
  - Can be updated but not re-declared in the same scope.
  - Safer to use than var.

- **`const`**
  - Block-scoped.
  - Cannot be updated or re-declared.
  - Must be initialized at declaration.

---

## 2) What is the difference between map(), forEach(), and filter()?

- **`map()`**

  - Returns a new array with the results of applying a function to every element.

- **`forEach()`**
  - Executes a function for each element.

Does not return a new array (returns undefined).

- **`filter()`**
  - Returns a new array containing only elements that match a condition.

---

## 3) What are arrow functions in ES6?

- Arrow functions are a shorter syntax for writing functions.

- They do not have their own this and inherit it from their surrounding scope.

```
// Normal function
function add(a, b) {
  return a + b;
}
// Arrow function
const add = (a, b) => a + b;
```

## 4) Destructuring Assignment in ES6

- Destructuring lets you extract values from arrays or objects into variables.

Array Destructuring

```
const arr = [10, 20, 30];
const [x, y] = arr;

console.log(x); // 10
console.log(y); // 20
```

Object Destructuring

```
const person = { name: "Alice", age: 25 };
const { name, age } = person;

console.log(name); // Alice
console.log(age);  // 25
```

## 5) Explain template literals in ES6. How are they different from string concatenation?

Template literals use backticks (`) instead of quotes.
They allow variable interpolation with ${} and support multi-line strings.

- Example

```
const name = "Bob";
const age = 30;

const message = `My name is ${name} and I am ${age} years old.`;

console.log(message);
// Output: My name is Bob and I am 30 years old.
```

- Difference from String Concatenation

```
// Using concatenation
const msg1 = "My name is " + name + " and I am " + age + " years old.";

// Using template literals
const msg2 = `My name is ${name} and I am ${age} years old.`;
```
