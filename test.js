function Person (name) {
  this.name = name;
}

Person.prototype.greet = function () {
  console.log(this.name);
}

var personObject = new Person('Robot');
personObject.greet();

var person = {
  firstName: 'Williams',
  lastName: 'Medina',
  age: 28,
  active: true,
  dateOfBirth: new Date()
}

function Greet (m) {
  console.log(m.firstName);
}

console.log(process.env)

Greet(person);
