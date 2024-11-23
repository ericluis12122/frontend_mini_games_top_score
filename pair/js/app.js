import { iniciarJuego } from "./game.js";

const API_URL = "http://backendminigamestopscore-production.up.railway.app";
const token = localStorage.getItem("authToken");

document.addEventListener("DOMContentLoaded", () => {
  if (!token) {
    alert("Inicia sesión para jugar.");
    return;
  }
  iniciarJuego(API_URL, token);
});
