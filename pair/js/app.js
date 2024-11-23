import { iniciarJuego } from "./game.js";

const token = localStorage.getItem("authToken");

document.addEventListener("DOMContentLoaded", () => {
  if (!token) {
    alert("Inicia sesión para jugar.");
    return;
  }
  iniciarJuego(import.meta.env.VITE_BASE_URL, token);
});
