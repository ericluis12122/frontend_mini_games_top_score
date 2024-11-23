export function arregloAleatorio(array, rondas) {
    for (let i = 0; i < rondas; i++) {
      const r1 = Math.floor(Math.random() * array.length);
      const r2 = Math.floor(Math.random() * array.length);
      [array[r1], array[r2]] = [array[r2], array[r1]];
    }
    return array;
  }
  