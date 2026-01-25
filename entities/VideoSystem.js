"use strict";

// importar excepciones
import {
  InvalidAccessConstructorException,
  EmptyValueException,
  CategoryExist,
  WrongClass,
  CategoryNoRegistrada,
  CategoryDefaultException,
} from "../exceptions/exceptions.js";

// importar entities
import { Category } from "./Category.js";
import { Coordinate } from "./Coordinate.js";
import { Movie } from "./Movie.js";
import { Person } from "./Person.js";
import { Production } from "./Production.js";
import { Resource } from "./Resource.js";
import { Serie } from "./Serie.js";
import { User } from "./User.js";

// Singleton
let VideoSystem = (function () {

  let instantiated;
  // categoria por defecto
  let categoryDefault = new Category("Default", "Categorias que no pertenecen a ninguna otra");

  // clase VideoSystem
  class VideoSystem {
    #name = "VideoSystem"; // nombre del sistema por defecto
    #categories = new Map();

    constructor() {
      // si no se usa new
      if (!new.target) throw new InvalidAccessConstructorException();

      // Getter/Setter name
      Object.defineProperty(this, 'name', {
        enumerable: true,
        get() {
          return this.#name;
        },
        set(value) {
          if (!value) throw new EmptyValueException("name");
          this.#name = value;
        }
      });

      // Getter categories
      Object.defineProperty(this, 'categories', {
        enumerable: true,
        get() {
          // obtiene los 
          const values = this.#categories.values();
          // devuelve un objeto iterable
          return {
            *[Symbol.iterator]() {
              for (const c of values) {
                yield c.name;
              }
            }
          }
        }
      });
    }

    // Añade una nueva categoría
    addCategory(...categorias) {
      // buscar en el map de categorias
      for (const c of categorias) {
        // si el objeto no es instancia de categoria o
        if (c === null || c === undefined) throw new EmptyValueException("categoria");
        if (!(c instanceof Category)) throw new WrongClass("Category", c.name);
        // flyweight
        if (!this.#categories.has(c.name)) {
          // si no existe crea la nueva categoria, y un nuevo set para los Production
          this.#categories.set(c.name, new Set());
          // devuelve el número de elementos
        } else {
          throw new CategoryExist(c.name);
        }
      }
      // devolver tamaño
      return this.#categories.size;
    }

    // Elimina una categoría. Al eliminar la categoría,
    // sus productos pasan a la de por defecto.
    removeCategory(...categories) {

      const destinoSet = this.#categories.get(categoryDefault.name);
      if (!destinoSet) throw new CategoryNoRegistrada(categoryDefault.name);


      for (const c of categories) {
        // si se intenta borrar la categoria por defecto
        if (c.name === categoryDefault.name) throw new CategoryDefaultException();
        // si no hay datos
        if (c === null || c === undefined) throw new EmptyValueException("category");

        // si no se pasan para borrar categorias
        if (!(c instanceof Category)) throw new WrongClass("Category", c);

        // si esa categoria existe
        if (this.#categories.has(c.name)) {
          // copiar las entradas productions a la de por defecto
          const origenSet = this.#categories.get(c.name);

          // copiar las entradas a la de por defecto
          for (const i of origenSet) {
            destinoSet.add(i);
          }

          // borrar categoria
          this.#categories.delete(c.name);

        } else {
          throw new CategoryNoRegistrada(c.name);
        }
      }
      // devolver número de elementos
      return this.#categories.size;
    }


  }

  // Estructura SingleTon
  function init() {
    const video = new VideoSystem();
    // crear categoria por defecto
    video.addCategory(categoryDefault);
    // Object.freeze(video);
    return video;
  }

  // si ya esta instanciado no crea otra instancia, si no , si crea una
  return {
    getInstance() {
      if (!instantiated) instantiated = init();
      return instantiated;
    },
    // objetos 
  };




})();

// exportar VideoSystem
export {
  VideoSystem,
  Category,
  Coordinate,
  Movie,
  Person,
  Production,
  Resource,
  Serie,
  User
}
