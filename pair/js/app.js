import { iniciarJuego } from "./game.js";
import { VITE_BASE_URL } from "../../config.js";

const token = localStorage.getItem("authToken");

document.addEventListener("DOMContentLoaded", () => {
  if (!token) {
    alert("Inicia sesión para jugar.");
    return;
  }
  iniciarJuego(VITE_BASE_URL, token);
});
