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
  comedia,
  // usuarios
  ataulfo,
  user2,
  user3,
  // productions
  elCuervo,
  silentHill,
  simpson,
  futurama,
  scaryMovie,
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
  console.log("");

  // crear objeto VideoSystem
  console.log("crear objeto VideoSystem");
  // obtener el singleton
  const videoM = VideoSystem.getInstance();
  videoM.name = "VideoManager";
  console.log("");

  console.log(videoM);
  console.log("Nombre Sistema: " + videoM.name);

  console.log("Añadir Categorias: accion, drama, terror, romantica");
  console.log("");

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
  console.log("añadir categoria \"romantica\" repetida, para ver excepción");
  try {
    videoM.addCategory(romantica);
  } catch (error) {
    console.error(error);
  }
  console.log("");

  console.log("probar removeCategory(romantica): ");
  // probar removeCategory
  videoM.removeCategory(romantica);
  // mostrar categorias ahora
  console.log("categorias ahora: ");
  console.dir([...videoM.categories]);
  console.log("");


  console.log("añadir usuarios: ataulfo, user2, user3");
  videoM.addUser(ataulfo, user2, user3);
  console.log("");

  let verUsuarios = "   ";
  for (const user of videoM.users) {
    verUsuarios += user.username + ", ";
  }
  console.log("ver iterator users:\n" + verUsuarios);
  console.log("");

  // removeUser
  console.log("Borrar usuario : Ataulfo");
  videoM.removeUser(ataulfo);
  // ver usuarios ahora
  console.log("usuarios ahora: ");
  console.log([...videoM.users]);
  console.log("");

  // añadir production
  console.log("addProduction: elCuervo, simpson, silentHill, futurama");
  videoM.addProduction(elCuervo, simpson, silentHill, futurama);
  console.log("Probar iterator Productions");
  console.log([...videoM.productions]);
  console.log("");

  console.log("borrar production: simpson, silentHill");
  let tamanio = videoM.removeProduction(simpson, silentHill);
  console.log("tamaño actual " + tamanio);
  console.log([...videoM.productions]);
  console.log("");

  // añadir actor
  console.log("Añadir Actores => addActor(javier, penelope);");
  videoM.addActor(javier, penelope);
  console.log("Mostrar actores añadidos con iterator");
  console.log(...videoM.actors);
  console.log("");

  console.log("Borrar un actor: removeActor(penelope)");
  const tamanioActors = videoM.removeActor(penelope);
  console.log("Número de actores ahora: " + tamanioActors);
  console.log(...videoM.actors);
  console.log("");

  // añadir directores
  console.log("añadir Directores: steven, alfred, scorsese");
  videoM.addDirector(steven, alfred, scorsese);
  // iterator directors
  console.log("mostrar iterator de directores añadidos: ");
  console.log(...videoM.directors);
  console.log("");

  // borrar directors
  console.log("Borrar director: alfred");
  console.log("número de directores ahora: " + videoM.removeDirector(alfred));
  console.log(...videoM.directors);
  console.log("");

  console.log(`Asignar Producciones a una categoria 
    assignCategory  terror (silent Hill, el Cuervo, futurama) `);
  const totalProductions = videoM.assignCategory(terror, silentHill, elCuervo, futurama);
  console.log("Total de producciones asignadas a la categoria terror: " + totalProductions);
  console.log("");

  console.log(`deassignCategory terror: quitar \"futurama\"`);
  const totalProductions1 = videoM.deassignCategory(terror, futurama);
  console.log("Total de producciones asignadas a la categoria terror: " + totalProductions1);
  console.log("");

  // si Category o Production no existen se añaden al sistema
  console.log("Si Category o Production no existe se añaden al sistema:");
  const totalProductions2 = videoM.assignCategory(comedia, scaryMovie);
  console.log(`assignCategory: comedia (scary Movie)`);
  console.log("Total de productions de category comedia: " + totalProductions2);
  console.log("");

  console.log("Asignar Productions a un director: ")
  console.log("assignDirector(steven, scaryMovie, elCuervo)  ");
  const totalProductions3 = videoM.assignDirector(steven, scaryMovie, elCuervo);
  console.log("Productions asignadas a Director \"Steven\": " + totalProductions3);
  console.log("");

  console.log("desasignar una production a Director Steven: scaryMovie");
  const totalProductions4 = videoM.deassignDirector(steven, scaryMovie);
  console.log("Productions asignadas a Director \"Steven\": " + totalProductions4);
  console.log("");
  console.log("Asignar Productions a Actor: )");
  console.log("assignActor(javier, silentHill, elCuervo, simpson)");
  const totalProductions5 = videoM.assignActor(javier, silentHill, elCuervo, simpson);
  console.log("Productions asignadas a Actor javier: " + totalProductions5);
  console.log("Desasignar productions a javer: silentHill y elCuervo");
  const totalProductions6 = videoM.deassignActor(javier, silentHill, elCuervo);
  console.log("Productions asignadas ahora a Actor javier: " + totalProductions6);
  console.log("");

  // probar getCast()
  console.log("Añadir production a actores: ");
  console.log(`assignActor(javier, silentHill, elCuervo, simpson);
assignActor(penelope, elCuervo, silentHill, simpson, futurama, scaryMovie);`);

  videoM.assignActor(javier, silentHill, elCuervo);
  videoM.assignActor(penelope, elCuervo, silentHill, simpson, futurama, scaryMovie);

  const silen = videoM.getCast(silentHill);
  const futur = videoM.getCast(futurama);

  console.log("Casting para SilenHill:");
  console.log(...silen);

  console.log("Casting para Futurama:");
  console.log(...futur);

  




}

// exportar función de testeo
export { testVideoSystem };