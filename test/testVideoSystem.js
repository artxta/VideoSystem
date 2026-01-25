"use strict";

// importar VideoSystem
import {
  VideoSystem,

} from "../entities/VideoSystem.js";

// función de testeo de VideoSystem
function testVideoSystem() {
  console.log("=> Test VideoSystem <=");

  // crear objeto VideoSystem
  console.log("crear objeto VideoSystem");
  // obtener el singleton
  const videoM = VideoSystem.getInstance();
  videoM.name = "VideoManager";

  console.log(videoM);

  console.log("Añadir Categoria");



}

// exportar función de testeo
export { testVideoSystem };