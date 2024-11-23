import { iniciarJuego } from "./game.js";

const API_URL = "http://localhost:4000";
const token = localStorage.getItem("authToken");

document.addEventListener("DOMContentLoaded", () => {
  if (!token) {
    alert("Inicia sesión para jugar.");
    return;
  }
  iniciarJuego(API_URL, token);
});
