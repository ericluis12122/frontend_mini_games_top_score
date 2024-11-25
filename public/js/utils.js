function mezclarArreglo(array) {
    for (let i = array.length - 1; i > 0; i--) {
        // Generar un índice aleatorio entre 0 y i
        const j = Math.floor(Math.random() * (i + 1));

        // Intercambiar los elementos en las posiciones i y j
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function convertirToMatrix(array) {
    const output = [];
    for (let i = 0; i < 64; i += 8)
        output.push(array.slice(i, i + 8));
    return output;        
}

export {mezclarArreglo, convertirToMatrix};