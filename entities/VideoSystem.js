"use strict";

// importar excepciones
import {
  InvalidAccessConstructorException,
  EmptyValueException,
  CategoryExist,
  WrongClass,
  CategoryNoRegistrada,
  CategoryDefaultException,
  ObjetoYaExiste,
  ObjetoNoExiste,
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
    // iterators
    #categories = new Map();
    #users = new Map();
    #productions = new Map();

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

      // Getter categories, devuelve un iterator
      Object.defineProperty(this, 'categories', {
        enumerable: true,
        get() {
          const values = this.#categories.keys();
          // devuelve un iterador reutilizable
          return {
            [Symbol.iterator]() {
              // devuelve un iterator
              return {
                next() {
                  const { done, value } = values.next();
                  // función ternaria para ver el final
                  return { done, value: done ? undefined : value }
                }
              }
            }
          }
        }
      });

      // Getter User
      Object.defineProperty(this, 'users', {
        enumerable: true,
        get() {
          const values = this.#users.values();
          // devuelve un iterator reutilizable
          return {
            [Symbol.iterator]() {
              return {
                next() {
                  const { done, value } = values.next();
                  // 
                  return { done, value: done ? undefined : value };
                }
              }
            }
          }
        }
      });

      // Getter productions
      Object.defineProperty(this, 'productions', {
        enumerable: true,
        get() {
          // obtiene los production
          const valor = this.#productions.values();
          // devuelve el iterator
          return {
            [Symbol.iterator]() {
              return {
                next() {
                  const { done, value } = valor.next();
                  return { done, value: done ? undefined : value };
                }
              }
            }
          }
        }
      });

    }

    // Añade una nueva categoría
    addCategory(...categorias) {
      for (let i = 0; i < categorias.length; i++) {
        const c = categorias[i];

        if (c === null || c === undefined) throw new EmptyValueException("categoria");
        if (!(c instanceof Category)) throw new WrongClass("Category", c.name);

        // Flyweight: reutilizar categoría existente si ya está en el Map
        if (this.#categories.has(c)) {
          // sustituye el parámetro con la existente
          // categorias[i] = this.#categories.get(c.name);
          throw new ObjetoYaExiste(c.name);
        } else {
          // si no existe la crea
          this.#categories.set(c, new Set());
        }
      }

      return this.#categories.size;
    }


    // Elimina una categoría. Al eliminar la categoría,
    // sus productos pasan a la de por defecto.
    removeCategory(...categories) {

      const destinoSet = this.#categories.get(categoryDefault.name);

      for (const c of categories) {
        // si se intenta borrar la categoria por defecto
        if (c.name === categoryDefault.name) throw new CategoryDefaultException();
        // si no hay datos
        if (c === null || c === undefined) throw new EmptyValueException("category");

        // si no se pasan para borrar categorias
        if (!(c instanceof Category)) throw new WrongClass("Category", c);

        // si esa categoria existe
        if (this.#categories.has(c)) {
          // copiar las entradas productions a la de por defecto
          const origenSet = this.#categories.get(c);

          // copiar las entradas a la de por defecto
          for (const i of origenSet) {
            destinoSet.add(i);
          }

          // borrar categoria
          this.#categories.delete(c);

        } else {
          throw new CategoryNoRegistrada(c.name);
        }
      }
      // devolver número de elementos
      return this.#categories.size;
    }

    // Getter users => en propiedades

    // addUser
    addUser(...users) {
      for (let i = 0; i < users.length; i++) {

        const user = users[i];

        // si usuario es null, o no definido
        if (user === null || user === undefined) throw new EmptyValueException("user");
        // si no es instancia de User
        if (!(user instanceof User)) throw new WrongClass("User", user);
        // comprobar si existe, no añadir
        if (this.#users.has(user.username)) throw new ObjetoYaExiste(user.username);
        if (this.#users.has(user.email)) throw new ObjetoYaExiste(user.email);

        // si no , pues añadirlo
        this.#users.set(user.username, user);
      }
      // devolve el número de usuarios
      return this.#users.size;
    }

    // removeUser
    removeUser(...users) {
      for (const c of users) {
        // comprobar entrada
        if ((c === null) || (c === undefined)) throw new EmptyValueException("user");
        if (!(c instanceof User)) throw new WrongClass("User", c);
        if (!(this.#users.has(c.username))) throw new ObjetoNoExiste(c);

        // eliminar usuario
        this.#users.delete(c.username);
        // devolver tamaño de usuarios
      }
      return this.#users.size;
    }

    // getter productions en propiedades de constructor

    // addProduction()
    addProduction(...productions) {
      for (const c of productions) {
        // comprobar entrada
        if ((c === null) || (c === undefined)) throw new EmptyValueException("productions");
        if (!(c instanceof Production)) throw new WrongClass("Production", c);
        // si tiene el mismo titulo y fecha es la misma Production
        if ((this.#productions.has(c.title)) && (this.#productions.has(c.publication))) {
          throw new ObjetoYaExiste(c);
        }

        // añadir Production

        this.#productions.set(c.title, c);

      }
    }

    // removeProduction()
    removeProduction(...productions) {
      for (const p of productions) {
        // comprobar entrada
        if ((p === null) || (p === undefined)) throw new EmptyValueException("productions");
        if (!(p instanceof Production)) throw new WrongClass("Proction", c.name);
        if (!this.#productions.has(p.title)) throw new ObjetoNoExiste(c.name);

        // eliminar
        this.#productions.delete(p.title);
      }
      // devolver tamaño de elementos
      return this.#productions.size;
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
