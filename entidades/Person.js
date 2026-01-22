"use strict";

// Objeto para identificar los datos de una persona
class Person {
  // campos privados
  #name;
  #lastname1;
  #lastname2;
  #born;
  #picture;

  constructor(name, lastname1, lastname2 = "", born, picture = "") {
    // comprobar si se llama con new
    if (!new.target) throw new InvalidAccessConstructorException();

    this.#name = name;
    this.#lastname1 = lastname1;
    this.#lastname2 = lastname2;
    this.#born = new Date(born);
    this.#picture = picture;
  }
}