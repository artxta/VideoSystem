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

// importar objetos de prueba
import {
  // categorias
  accion,
  drama,
  terror,
  romantica,
  // usuarios
  ataulfo,
  user2,
  user3,
  // productions
  elCuervo,
  silentHill,
  simpson,
  futurama,
  // actores
  javier,
  penelope,
  // directores
  steven,
  alfred,
  scorsese,
} from "./testObjetosPrueba.js";

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

  // añadir directores
  console.log("añadir Directores");
  videoM.addDirector(steven, alfred, scorsese);
  // iterator directors
  console.log("mostrar iterator de directores añadidos: ");
  console.log(...videoM.directors);

  // borrar directors
  console.log("Borrar director: ");
  console.log("número de directores ahora: " + videoM.removeDirector(alfred));
  console.log(...videoM.directors);


  console.log("Asignar Producciones a una categoria");










}

// exportar función de testeo
export { testVideoSystem };