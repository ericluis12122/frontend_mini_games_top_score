import { startGame } from "./game.js";
import { VITE_BASE_URL } from "../../config.js";

const token = localStorage.getItem("authToken");

document.addEventListener("DOMContentLoaded", () => {
    if (!token) {
      alert("Inicia sesión para jugar.");
      return;
    }
    document.getElementById('reiniciar').addEventListener('click', () => {
        startGame(VITE_BASE_URL, token);
    });
    startGame(VITE_BASE_URL, token);
  });
  