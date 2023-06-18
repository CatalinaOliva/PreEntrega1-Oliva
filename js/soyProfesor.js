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
  registrarCalificaciones();

  // Obtener valores del formulario
  const nombre = document.getElementById('nombre').value;
  const apellido = document.getElementById('apellido').value;
  const materia = document.getElementById('materia').value;
  const nota1 = parseFloat(document.getElementById('nota1').value);
  const nota2 = parseFloat(document.getElementById('nota2').value);
  const nota3 = parseFloat(document.getElementById('nota3').value);

  // Validar campos obligatorios
  if (nombre === '' || apellido === '' || materia === '' || isNaN(nota1) || isNaN(nota2) || isNaN(nota3)) {
    mostrarMensajeError('Ingrese todos los campos y notas válidas');
    return;
  }

  // Validar notas entre 1 y 10
  if (isNaN(nota1) || nota1 < 1 || nota1 > 10 ||
    isNaN(nota2) || nota2 < 1 || nota2 > 10 ||
    isNaN(nota3) || nota3 < 1 || nota3 > 10) {
    mostrarMensajeError('Ingrese notas válidas entre 1 y 10');
    return;
  }

  // Crear objeto Estudiante
  const estudiante = new Estudiante(nombre, apellido, materia);
  estudiante.agregarNota(nota1);
  estudiante.agregarNota(nota2);
  estudiante.agregarNota(nota3);

  // Agregar estudiante al array estudiantes
  estudiantes.push(estudiante);

  // Mostrar mensaje de éxito utilizando Sweet Alerts
  const mensaje = `El estudiante ${nombre} ${apellido} ha sido agregado`;
  mostrarMensajeExito(mensaje);

  // Limpiar los campos del formulario
  formulario.reset();

  // Actualizar los datos de los estudiantes en el localStorage
  guardarEstudiantesEnLocalStorage();
});

// Función para mostrar un mensaje de éxito con Sweet Alerts
function mostrarMensajeExito(mensaje) {
  Swal.fire('Éxito', mensaje, 'success');
}

// Función para mostrar un mensaje de error con Sweet Alerts
function mostrarMensajeError(mensaje) {
  Swal.fire('Error', mensaje, 'error');
}

// Función para mostrar un mensaje de información con Sweet Alerts
function mostrarMensajeInformacion(mensaje) {
  Swal.fire('Información', mensaje, 'info');
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

function registrarCalificaciones() {
  if (estudiantes.length === 0) {
    Swal.fire('Error', 'No hay estudiantes agregados', 'error');
  } else {
    const materiaInput = document.createElement('input');
    materiaInput.type = 'text';
    materiaInput.placeholder = 'Ingrese la materia';

    Swal.fire({
      title: 'Registrar Calificaciones',
      html: materiaInput.outerHTML,
      showCancelButton: true,
      confirmButtonText: 'Agregar Nota',
      showLoaderOnConfirm: true,
      preConfirm: (result) => {
        const materia = result.trim();
        const estudiante = estudiantes.find((e) => e.materia.toLowerCase() === materia.toLowerCase());

        if (!estudiante) {
          return Swal.fire('Error', `No hay estudiantes agregados en ${materia}`, 'error');
        } else {
          const nombreInput = document.createElement('input');
          nombreInput.type = 'text';
          nombreInput.placeholder = 'Ingrese el nombre del estudiante';

          const apellidoInput = document.createElement('input');
          apellidoInput.type = 'text';
          apellidoInput.placeholder = 'Ingrese el apellido del estudiante';

          const notaInput = document.createElement('input');
          notaInput.type = 'number';
          notaInput.min = 1;
          notaInput.max = 10;
          notaInput.placeholder = 'Ingrese una nota';

          Swal.fire({
            title: 'Registrar Calificaciones',
            html: `
              ${nombreInput.outerHTML}
              ${apellidoInput.outerHTML}
              ${notaInput.outerHTML}
            `,
            showCancelButton: true,
            confirmButtonText: 'Confirmar',
            showLoaderOnConfirm: true,
            preConfirm: () => {
              const nombre = nombreInput.value.trim();
              const apellido = apellidoInput.value.trim();
              const nota = parseFloat(notaInput.value);

              if (nombre === '' || apellido === '' || isNaN(nota) || nota < 1 || nota > 10) {
                Swal.fire('Error', 'Ingrese un nombre, apellido y una nota válida entre 1 y 10', 'error');
              } else {
                // Buscar el índice del estudiante en el array
                const index = estudiantes.indexOf(estudiante);

                // Actualizar los datos del estudiante
                estudiantes[index].nombre = nombre;
                estudiantes[index].apellido = apellido;
                estudiantes[index].agregarNota(nota);

                const mensaje = `Las notas para ${estudiantes[index].nombre} ${estudiantes[index].apellido} en la materia de ${result} son: ${estudiantes[index].notas.join(', ')}`;
                Swal.fire('Éxito', mensaje, 'success');

                // Actualizar los datos de los estudiantes en el localStorage
                guardarEstudiantesEnLocalStorage();
              }
            }
          });
        }
      }
    });
  }
}

// Obtener datos de estudiantes desde el localStorage
function obtenerEstudiantesDesdeLocalStorage() {
  const estudiantesJSON = localStorage.getItem('estudiantes');
  if (estudiantesJSON) {
    estudiantes = JSON.parse(estudiantesJSON);
  }
}

// Guardar datos de estudiantes en el localStorage
function guardarEstudiantesEnLocalStorage() {
  localStorage.setItem('estudiantes', JSON.stringify(estudiantes));
}

// Añadir evento click al botón para mostrar los estudiantes
const mostrarEstudiantesBtn = document.getElementById('mostrarEstudiantesBtn');
mostrarEstudiantesBtn.addEventListener('click', function () {
  mostrarEstudiantes();

  const promediosElemento = document.createElement('div');
  promediosElemento.innerHTML = `
    <h3>Promedio de Notas</h3>
      ${estudiantes
      .map(
        (estudiante) =>
        `<div>
        <h3>${estudiante.nombre} ${estudiante.apellido}</h3>
        <p>Materia: ${estudiante.materia}</p>
        <p>Notas: ${estudiante.notas.join(', ')}</p>
        <p>Promedio: ${calcularPromedio(estudiante.notas)}</p>
        </div>`
      )
    }
  `;
  Swal.fire({
    html: promediosElemento.innerHTML,
    icon: 'info',
    confirmButtonText: 'Cerrar'
  });
});

// Botón de borrar estudiantes
const borrarEstudiantesBtn = document.getElementById('borrarEstudiantesBtn');

// Añadir evento click al botón de borrar estudiantes
borrarEstudiantesBtn.addEventListener('click', function () {
  Swal.fire({
    title: 'Borrar Estudiantes',
    text: '¿Estás seguro de que deseas borrar los estudiantes?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, borrar',
    cancelButtonText: 'Cancelar',
    showLoaderOnConfirm: true,
    preConfirm: () => {
      // Vaciar el array de estudiantes
      estudiantes = [];
      // Eliminar los datos almacenados de estudiantes
      localStorage.removeItem('estudiantes');
      return true;
    }
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire('Éxito', 'Estudiantes borrados exitosamente', 'success');
    }
  });
});


window.addEventListener('DOMContentLoaded', function () {
  obtenerEstudiantesDesdeLocalStorage();
  guardarEstudiantesEnLocalStorage();
});

function mostrarEstudiantes() {
  let estudiantesHTML = '';
  // Generar el HTML para cada estudiante
  estudiantes.forEach((estudiante) => {
    const promedio = calcularPromedio(estudiante.notas);

    estudiantesHTML += `
      <div>
        <h3>${estudiante.nombre} ${estudiante.apellido}</h3>
        <p>Materia: ${estudiante.materia}</p>
        <p>Notas: ${estudiante.notas.join(', ')}</p>
        <p>Promedio: ${promedio}</p>
      </div>
    `;
  });

  // Mostrar los estudiantes utilizando Sweet Alerts
  Swal.fire({
    html: estudiantesHTML,
    icon: 'info',
    confirmButtonText: 'Cerrar'
  });
}

// Añadir evento click al botón "Agregar Nota"
const agregarNotaBtn = document.getElementById('agregarNotaBtn');
agregarNotaBtn.addEventListener('click', agregarNota);

function agregarNota() {
  Swal.fire({
    title: 'Agregar Nota',
    html: `
      <input id="materiaInput" class="swal2-input" placeholder="Materia" required>
      <input id="nombreInput" class="swal2-input" placeholder="Nombre" required>
      <input id="apellidoInput" class="swal2-input" placeholder="Apellido" required>
      <input id="notaInput" class="swal2-input" type="number" min="1" max="10" step="0.01" placeholder="Nota" required>
    `,
    focusConfirm: false,
    preConfirm: () => {
      const materia = document.getElementById('materiaInput').value.trim();
      const nombre = document.getElementById('nombreInput').value.trim();
      const apellido = document.getElementById('apellidoInput').value.trim();
      const nota = parseFloat(document.getElementById('notaInput').value);

      if (materia === '' || nombre === '' || apellido === '' || isNaN(nota) || nota < 1 || nota > 10) {
        Swal.showValidationMessage('Ingrese valores válidos');
        return false;
      }

      const estudiante = estudiantes.find((estudiante) =>
        estudiante.materia.toLowerCase() === materia.toLowerCase() &&
        estudiante.nombre.toLowerCase() === nombre.toLowerCase() &&
        estudiante.apellido.toLowerCase() === apellido.toLowerCase()
      );

      if (!estudiante) {
        Swal.showValidationMessage('No se encontró al estudiante');
        return false;
      }

      estudiante.agregarNota(nota);
      guardarEstudiantesEnLocalStorage();
      return true;
    }
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire('Éxito', 'La nota ha sido agregada exitosamente', 'success');
    }
  });
}
