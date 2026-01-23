"use strict";

// importar excepciones
import {
  BaseException,
  InvalidAccessConstructorException,
  EmptyValueException,
  AbstractClassException,
} from "../exceptions/exceptions.js";

// clase abstracta Production
class Production {
  // atributos
  #title;
  #nationality;
  #publication;
  #synopsis;
  #image;

  constructor(
    title,
    nationality = "Sin Nacionalidad",
    publication,
    synopsis = "Sin synopsis",
    image = "Sin imagen"
  ) {
    // si no se usa new, aunque no hace false por ser abstracta
    if (!new.target) throw new InvalidAccessConstructorException();
    // la clase es abstracta
    if (new.target === Production) throw new AbstractClassException("Production");
    // comprobar entrada
    if (!title) throw new EmptyValueException("title");
    // si no es una string
    if (typeof title !== "string") throw new EmptyValueException("title");
    // si no es tipo Date
    if (!publication) throw new EmptyValueException("publication");
    const date = (publication instanceof Date) ? publication : new Date(publication);
    if (Number.isNaN(date.getTime())) throw new EmptyValueException("publication");

    // asignar atributos
    this.#title = title;
    this.#nationality = nationality;
    this.#publication = date;
    this.#synopsis = synopsis;
    this.#image = image;

  }
}

// exportar
export { Production };