const apiBaseUrl = "http://backendminigamestopscore-production.up.railway.app:8080";

const form = document.getElementById("register-form");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const password2 = document.getElementById("password2").value;
  
  console.log(email, password);
  if(password === password2) {
    const response = await fetch(`${apiBaseUrl}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
  
    if (response.ok) {
      alert("Usuario registrado exitosamente");
      window.location.href = "/login.html";
    } else {
      alert("Error al registrar usuario");
    }
  }
  else {
    alert("La confirmacion del password no coincide");
  }
});