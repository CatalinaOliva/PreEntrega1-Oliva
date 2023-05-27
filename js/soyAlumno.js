// Obtener referencia al botón de búsqueda y al contenedor de resultados
const buscarBtn = document.getElementById('buscarBtn');
const resultContainer = document.getElementById('resultContainer');

// Añadir evento click al botón de búsqueda
buscarBtn.addEventListener('click', function (event) {
  event.preventDefault(); // Evitar el envío automático del formulario

  // Obtener los valores ingresados del alumno
  const nombreAlumno = document.getElementById('nombreAlumno').value.trim();
  const apellidoAlumno = document.getElementById('apellidoAlumno').value.trim();
  const materiaAlumno = document.getElementById('materiaAlumno').value.trim();

  // Obtener datos de estudiantes desde el sessionStorage
  const estudiantesJSON = sessionStorage.getItem('estudiantes');
  if (estudiantesJSON) {
    const estudiantes = JSON.parse(estudiantesJSON);

    // Buscar al alumno por su nombre y materia
    const alumno = estudiantes.find((e) => e.nombre.toLowerCase() === nombreAlumno.toLowerCase() &&
      e.apellido.toLowerCase() === apellidoAlumno.toLowerCase() &&
      e.materia.toLowerCase() === materiaAlumno.toLowerCase());

    // Limpiar el contenedor de resultados
    resultContainer.innerHTML = '';

    if (alumno) {
      // Mostrar las notas y promedio del alumno encontrado
      const notasElemento = document.createElement('div');
      notasElemento.innerHTML = `
        <h3>Notas del Alumno</h3>
        <p>Apellido: ${alumno.apellido}</p>
        <p>Materia: ${alumno.materia}</p>
        <p>Notas: ${alumno.notas.join(', ')}</p>
        <p>Promedio: ${calcularPromedio(alumno.notas)}</p>
      `;
      resultContainer.appendChild(notasElemento);
    } else {
      // Mostrar un mensaje si el alumno no fue encontrado
      const mensajeElemento = document.createElement('p');
      mensajeElemento.textContent = 'Alumno no encontrado';
      resultContainer.appendChild(mensajeElemento);
    }
  } else {
    // Mostrar un mensaje si no hay datos de estudiantes almacenados
    const mensajeElemento = document.createElement('p');
    mensajeElemento.textContent = 'No hay datos de estudiantes almacenados';
    resultContainer.appendChild(mensajeElemento);
  }
});

// Función para calcular el promedio de un arreglo de notas
function calcularPromedio(notas) {
  const sum = notas.reduce((total, nota) => total + nota, 0);
  const promedio = sum / notas.length;
  return promedio.toFixed(2); // Redondear el promedio a 2 decimales
}
