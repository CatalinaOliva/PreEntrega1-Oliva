// Obtener referencia al botón de búsqueda
const buscarBtn = document.getElementById('buscarBtn');

// Añadir evento click al botón de búsqueda
buscarBtn.addEventListener('click', function (event) {
  event.preventDefault(); // Evitar el envío automático del formulario

  // Obtener los valores ingresados del alumno
  const nombreAlumno = document.getElementById('nombreAlumno').value.trim();
  const apellidoAlumno = document.getElementById('apellidoAlumno').value.trim();
  const materiaAlumno = document.getElementById('materiaAlumno').value.trim();

  // Obtener datos de estudiantes desde el localStorage
  const estudiantesJSON = localStorage.getItem('estudiantes');
  if (estudiantesJSON) {
    const estudiantes = JSON.parse(estudiantesJSON);

    // Buscar al alumno por su nombre y materia
    const alumno = estudiantes.find((e) => e.nombre.toLowerCase() === nombreAlumno.toLowerCase() &&
      e.apellido.toLowerCase() === apellidoAlumno.toLowerCase() &&
      e.materia.toLowerCase() === materiaAlumno.toLowerCase());

    if (alumno) {
      // Mostrar las notas y promedio del alumno encontrado utilizando Sweet Alerts
      Swal.fire({
        title: 'Notas del Alumno',
        html: `
          <p>Apellido: ${alumno.apellido}</p>
          <p>Materia: ${alumno.materia}</p>
          <p>Notas: ${alumno.notas.join(', ')}</p>
          <p>Promedio: ${calcularPromedio(alumno.notas)}</p>
        `,
        icon: 'info',
        confirmButtonText: 'Cerrar'
      });
    } else {
      // Mostrar un mensaje si el alumno no fue encontrado utilizando Sweet Alerts
      Swal.fire('Error', 'Alumno no encontrado', 'error');
    }
  } else {
    // Mostrar un mensaje si no hay datos de estudiantes almacenados utilizando Sweet Alerts
    Swal.fire('Error', 'No hay datos de estudiantes almacenados', 'error');
  }
});

// Función para calcular el promedio de un arreglo de notas
function calcularPromedio(notas) {
  const sum = notas.reduce((total, nota) => total + nota, 0);
  const promedio = sum / notas.length;
  return promedio.toFixed(2); // Redondear el promedio a 2 decimales
}
