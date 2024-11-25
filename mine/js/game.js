import {mezclarArreglo, convertirToMatrix} from '../../public/js/utils.js';
import { Stopwatch } from "../../public/js/stopwatch.js";
import { Score } from "../../public/js/score.js";

export class BuscaMinas {
    #tablero;
    #len_x;
    #len_y;
    #cuadrosRestantes;
    #numberColors = { 1: 'blue', 2: 'green', 3: 'orange', 4: 'red', 5: 'darkred' };
    #timer;
    #rank;
    #count = 0;

    constructor(minas, rows, cols, timer, rank) {
        this.#cuadrosRestantes = rows * cols - minas;
        this.#timer = timer;
        this.#rank = rank;

        // Crear tablero con minas (-10) y espacios en blanco (0)
        let tableroPlano = new Array(minas).fill(-10).concat(new Array(this.#cuadrosRestantes).fill(0));
        tableroPlano = mezclarArreglo(tableroPlano);
        this.#tablero = convertirToMatrix(tableroPlano, rows, cols);

        // Dimensiones del tablero
        this.#len_x = rows;
        this.#len_y = cols;

        // Contar minas adyacentes
        this.#contarMinas();
    }

    #posicionValida(x, y) {
        return x >= 0 && x < this.#len_x && y >= 0 && y < this.#len_y;
    }

    #contarMinas() {
        for (let x = 0; x < this.#len_x; x++) {
            for (let y = 0; y < this.#len_y; y++) {
                if (this.#tablero[x][y] < 0) {
                    for (let i = x - 1; i <= x + 1; i++) {
                        for (let j = y - 1; j <= y + 1; j++) {
                            if (this.#posicionValida(i, j) && this.#tablero[i][j] >= 0) {
                                this.#tablero[i][j]++;
                            }
                        }
                    }
                }
            }
        }
    }

    #jugar(x, y) {
        const element = this.#tablero[x][y];
        
        // Si ya se jugó, no continuar
        if (element.getAttribute('data-jugado') === 'si') return;

        const value = element.getAttribute('data-value');
        element.setAttribute('data-jugado', 'si');
        this.#cuadrosRestantes--;

        // Mostrar la celda
        element.style.backgroundColor = 'rgb(175, 198, 240)';
        element.textContent = value;
        element.style.color = this.#numberColors[value] ?? 'black';

        // Perder si es mina
        if (value === '*') {
            this.#timer.stop();
            this.#desactivarTablero();
            return;
        }

        // Abrir espacios vacíos
        if (value === '0') {
            element.textContent = ' ';
            for (let i = x - 1; i <= x + 1; i++) {
                for (let j = y - 1; j <= y + 1; j++) {
                    if (this.#posicionValida(i, j)) {
                        this.#jugar(i, j);
                    }
                }
            }
        }

        // Verificar victoria
        if (this.#cuadrosRestantes === 0) {
            this.#timer.stop();
            this.#rank.agregarPuntuacion(this.#timer.ms + this.#timer.sec * 1000 + this.#timer.min * 60000, this.#count);
            setTimeout(() => {
              this.#rank.pintar(document.getElementById("score"));
              //window.location.reload();
            }, 3000);
            this.#desactivarTablero();
        }
    }

    #desactivarTablero() {
        const tablero = document.getElementById('tablero');
        tablero.classList.add('tablero-desactivado');
        document.getElementById('reiniciar').style.visibility = 'visible';
    }

    pintar(tablero) {
        tablero.innerHTML = '';
        for (let x = 0; x < this.#len_x; x++) {
            for (let y = 0; y < this.#len_y; y++) {
                const cuadro = document.createElement("div");
                cuadro.setAttribute('data-value', this.#tablero[x][y] < 0 ? '*' : this.#tablero[x][y]);
                cuadro.setAttribute('data-jugado', 'no');
                this.#tablero[x][y] = cuadro;

                // Agregar evento con `once: true`
                cuadro.addEventListener('click', () => {
                    this.#count++;
                    document.getElementById('contador').textContent = this.#count;
                    this.#jugar(x, y);
                }, { once: true });

                tablero.appendChild(cuadro);
            }
        }
    }
}

export function startGame(url, token) {
    const tablero = document.getElementById('tablero');
    tablero.classList.remove('tablero-desactivado');
    document.getElementById('reiniciar').style.visibility = 'hidden';
    document.getElementById('contador').textContent = '';
    const timer = new Stopwatch();
    timer.update();
    const rank = new Score(url, token, 'mine')
    const game = new BuscaMinas(10, 8, 8, timer, rank);
    rank.pintar(document.getElementById("score"));
    // Iniciar el cronómetro al primer clic si no se toca una mina
    tablero.addEventListener('click', (event) => {
        const target = event.target;
        const value = target.getAttribute('data-value');

        if (value !== '*') {
            timer.start();
        } else {
            timer.stop(); // Asegura que no inicie si es una mina
        }
    }, { once: true });

    game.pintar(tablero);
}
