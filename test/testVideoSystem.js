"use strict";

// importar VideoSystem
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

// función de testeo de VideoSystem
function testVideoSystem() {
  console.log("=> Test VideoSystem <=");

  // crear objeto VideoSystem
  console.log("crear objeto VideoSystem");
  // obtener el singleton
  const videoM = VideoSystem.getInstance();
  videoM.name = "VideoManager";

  console.log(videoM);
  console.log("Nombre Sistema: " + videoM.name);

  console.log("Añadir Categorias");

  // addCategory
  videoM.addCategory(accion, drama, terror, romantica);
  // Getter categories
  // console.log("ver Categorias:");
  // console.dir([...videoM.categories]);
  let vercategorias = "   ";
  for (const cat of videoM.categories) {
    vercategorias += cat.name + ", ";
  }
  console.log("Ver iterator Categories: \n" + vercategorias);
  console.log("añadir categoria repetida, para ver excepción");
  try {
    videoM.addCategory(romantica);
  } catch (error) {
    console.error(error);
  }

  console.log("probar removeCategory(romantica): ");
  // probar removeCategory
  videoM.removeCategory(romantica);
  // mostrar categorias ahora
  console.log("categorias ahora: ");
  console.dir([...videoM.categories]);


  console.log("añadir usuarios:");
  videoM.addUser(ataulfo, user2, user3);

  let verUsuarios = "   ";
  for (const user of videoM.users) {
    verUsuarios += user.username + ", ";
  }
  console.log("ver iterator users:\n" + verUsuarios);

  // removeUser
  console.log("Borrar usuario : Ataulfo");
  videoM.removeUser(ataulfo);
  // ver usuarios ahora
  console.log("usuarios ahora: ");
  console.log([...videoM.users]);

  // añadir production
  console.log("addProduction: ");
  videoM.addProduction(elCuervo, simpson, silentHill, futurama);
  console.log("Probar iterator Productions");
  console.log([...videoM.productions]);

  console.log("borrar production: simpson, silentHill");
  let tamanio = videoM.removeProduction(simpson, silentHill);
  console.log("tamaño actual " + tamanio);
  console.log([...videoM.productions]);

  // añadir actor
  console.log("Añadir Actores => addActor(javier, penelope);");
  videoM.addActor(javier, penelope);
  console.log("Mostrar actores añadidos con iterator");
  console.log(...videoM.actors);

  console.log("Borrar un actor: removeActor(penelope)");
  const tamanioActors = videoM.removeActor(penelope);
  console.log("Número de actores ahora: " + tamanioActors);
  console.log(...videoM.actors);











}

// exportar función de testeo
export { testVideoSystem };