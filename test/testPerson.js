"use strict";

// importar Person
import { Person } from "../entidades/Person.js";

// función de prueba
function testPerson() {
  // crear persona
  const juanillo = new Person(
    "Juanillo",
    "Garcia",
    undefined,
    new Date("1991/12/20"),
    undefined
  );

  // comprobar metodo
  console.log("=> Test Objeto Person <=\n");
  console.log("toString()\n " + juanillo.toString());

  // comprobar set()
  console.log("cambiar atributos y acceder por atributos");
  juanillo.name = "Antonio";
  juanillo.lastname1 = "Vaquero";
  juanillo.lastname2 = "Gonzalez";
  juanillo.born = new Date("1989/11/21");
  juanillo.picture = "url(picture.jpg)";

  // comprobar get()
  console.log(
    juanillo.name + " " +
    juanillo.lastname1 + " " +
    juanillo.lastname2 + ", " +
    juanillo.born.toLocaleDateString() + ", " +
    juanillo.picture
  );
  console.log("=============================================");
}

// exportar la clase
export { testPerson };