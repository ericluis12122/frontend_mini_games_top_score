import { mezclarArreglo } from "../../public/js/utils.js";
import { Stopwatch } from "../../public/js/stopwatch.js";
import { Score } from "../../public/js/score.js";

export function iniciarJuego(apiUrl, token) {
  const colors = [
    "blue", "red", "yellow", "green", "gray", "orange", "violet",
    "skyblue", "purple", "greenyellow", "maroon", "aliceblue"
  ];
  const contenedor = document.getElementsByClassName("contenedor")[0];
  const con = document.getElementById("contador");
  const rank = new Score(apiUrl, token, 'pair');
  const timer = new Stopwatch();
  let parejas = 0, actual = null, waiting = false, contador = 0;

  rank.pintar(document.getElementById("score"));

  const coloresDuplicados = mezclarArreglo([...colors, ...colors]);

  coloresDuplicados.forEach((color, i) => {
    const cuadro = document.createElement("div");
    cuadro.addEventListener("click", () => {
      if (waiting || cuadro === actual) return;

      cuadro.classList.add(color);
      contador++;
      con.textContent = contador;

      if (!actual) {
        actual = cuadro;
      } else {
        if (cuadro.className === actual.className) {
          parejas++;
          if (parejas === 12) {
            timer.stop();
            rank.agregarPuntuacion(timer.ms + timer.sec * 1000 + timer.min * 60000, contador);
            setTimeout(() => {
              rank.pintar(document.getElementById("score"));
              window.location.reload();
            }, 3000);
          }
          actual = null;
        } else {
          waiting = true;
          setTimeout(() => {
            cuadro.className = "";
            actual.className = "";
            actual = null;
            waiting = false;
          }, 500);
        }
      }
      if (contador === 1) timer.start();
    });
    contenedor.appendChild(cuadro);
  });
}
