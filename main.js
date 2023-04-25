let nombre = prompt("Ingrese su Nombre");

// function datos (x, ) {
//     while (x === "string") {
//         alert(`${x} No es un nombre valido!`);
//         nombre = prompt("Ingrese su Nombre");
//     }
// }

// datos (nombre)

let apellido = prompt("Ingrese su Apellido");
let materia = prompt("Ingrese el nombre de la Materia");
let primerParcial = parseFloat(prompt("Ingrese la nota de su primer Parcial"));


function notas(x, a) {
    while (x > 10 | x < 1 | isNaN(x)) {
        alert("El valor ingresado debe ser del 1 al 10.");
        primerParcial = parseFloat(prompt(`Ingrese la nota de su ${a} Parcial`));
    }
}

notas (primerParcial, "primer");


// while (primerParcial > 10 | primerParcial < 1 | isNaN(primerParcial)) {
//     alert("El valor ingresado debe ser del 1 al 10.");
//     primerParcial = parseFloat(prompt("Ingrese la nota de su primer Parcial"));
// }

let segundoParcial = parseFloat(prompt("Ingrese la nota de su segundo parcial"));

while (segundoParcial > 10 | segundoParcial < 1 | isNaN(segundoParcial)) {
    alert("El valor ingresado debe ser del 1 al 10.");
    segundoParcial = parseFloat(prompt("Ingrese la nota de su segundo parcial"));
}

let tercerParcial = parseFloat(prompt("Ingrese la nota de su tercer parcial"));

while (tercerParcial > 10 | tercerParcial < 1 | isNaN(tercerParcial)) {
    alert("El valor ingresado debe ser del 1 al 10.");
    tercerParcial = parseFloat(prompt("Ingrese la nota de su tercer Parcial"));
}

let resultados = (primerParcial + segundoParcial + tercerParcial) / 3;
let sumas = primerParcial + segundoParcial + tercerParcial;

if (sumas < 30 && sumas > 24) {
    alert(`Hola, ${nombre} ${apellido}, tu promedio general actual en ${materia} es de ${resultados}. Felicitaciones, estas aprobado`);
} else if (sumas < 24 && sumas > 14) {
    let proximaNota = 24 - (primerParcial + segundoParcial + tercerParcial);
    alert(`Hola, ${nombre} ${apellido}, tu promedio general actual en ${materia} es de ${resultados}. Para estar aprobado, en tu próximo parcial deberas obtener como mínimo un ${proximaNota}`);
} else if(sumas < 14) {
    alert(`Hola, ${nombre} ${apellido}, tu promedio general actual en ${materia} es de ${resultados}. Lamentablemente, estas desaprobado :( `);
} 