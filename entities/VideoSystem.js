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
    #actors = new Map();
    #directors = new Map();

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

      // Getter actors
      Object.defineProperty(this, 'actors', {
        enumerable: true,
        get() {
          // obtiene los actors
          const valor = this.#actors.keys();
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

      // Getter Director
      Object.defineProperty(this, 'directors', {
        enumerable: true,
        get() {
          // obtiene los actores
          const valor = this.#directors.keys();
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

      const destinoSet = this.#categories.get(categoryDefault);

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
        // comparar usuarios por email
        for (const u of this.#users.values()) {
          if (u.email === user.email) {
            throw new ObjetoYaExiste(user.email);
          }
        }


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
        if (!(p instanceof Production)) throw new WrongClass("Production", p.name);
        if (!this.#productions.has(p.title)) throw new ObjetoNoExiste(p.name);

        // eliminar
        this.#productions.delete(p.title);
      }
      // devolver tamaño de elementos
      return this.#productions.size;
    }


    // getters actor en propiedades del constructor

    // addActor()
    addActor(...actors) {
      for (const a of actors) {
        // comprobar entrada
        if ((a === null) || (a === undefined)) throw new EmptyValueException("actors");
        if (!(a instanceof Person)) throw new WrongClass("Person", a.name);
        if (this.#actors.has(a)) throw new ObjetoYaExiste(a.name);

        // añadir el actor
        this.#actors.set(a, new Set());
      }
      return this.#actors.size;
    }

    // removeActor
    removeActor(...actors) {
      for (const a of actors) {
        // comprobar entrada
        if ((a === null) || (a === undefined)) throw new EmptyValueException("actors");
        if (!(a instanceof Person)) throw new WrongClass("Person", a.name);
        if (!this.#actors.has(a)) throw new ObjetoNoExiste(a.name);

        // elimina el actor
        this.#actors.delete(a);
      }
      // devuelve el número de actores
      return this.#actors.size;
    }

    // Getter Director implementado en propiedades

    // addDirector
    addDirector(...directors) {
      for (const dir of directors) {
        // comprobar entrada
        if ((dir === null) || (dir === undefined)) throw new EmptyValueException("directors");
        if (!(dir instanceof Person)) throw new WrongClass("Person", dir.name);
        if (this.#directors.has(dir)) throw new ObjetoYaExiste(dir.name || "no definido");

        // añade el objeto
        this.#directors.set(dir, new Set());
      }
      // devolver número de directores
      return this.#directors.size;
    }

    // removeDirector()
    removeDirector(...directors) {
      for (const dir of directors) {
        // comprobar entrada
        if ((dir === null) || (dir === undefined)) throw new EmptyValueException("directors");
        if (!(dir instanceof Person)) throw new WrongClass("Person", dir.name);
        if (!this.#directors.has(dir)) throw new ObjetoNoExiste(dir.name || "no definido");

        // borra el director
        this.#directors.delete(dir);
      }
      return this.#directors.size;
    }

    // assignCategory
    // Asigna uno más producciones a una categoría.
    // Si el objeto Category o Production no existen se añaden al sistema.
    assignCategory(category, ...production) {
      // comprobar entrada
      if ((category === null) || (category === undefined)) throw new EmptyValueException("category");
      if (!(category instanceof Category)) throw new WrongClass("Category", category.name);
      // flyweight solo se crea si no existe
      if (!(this.#categories.has(category))) {
        this.addCategory(category);
      }

      // obtejer categoria
      const categoriaGuardar = this.#categories.get(category);
      // recorrer el rest
      for (const pro of production) {

        if ((pro === null) || (pro === undefined)) throw new EmptyValueException("production");
        if (!(pro instanceof Production)) throw new WrongClass("production", pro.name);

        // comprobar si existe la categoria o la production
        // category si no existe se crea
        // production si no existe se crea
        if (!(this.#productions.has(pro.title))) {
          this.addProduction(pro);
        }

        // asignar las productions a la categoria
        categoriaGuardar.add(pro);

      }

      // devolver el número de produccions asignadas a la categoria
      return this.#categories.get(category).size;

    }

    // deassignCategory
    // Desasigna una o más producciones de una categoría.
    deassignCategory(category, ...productions) {
      // comprobar entrada
      if ((category === null) || (category === undefined)) throw new EmptyValueException("category");
      if (!(category instanceof Category)) throw new WrongClass("Category", category.name);
      if (!this.#categories.has(category)) throw new CategoryNoRegistrada(category.name);

      // obtener categoria
      const categoriaGuardar = this.#categories.get(category);

      // recorrer el rest
      for (const pro of productions) {

        // comprobar entrada
        if ((pro === null) || (pro === undefined)) throw new EmptyValueException("Production");
        if (!(pro instanceof Production)) throw new WrongClass("Productions", pro.name);

        // si existe esa production desasignar
        if (categoriaGuardar.has(pro)) {
          categoriaGuardar.delete(pro);

        }
      }
      // devolver tamaño de esa categoria pasada por parametros
      return categoriaGuardar.size;
    }

    // assignDirector
    assignDirector(director, ...productions) {
      // comprobar entrada
      if ((director === null) || (director === undefined)) throw new EmptyValueException("director");
      if (!(director instanceof Person)) throw new WrongClass("Director", director.name);

      // añadir el director si no existe en el sistema
      if (!(this.#directors.has(director))) {
        this.addDirector(director);
      }

      // directorMap
      const directorMap = this.#directors.get(director);

      // recorrer productions
      for (const p of productions) {
        // comprobar entrada
        if ((p === null) || (p === undefined)) throw new EmptyValueException("productions");
        if (!(p instanceof Production)) throw new WrongClass("Production", p.name);

        // si no existe la productions se añade al sistema
        if (!(this.#productions.has(p.title))) {
          this.addProduction(p);
        }

        // asignar la productions al director
        directorMap.add(p);
      }
      // devolver el tamaño
      return directorMap.size;
    }

    // deassignDirector
    deassignDirector(director, ...productions) {
      // comprobar entrada
      if ((director === null) || (director === undefined)) throw new EmptyValueException("director");
      if (!(director instanceof Person)) throw new WrongClass("Director", director.name);
      // si no existe ese director lanza excepción
      if (!(this.#directors.has(director))) throw new ObjetoNoExiste(director.name);

      // Obtener director
      const directorMap = this.#directors.get(director);

      // recorrer productions
      for (const pro of productions) {
        // comprobar entrada
        if ((pro === null) || (pro === undefined)) throw new EmptyValueException("Production");
        if (!(pro instanceof Production)) throw new WrongClass("Productions", pro.name);

        // borrar production del director
        directorMap.delete(pro);

      }
      // devuelve tamaño de productions del director
      return directorMap.size;
    }

    // assignActor
    assignActor(actor, ...productions) {
      // comprobar entrada
      if ((actor === null) || (actor === undefined)) throw new EmptyValueException("actor");
      if (!(actor instanceof Person)) throw new WrongClass("Actor", actor.name);

      // si no existe el actor se crea
      if (!(this.#actors.has(actor))) {
        this.addActor(actor);
      }

      // actor Map
      const actorMap = this.#actors.get(actor);

      // recorrer productions
      for (const pro of productions) {
        // comprobar entrada
        if ((pro === null) || (pro === undefined)) throw new EmptyValueException("Production");
        if (!(pro instanceof Production)) throw new WrongClass("Productions", pro.name);

        // si no existe la production se añade
        if (!(this.#productions.has(pro.title))) {
          this.addProduction(pro);
        }

        // asignar esa productions al actor
        actorMap.add(pro);
      }
      // devolver número de productions del actor
      return actorMap.size;

    }

    // deassignActor
    deassignActor(actor, ...productions) {
      // comprobar entrada
      if ((actor === null) || (actor === undefined)) throw new EmptyValueException("actor");
      if (!(actor instanceof Person)) throw new WrongClass("Actor", actor.name);
      // si no existe el actor lanza excepción
      if (!(this.#actors.has(actor))) throw new ObjetoNoExiste(actor.name);

      // actor Map
      const actorMap = this.#actors.get(actor);

      // recorrer productions
      for (const pro of productions) {
        // comprobar entrada
        if ((pro === null) || (pro === undefined)) throw new EmptyValueException("Production");
        if (!(pro instanceof Production)) throw new WrongClass("Productions", pro.name);

        // borrar productions del actor 
        actorMap.delete(pro);

      }
      // devuelve tamaño de productions del actor
      return actorMap.size;
    }

    // getCast
    getCast(production) {
      // comprobar entrada
      if ((production === null) || (production === undefined)) throw new EmptyValueException("production");
      if (!(production instanceof Production)) throw new WrongClass("Production", production.name);

      // array temporal 
      const actores = [];

      // recorrer los actores
      for (const [actor, productions] of this.#actors) {
        if (productions.has(production)) {
          actores.push(actor);
        }
      }

      // devolver iterator 
      let indice = 0;
      return {
        [Symbol.iterator]() {
          return {
            next() {
              if (indice < actores.length) {
                return { value: actores[indice++], done: false };
              }
              return { value: undefined, done: true };
            }
          };
        }
      };
    }

    // getProductionsDirector
    getProductionsDirector(director) {
      // comprobar entrada
      if (director === null || director === undefined) throw new EmptyValueException("director");
      if (!(director instanceof Person)) throw new WrongClass("Director", director.name);

      // si el director no existe
      if (!this.#directors.has(director)) throw new ObjetoNoExiste("Director", director.name);

      const pro = Array.from(this.#directors.get(director));
      let indice = 0;

      // devolver iterator 
      return {
        [Symbol.iterator]() {
          return {
            next() {
              if (indice < pro.length) {
                return { value: pro[indice++], done: false };
              }
              return { value: undefined, done: true };
            }
          };
        }
      };
    }

    // getProductionsActor
    getProductionsActor(actor) {
      // comprobar datos
      if (!actor) throw new EmptyValueException("actor");
      if (!(actor instanceof Person)) throw new WrongClass("Actor", actor.name);
      if (!this.#actors.has(actor)) throw new ObjetoNoExiste(actor.name);

      // guarda un array con las productore del actor
      const productions = Array.from(this.#actors.get(actor));
      let index = 0;

      // devuelve el iterador
      return {
        [Symbol.iterator]() {
          return {
            next() {
              // mientras sea menor a la longitud
              if (index < productions.length) {
                return { value: productions[index++], done: false };
              }
              return { value: undefined, done: true };
            }
          };
        }
      };
    }


    // getProductionsCategory
    getProductionsCategory(category) {
      // comprobar la entrada de datos
      if (!category) throw new EmptyValueException("category");
      if (!(category instanceof Category)) throw new WrongClass("Category", category.name);
      if (!this.#categories.has(category)) throw new CategoryNoRegistrada(category.name);

      // guardar producciones de esa categoría
      const productionCateg = this.#categories.get(category);
      // convertir a array
      const productions = Array.from(productionCateg);
      let index = 0;

      // return iterador
      return {
        [Symbol.iterator]() {
          return {
            next() {
              if (index < productions.length) {
                return { value: productions[index++], done: false };
              }
              return { value: undefined, done: true };
            }
          };
        }
      };
    }

    // createPerson
    createPerson(name, lastname1, lastname2 = "", born, picture = "") {
      // comprobar entrada
      if (!name) throw new EmptyValueException("name");
      if (!lastname1) throw new EmptyValueException("lastname1");
      if (!born) throw new EmptyValueException("born");

      // comprobar si existe
      // ver actores
      for (const actor of this.#actors.keys()) {
        if (
          actor.name === name &&
          actor.lastname1 === lastname1 &&
          actor.born.getTime() === new Date(born).getTime()
        ) {
          return actor; // Retorna actor que ya habia sido creado antes
        }
      }

      // ver  directores
      for (const director of this.#directors.keys()) {
        if (
          director.name === name &&
          director.lastname1 === lastname1 &&
          director.born.getTime() === new Date(born).getTime()
        ) {
          return director; // Retorna director existente
        }
      }

      // si no existe, pues crear nueva Person
      return new Person(name, lastname1, lastname2, born, picture);
    }


    // createProduction
    createProduction(title, publication, nationality = "Sin Nacionalidad", synopsis = "Sin synopsis", image = "Sin imagen") {
      if (!title) throw new EmptyValueException("title");
      if (!publication) throw new EmptyValueException("publication");

      const pubDate = publication instanceof Date ? publication : new Date(publication);

      // Buscar en productions
      for (const prod of this.#productions.values()) {
        if (prod.title === title && prod.publication.getTime() === pubDate.getTime()) {
          return prod; // instancia que ya existe
        }
      }

      // No existe: crear nuevo objeto 
      // al ser abstracta usa la herencia
      return new (class extends Production { })(
        title,
        nationality,
        pubDate,
        synopsis,
        image
      );
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
