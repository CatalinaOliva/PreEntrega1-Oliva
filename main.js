let nombre = prompt("Ingrese su Nombre");

// function datos (x) {
//     while (x === "string") {
//         alert(`${x} No es un nombre valido!`);
//         nombre = prompt("Ingrese su Nombre");
//     }
// }

// datos (nombre)

let apellido = prompt("Ingrese su Apellido");
let materia = prompt("Ingrese el nombre de la Materia");
let primerParcial = parseFloat(prompt("Ingrese la nota de su primer Parcial"));
let segundoParcial = parseFloat(prompt("Ingrese la nota de su segundo parcial"));
let tercerParcial = parseFloat(prompt("Ingrese la nota de su tercer parcial"));


notas (primerParcial, "primer");
notas (segundoParcial, "segundo")
notas (tercerParcial, "tercer")

function notas(x, a) {
    while (x > 10 | x < 1 | isNaN(x)) {
        alert("El valor ingresado debe ser del 1 al 10.");
        primerParcial = parseFloat(prompt(`Ingrese la nota de su ${a} Parcial`));
        return;
    }
}

// while (primerParcial > 10 | primerParcial < 1 | isNaN(primerParcial)) {
//     alert("El valor ingresado debe ser del 1 al 10.");
//     primerParcial = parseFloat(prompt("Ingrese la nota de su primer Parcial"));
// }

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