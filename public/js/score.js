export class Score {
    constructor(apiUrl, token, gameName) {
      console.log(apiUrl);
      this.apiUrl = apiUrl;
      this.token = token;
      this.gameName = gameName;
    }
    
    async agregarPuntuacion(time, count) {
      try {
        const response = await fetch(`${this.apiUrl}/${this.gameName}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.token}`,
          },
          body: JSON.stringify({ time, count }),
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        const data = await response.json();
        if (data.message) {
          alert(data.message);
        }
      } catch (error) {
        console.error("Error al guardar el puntaje:", error);
      }
    }
  
    async obtenerPuntuaciones() {
      try {
        const response = await fetch(`${this.apiUrl}/${this.gameName}`, {
          headers: { Authorization: `Bearer ${this.token}` },
        });
        if (!response.ok) throw new Error("Error al obtener los puntajes");
        return await response.json();
      } catch (error) {
        console.error(error.message);
        return [];
      }
    }
  
    async pintar(elemento) {
      const {scores, loggedInUserId} = await this.obtenerPuntuaciones();
      if(scores)
        scores.sort((a, b) => Number(a.time) - Number(b.time));
      elemento.innerHTML = "";
      const tabla = document.createElement("table");
  
      tabla.innerHTML = `
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Tiempo</th>
            <th>Clicks</th>
          </tr>
        </thead>
      `;
  
      const tbody = document.createElement("tbody");
      if(scores)
        scores.forEach(({user_id: {_id, username}, time, count }) => {
          const tr = document.createElement("tr");
          if(loggedInUserId === _id) tr.style.backgroundColor = "#97F7B0";
          tr.innerHTML = `
            <td>${username}</td>
            <td>${this.convertirTiempo(time)}</td>
            <td>${count}</td>
          `;
          tbody.appendChild(tr);
        });
  
      tabla.appendChild(tbody);
      elemento.appendChild(tabla);
    }

    async pintarUsername(elemento, cantidad) {
      try {
          const { scores } = await this.obtenerPuntuaciones();
  
          // Asegúrate de que scores es un arreglo y está ordenado
          if (!Array.isArray(scores)) {
              throw new Error("Los puntajes no están en un formato válido.");
          }
  
          // Ordenar por tiempo (menor a mayor)
          scores.sort((a, b) => Number(a.time) - Number(b.time));
  
          // Limpiar el contenido del elemento
          elemento.innerHTML = "<p>Top 3:</p>";
  
          // Iterar y mostrar los puntajes hasta el límite indicado por 'cantidad'
          for (let i = 0; i < Math.min(cantidad, scores.length); i++) {
              const score = scores[i];
              const username = score.user_id?.username || "Unknown"; // Evitar errores si falta el username
              elemento.innerHTML += `<p>${username}</p>`;
          }
      } catch (error) {
          console.error("Error al obtener y pintar los puntajes:", error);
          elemento.innerHTML = "<p>Error loading scores.</p>";
      }
  }  
  
    convertirTiempo(milisegundos) {
      const minutos = Math.floor(milisegundos / 60000);
      const segundos = Math.floor((milisegundos % 60000) / 1000);
      const ms = milisegundos % 1000;
      return `${String(minutos).padStart(2, "0")}:${String(segundos).padStart(2, "0")}:${String(ms).padStart(3, "0")}`;
    }
  }
  