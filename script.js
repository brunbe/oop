'use strict';

const Person = function (firstName, birthYear) {
  // instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;

  // NEVER CREATE METHODS IN A CONSTRUCTOR FUNCTION: THEY MUST BE CREATED ON THE PROTOTYPE. (OTHERWISE THEY WILL BE DUPLICATED ON EVERY NEW INSTANCE)
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
  console.log(2037 - this.birthYear);
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

///////////////////
// Static method //
///////////////////
Person.hey = function () {
  console.log(`Hey there, buddy!`);
};

/*
///////////// coding challenge 1 ////////////////

const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.acc = function () {
  this.speed += 10;
  console.log(`The ${this.make} is now going at ${this.speed} km/h.`);
};
Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`The ${this.make} is now going at ${this.speed} km/h.`);
};

const beemer = new Car('BMW', 120);
const merc = new Car('Mercedes', 95);

beemer.acc();
merc.brake();
beemer.brake();
merc.acc();
*/

////////////////////////////
// ES6 CLASSES
////////////////////////////
/*
// class Expression:
const PersonCl = class {} */

// class Declaration:
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // everyting outside the constructor is on the prototype except for static methods.
  // instance methods:
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hello ${this.firstName}!`);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name.`);
  }

  get fullName() {
    return this._fullName;
  }

  //////////////////
  //Static Method //
  //////////////////

  static hey() {
    console.log(`Hey there class-buddy!`);
  }
}

//create a new instance of PersonCl
const bruno = new PersonCl('Bruno Declercq', 1984);
//check if calcAge is in instance: No
console.log(bruno);
//yet, calcAge is still available:
bruno.calcAge();

console.log(bruno.__proto__ == PersonCl.prototype);

/*
// prototype can still be set like before:

PersonCl.prototype.greet = function () {
  console.log(`Hello ${this.firstName}!`);
};*/

bruno.greet();

/////////////////////////
// getters and setters //
/////////////////////////

const account = {
  owner: 'Jonas',
  movements: [200, 530, 120, 300],

  get latest() {
    return this.movements.slice(-1).pop();
  },
  //setters must have at least 1 argument.
  set latest(mov) {
    this.movements.push(mov);
  },
};

//getter is a method that is called as a property:
console.log(account.latest);
//setter is a method that is called as a property:
account.latest = 50;
console.log(account.latest);

console.log(bruno.age);
bruno.fullName = 'Bruno De Clercq';
console.log(bruno);
console.log(bruno.fullName);
PersonCl.hey();

///////////////////
// OBJECT.CREATE //
///////////////////

// this object is going to be the prototype of all the Person-objects
const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(fullName, birthYear) {
    (this.fullName = fullName), (this.brithYear = birthYear);
  },
};

// create a new person and set it's prototype to PersonProto:
const steven = Object.create(PersonProto);

// steven is now linked to PersonProto
console.log(steven.__proto__ === PersonProto); // true

/*
steven.fullName = 'Steven Smith';
steven.birthYear = 1991;

// adding properties manually goes against the spirit of creating objects programatically
// to avoid this we can create a method on the prototype that takes our data as arguments
// and creates the properties in the object.
// this method fulfills the role a CF but is not a CF.
*/

steven.init('Steven Smith', 1991);
console.log(steven);

/*
////////////////////////
// coding challenge 2 //
////////////////////////

class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }
  acc() {
    this.speed += 10;
    console.log(`The ${this.make} is now going at ${this.speed} km/h.`);
  }
  brake() {
    this.speed -= 5;
    console.log(`The ${this.make} is now going at ${this.speed} km/h.`);
  }

  get speedUs() {
    console.log(`The ${this.make} is now going at ${this.speed / 1.6} mph.`);
  }
  set speedUs(mph) {
    this.speed = mph * 1.6;
  }
}

const beemer = new CarCl('BMW', 120);
const benz = new CarCl('Mercedes', 120);
const ford = new CarCl('Ford', 120);

ford.speedUs;
ford.speedUs = 100;
ford.acc();
ford.brake();
ford.brake();
*/

/////////////////////////////////
// inheritance between classes //
/////////////////////////////////

// student will be a child class of person

// with constructor functions:

// put the CF of the parent class in the child class
// this keyword in CF of parent class must be set
// to the same this keyword as in CF of child class: use call method

const Student = function (firstName, birthYear, course) {
  Person.call(this, firstName, birthYear);
  this.course = course;
};

// now the the prototypes must be linked.
// The prototype of the Student CF should be equal to
// the prototype property of the Person CF.

Student.prototype = Object.create(Person.prototype);
// this will over write any methods that have already been created on Student.prototype
// we need Object.create to make a deep copy of the object i.e. make new object in the heap
// Student.prototype = Person.prototype would point to the same object in the heap.

Student.prototype.introduce = function () {
  console.log(
    `I'm ${this.firstName} and I'm ${this.birthYear} and I study ${this.course}`
  );
};

const mike = new Student('Mike', 2017, 'CS');
console.log(mike);
mike.introduce();
mike.calcAge();

console.log(mike.__proto__);
console.log(mike.__proto__.__proto__);

// the constructor point to Person, this in correct
console.log(Student.prototype.constructor);
//set the constructor manually Student:
Student.prototype.constructor = Student;
console.log(Student.prototype.constructor);

console.log(mike instanceof Student);
console.log(mike instanceof Person);

/*

////////////////////////
// coding challenge 3 //
////////////////////////

const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.acc = function () {
  this.speed += 10;
  console.log(`The ${this.make} is now going at ${this.speed} km/h.`);
};
Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`The ${this.make} is now going at ${this.speed} km/h.`);
};

const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};

EV.prototype = Object.create(Car.prototype);
EV.prototype.constructor = EV;
console.log(EV.prototype.constructor);

EV.prototype.acc = function () {
  this.speed += 20;
  this.charge--;
  console.log(
    `The ${this.make} is now going at ${this.speed} km/h. Its charge is ${this.charge}%`
  );

  EV.prototype.chargeBat = function (chargeTo) {
    this.charge = chargeTo;
    console.log(`${this.make} battery at ${this.charge}%`);
  };
};

const tesla = new EV('Tesla', 120, 23);
tesla.acc();
tesla.chargeBat(50);

console.log(EV.prototype);

const beemer = new Car('BMW', 120);
beemer.acc();

*/
