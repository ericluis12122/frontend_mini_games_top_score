import { VITE_BASE_URL } from "../../config.js";

const anonymous = document.getElementById("anonymous");

anonymous.addEventListener("click", async (event) => {
    event.preventDefault();
    const email = "anonymous@anonymous.anonymous";
    const password = "anonymous";

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
        window.location.href = "../dashboard.html";
    } else {
        alert("Error de autenticación");
    }
});