"use strict";

import {
  VideoSystem,
  Person,
  Category,
  Resource,
  Movie,
  Serie,
  User,
  Coordinate,

} from "../entities/VideoSystem.js";

// objetos

// categorias
const accion = new Category("Acción", "Categoria Acción");
const drama = new Category("Drama", "Categoria Drama");
const terror = new Category("Terror", "Categoria Terror");
const romantica = new Category("Romantica", "Categoria Romantica");

// usuarios
const ataulfo = new User("Ataulfo", "afaulfo_71@gmail.com", "1234");
const user2 = new User("Santiago", "santi_@gmail.com", "pasS");
const user3 = new User("Capi", "cappii@gmail.com", "pass1234");

// production 
//Movie
const elCuervo = new Movie(
  "The Crow",
  "EEUU",
  new Date(2024, 0, 1),
  "Synopsis: trata de venganza",
  "El Cuervo.jpg",
  new Resource(120, "El Cuervo.mkv"),
  [new Coordinate(12, 12)]
);

const silentHill = new Movie(
  "Silent Hill",
  "EEUU",
  new Date(2006, 0, 1),
  "Una madre busca a su hija en silent hill",
  "SilentHill.jpg",
  new Resource(150, "SilentHill1.mkv"),
  [new Coordinate(13, 13)]
);

const simpson = new Serie(
  "Los simpsons",
  "EEUU",
  new Date(1989, 11, 17),
  "Los simpsons de toda la vida",
  "simsons.jpg",
  new Resource(30, "los Simpsons.mkv"),
  [new Coordinate(14, 14)]
);

const futurama = new Serie(
  "Futurama",
  "EEUU",
  new Date(1999, 11, 31),
  "Fry se congela y aparece en el futuro",
  "Futurama.jpg",
  new Resource(30, "futurama.mkv"),
  [new Coordinate(30, 30)]
);

// añadir Actores Objetos Person
const javier = new Person(
  "Javier",
  "Barden",
  undefined,
  new Date(1969, 2, 1),
  "JavierBarden.jpg"
);

const penelope = new Person(
  "Penelope",
  "Cruz",
  undefined,
  new Date(1974, 3, 28),
  "Penelope.jpg"
);

const steven = new Person(
  "Steven",
  "Spielverg",
  undefined,
  new Date(1946, 11, 18),
  "Steven.jpg"
);

const alfred = new Person(
  "Alfred",
  "Hitchcock",
  undefined,
  new Date(1899, 8, 13),
  "Alfred.jpg"
);

const scorsese = new Person(
  "Martin",
  "Scorsese",
  undefined,
  new Date(1942, 10, 17),
  "Martin.jpg"
);

export {
  accion,
  drama,
  terror,
  romantica,
  ataulfo,
  user2,
  user3,
  elCuervo,
  silentHill,
  simpson,
  futurama,
  javier,
  penelope,
  steven,
  alfred,
  scorsese,
}