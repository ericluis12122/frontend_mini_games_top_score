import { VITE_BASE_URL } from "../../config.js";

const form = document.getElementById("login-form");

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch(`${VITE_BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
        const data = await response.json(); // Parse JSON response
        const token = data.token; // Assumes the API response includes a "token" field
        localStorage.setItem("authToken", token); // Save token in localStorage
        window.location.href = "../pair/pair.html";
    } else {
        alert("Error de autenticación");
    }
});