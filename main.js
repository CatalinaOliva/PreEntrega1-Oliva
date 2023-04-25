const MAX_NOTA = 10;

let nombre = prompt("Ingrese su Nombre");
let apellido = prompt("Ingrese su Apellido");
let materia = prompt("Ingrese el nombre de la Materia");

let primerParcial = validarNota("primer");
let segundoParcial = validarNota("segundo");
let tercerParcial = validarNota("tercer");

let resultados = (primerParcial + segundoParcial + tercerParcial) / 3;
let sumas = primerParcial + segundoParcial + tercerParcial;

if (sumas < 30 && sumas > 24) {
    alert(`Hola, ${nombre} ${apellido}, tu promedio general actual en ${materia} es de ${resultados}. Felicitaciones, estás aprobado`);
} else if (sumas < 24 && sumas > 14) {
    let proximaNota = 24 - sumas;
    alert(`Hola, ${nombre} ${apellido}, tu promedio general actual en ${materia} es de ${resultados}. Para estar aprobado, en tu próximo parcial deberás obtener como mínimo un ${proximaNota}`);
} else if (sumas < 14) {
    alert(`Hola, ${nombre} ${apellido}, tu promedio general actual en ${materia} es de ${resultados}. Lamentablemente, estás desaprobado :(`);
}

function validarNota(numParcial) {
    let nota;
    do {
        nota = parseFloat(prompt(`Ingrese la nota de su ${numParcial} parcial`));
        if (isNaN(nota) || nota < 1 || nota > MAX_NOTA) {
            alert(`La nota ingresada debe ser un número entre 1 y ${MAX_NOTA}`);
        }
    } while (isNaN(nota) || nota < 1 || nota > MAX_NOTA);
    return nota;
}