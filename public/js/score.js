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
  
    convertirTiempo(milisegundos) {
      const minutos = Math.floor(milisegundos / 60000);
      const segundos = Math.floor((milisegundos % 60000) / 1000);
      const ms = milisegundos % 1000;
      return `${String(minutos).padStart(2, "0")}:${String(segundos).padStart(2, "0")}:${String(ms).padStart(3, "0")}`;
    }
  }
  