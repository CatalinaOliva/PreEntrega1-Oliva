// Definición de la clase Estudiante
class Estudiante {
  constructor(nombre, apellido, materia) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.materia = materia;
    this.notas = [];
  }

  agregarNota(nota) {
    this.notas.push(nota);
  }
}

// Array que va a contener todos los estudiantes
let estudiantes = [];

// Obtener referencia al formulario
const formulario = document.getElementById('formulario');

// Añadir evento submit al formulario
formulario.addEventListener('submit', function (event) {
  event.preventDefault(); // Evitar el envío del formulario

  // Obtener valores del formulario
  const nombre = document.getElementById('nombre').value;
  const apellido = document.getElementById('apellido').value;
  const materia = document.getElementById('materia').value;
  const nota1 = parseFloat(document.getElementById('nota1').value);
  const nota2 = parseFloat(document.getElementById('nota2').value);
  const nota3 = parseFloat(document.getElementById('nota3').value);

  // Validar notas entre 1 y 10
  if (isNaN(nota1) || nota1 < 1 || nota1 > 10 ||
    isNaN(nota2) || nota2 < 1 || nota2 > 10 ||
    isNaN(nota3) || nota3 < 1 || nota3 > 10) {
    const mensajeElemento = document.createElement('p');
    mensajeElemento.textContent = 'Ingrese notas válidas entre 1 y 10';
    document.body.appendChild(mensajeElemento);
    return;
  }

  // Crear objeto Estudiante
  const estudiante = new Estudiante(nombre, apellido, materia);
  estudiante.agregarNota(nota1);
  estudiante.agregarNota(nota2);
  estudiante.agregarNota(nota3);

  // Agregar estudiante al array estudiantes
  estudiantes.push(estudiante);

  // Mostrar mensaje de éxito utilizando el DOM
  const mensaje = `El estudiante ${nombre} ${apellido} ha sido agregado`;
  const mensajeElemento = document.createElement('p');
  mensajeElemento.textContent = mensaje;
  document.body.appendChild(mensajeElemento);

  // Guardar estudiantes en el sessionStorage
  guardarEstudiantesEnSessionStorage();

  // Limpiar los campos del formulario
  formulario.reset();
});

// Función para mostrar todos los estudiantes
function mostrarEstudiantes() {
  // Obtener referencia al elemento donde se mostrará la lista de estudiantes
  const estudiantesElemento = document.getElementById('estudiantesContainer');

  estudiantesElemento.innerHTML = ''; // Limpiar contenido previo

  if (estudiantes.length === 0) {
    estudiantesElemento.textContent = 'No hay estudiantes agregados';
  } else {
    // Recorrer el array de estudiantes y mostrar la información de cada uno
    estudiantes.forEach((estudiante) => {
      const estudianteElemento = document.createElement('div');
      estudianteElemento.innerHTML = `
        <h3>${estudiante.nombre} ${estudiante.apellido}</h3>
        <p>Materia: ${estudiante.materia}</p>
        <p>Notas: ${estudiante.notas.join(', ')}</p>
      `;
      estudiantesElemento.appendChild(estudianteElemento);
    });
  }
}

// Función para calcular el promedio de un array de notas (redondeado a 2 decimales)
function calcularPromedio(notas) {
  if (notas.length === 0) {
    return 0;
  }

  const suma = notas.reduce((total, nota) => total + nota, 0);
  const promedio = suma / notas.length;
  return promedio.toFixed(2);
}

// Añadir evento click al botón para mostrar los estudiantes
const mostrarEstudiantesBtn = document.getElementById('mostrarEstudiantesBtn');
mostrarEstudiantesBtn.addEventListener('click', function () {
  mostrarEstudiantes();


  // Calcular y mostrar promedio de notas (redondeado a 2 decimales)
  const promediosElemento = document.createElement('div');
  promediosElemento.innerHTML = `
  <h3>Promedio de Notas</h3>
  <ul>
    ${estudiantes
      .map(
        (estudiante) =>
          `<li>${estudiante.nombre} ${estudiante.apellido}: ${calcularPromedio(
            estudiante.notas
          )}</li>`
      )
      .join('')}
  </ul>
`;
  document.getElementById('estudiantesContainer').appendChild(promediosElemento);
});


// Obtener datos de estudiantes desde el sessionStorage
function obtenerEstudiantesDesdeSessionStorage() {
  const estudiantesJSON = sessionStorage.getItem('estudiantes');
  if (estudiantesJSON) {
    estudiantes = JSON.parse(estudiantesJSON);
  }
}

// Guardar datos de estudiantes en el sessionStorage
function guardarEstudiantesEnSessionStorage() {
  const estudiantesJSON = JSON.stringify(estudiantes);
  sessionStorage.setItem('estudiantes', estudiantesJSON);
}

// Función para registrar las calificaciones de un estudiante
function registrarCalificaciones() {
  if (estudiantes.length === 0) {
    const mensajeElemento = document.createElement('p');
    mensajeElemento.textContent = 'No hay estudiantes agregados';
    document.getElementById('notasContainer').appendChild(mensajeElemento);
  } else {
    const materiaInput = document.createElement('input');
    materiaInput.type = 'text';
    materiaInput.placeholder = 'Ingrese la materia';
    document.getElementById('notasContainer').appendChild(materiaInput);

    const agregarNotaBtn = document.createElement('button');
    agregarNotaBtn.textContent = 'Agregar Nota';
    agregarNotaBtn.addEventListener('click', function () {
      const materia = materiaInput.value.trim();
      const estudiante = estudiantes.find((e) => e.materia === materia);

      if (!estudiante) {
        const mensajeElemento = document.createElement('p');
        mensajeElemento.textContent = `No hay estudiantes agregados en ${materia}`;
        document.getElementById('notasContainer').appendChild(mensajeElemento);
      } else {
        const nombreInput = document.createElement('input');
        nombreInput.type = 'text';
        nombreInput.placeholder = 'Ingrese el nombre del estudiante';
        document.getElementById('notasContainer').appendChild(nombreInput);

        const apellidoInput = document.createElement('input');
        apellidoInput.type = 'text';
        apellidoInput.placeholder = 'Ingrese el apellido del estudiante';
        document.getElementById('notasContainer').appendChild(apellidoInput);

        const notaInput = document.createElement('input');
        notaInput.type = 'number';
        notaInput.min = 1;
        notaInput.max = 10;
        notaInput.placeholder = 'Ingrese una nota';
        document.getElementById('notasContainer').appendChild(notaInput);

        const confirmarBtn = document.createElement('button');
        confirmarBtn.textContent = 'Confirmar';
        confirmarBtn.addEventListener('click', function () {
          const nombre = nombreInput.value.trim();
          const apellido = apellidoInput.value.trim();
          const nota = parseFloat(notaInput.value);

          if (nombre === '' || apellido === '' || isNaN(nota) || nota < 1 || nota > 10) {
            const mensajeElemento = document.createElement('p');
            mensajeElemento.textContent = 'Ingrese un nombre, apellido y una nota válida entre 1 y 10';
            document.getElementById('notasContainer').appendChild(mensajeElemento);
          } else {
            estudiante.nombre = nombre;
            estudiante.apellido = apellido;
            estudiante.agregarNota(nota);

            const mensaje = `Las notas para ${estudiante.nombre} ${estudiante.apellido} en la materia de ${materia} son: ${estudiante.notas.join(', ')}`;
            const mensajeElemento = document.createElement('p');
            mensajeElemento.textContent = mensaje;
            document.getElementById('notasContainer').appendChild(mensajeElemento);

            // Limpiar los campos de inputs
            materiaInput.value = '';
            nombreInput.value = '';
            apellidoInput.value = '';
            notaInput.value = '';
          }
        });

        document.getElementById('notasContainer').appendChild(confirmarBtn);
      }
    });

    document.getElementById('notasContainer').appendChild(agregarNotaBtn);
  }
}

// Botón de borrar estudiantes
const borrarEstudiantesBtn = document.getElementById('borrarEstudiantesBtn');

// Añadir evento click al botón de borrar estudiantes
borrarEstudiantesBtn.addEventListener('click', function () {
  // Eliminar los datos almacenados de estudiantes
  sessionStorage.removeItem('estudiantes');

  // Limpiar el contenedor de resultados
  const mensajeContainer = document.getElementById('mensajeContainer');
  mensajeContainer.innerHTML = 'Estudiantes borrados exitosamente';

});

// Obtener datos de estudiantes desde el sessionStorage
obtenerEstudiantesDesdeSessionStorage();

// Añadir evento click al botón para registrar calificaciones
const registrarCalificacionesBtn = document.getElementById('registrarCalificacionesBtn');
registrarCalificacionesBtn.addEventListener('click', registrarCalificaciones);


window.addEventListener('DOMContentLoaded', function () {
  obtenerEstudiantesDesdeSessionStorage();
});

guardarEstudiantesEnSessionStorage();

