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
  console.log([...videoM.users]);

  





}

// exportar función de testeo
export { testVideoSystem };