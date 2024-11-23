export class Score {
    constructor(apiUrl, token) {
      this.apiUrl = apiUrl;
      this.token = token;
    }
    
    async agregarPuntuacion(time, count) {
      try {
        const response = await fetch(`${this.apiUrl}/pair`, {
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
          alert(data.message); // Muestra el mensaje al usuario
        }
      } catch (error) {
        console.error("Error al guardar el puntaje:", error);
      }
    }
  
    async obtenerPuntuaciones() {
      try {
        const response = await fetch(`${this.apiUrl}/pair`, {
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
      const scores = await this.obtenerPuntuaciones();
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
      scores.forEach(({ username, time, count }) => {
        const tr = document.createElement("tr");
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
  
    convertirTiempo(milisegundos) {
      const minutos = Math.floor(milisegundos / 60000);
      const segundos = Math.floor((milisegundos % 60000) / 1000);
      const ms = milisegundos % 1000;
      return `${String(minutos).padStart(2, "0")}:${String(segundos).padStart(2, "0")}:${String(ms).padStart(3, "0")}`;
    }
  }
  