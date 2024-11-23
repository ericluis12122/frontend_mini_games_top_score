const form = document.getElementById("register-form");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const password2 = document.getElementById("password2").value;
  
  console.log(email, password);
  if(password === password2) {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
  
    if (response.ok) {
      alert("Usuario registrado exitosamente");
      const data = await response.json(); // Parse JSON response
      const token = data.token; // Assumes the API response includes a "token" field
      localStorage.setItem("authToken", token); // Save token in localStorage
      window.location.href = "../index.html";
    } else {
      alert("Error al registrar usuario");
    }
  }
  else {
    alert("La confirmacion del password no coincide");
  }
});