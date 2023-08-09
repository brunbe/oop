'use strict';

const Person = function (firstName, birthYear) {
  // instance properties
  this.firstName = firstName;
  this.brithYear = birthYear;

  // NEVER CREATE METHODS IN A CONSTRUCTOR FUNCTION: THEY MUS BE CREATED ON THE PROTOTYPE. (OTHERWISE THEY WILL BE DUPLICATED ON EVERY NEW INSTANCE)
  // this.calcAge = function () {
  //   console.log(2037 - this.brithYear);
  // };
};

const jonas = new Person('Jonas', 1991);
console.log(jonas);

// What happens when calling the function with the NEW operator
//1. new empty {} is created
//2. function is called, this-keyword == {}
//3. {} is linked to prototype
//4. function automatically returns {}, at this point object will no longer be empty

const matilda = new Person('Matilda', 2017);
const jack = new Person('Jack', 1984);
console.log(matilda, jack);

const jay = {
  firstName: 'Jay',
  birthYear: 1989,
};

console.log(jack instanceof Person); //true
console.log(jay instanceof Person); //false
console.log(jack, jay);

// PROTOTYPES
Person.prototype.calcAge = function () {
  console.log(2037 - this.brithYear);
};

// clac age is now on the prototype
console.log(Person.prototype);

// now all instances of Person have access to calc age.
jonas.calcAge();
jack.calcAge();

// the .prototype property is what the object will pass down to its instances
// the .__proto__ property is the prototype of the object.
console.log(jonas.__proto__);
console.log(jonas.prototype); //undefined.
console.log(jonas.__proto__ === Person.prototype); //true
// there is also a link back to the constructor function:
console.log(jonas.__proto__.constructor === Person); //true

console.log(Person.prototype.isPrototypeOf(jonas)); //true
console.log(Person.prototype.isPrototypeOf(matilda)); //true
console.log(Person.prototype.isPrototypeOf(Person)); //false

// step 3 of the NEW operator creates the __proto__ property on the instance and connects it to the .prototype property of the CF.
// this is how JS knows that jonas is an instance of Person.

// adding PROPERTIES to the prototype
Person.prototype.species = 'Homo Sapiens';
console.log(jack.species === matilda.species);

//PROPERTIES on the prototype are different from regular properties
console.log(jonas.hasOwnProperty('firstName')); //true
console.log(jonas.hasOwnProperty('species')); //false

console.log(jonas.__proto__); // == Person.prototype
console.log(jonas.__proto__.__proto__); // == Person.__proto__ == Object.prototype
console.log(jonas.__proto__.__proto__.__proto__); // == null

console.log(Person.prototype.constructor);
console.dir(Person.prototype.constructor);

//the prototype of built-in structures
const arr = [2, 3, 4, 5, 2, 3, 6, 7, 5];
console.log(arr.__proto__);
console.log(arr.__proto__ == Array.prototype);
console.log(arr.__proto__.__proto__);
console.log(arr.__proto__.__proto__ == Object.prototype);

// // adding methods to the array datatype
// Array.prototype.unique = function () {
//   return [...new Set(this)];
// };
// console.log(arr.unique());
// // this is very bad practice

// DOM elements are also objects with prototypes
const h1 = document.querySelector('h1');
console.dir(h1);

// FUNCTIONS also have prototypes
console.dir(a => a + 1);
