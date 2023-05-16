function Estudiante(nombre, apellido, materia) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.materia = materia;
    this.notas = [];
  }
  
  // Array que va a contener todos los estudiantes
  const estudiantes = [];
  
  // Función para agregar un nuevo estudiante al array
  function agregarEstudiante() {
    let nombre = prompt("Ingrese el nombre del estudiante");
    let apellido = prompt("Ingrese el apellido del estudiante");
    let materia = prompt("Ingrese la materia del estudiante");
  
    let estudiante = new Estudiante(nombre, apellido, materia);
  
    estudiantes.push(estudiante);
  
    alert(`El estudiante ${nombre} ${apellido} ha sido agregado`);
  }
  
  // Función para registrar las calificaciones de un estudiante
  function registrarCalificaciones() {
    if (estudiantes.length === 0) {
      alert("No hay estudiantes agregados");
    } else {
      let materia = prompt("Ingrese la materia");
      let estudiante = estudiantes.find((e) => e.materia === materia);
  
      if (!estudiante) {
        alert(`No hay estudiantes agregados en ${materia}`);
      } else {
        let continuar = true;
  
        while (continuar) {
          let nota = prompt(`Ingrese la nota para ${estudiante.nombre} ${estudiante.apellido}`);
  
          if (isNaN(nota) || nota < 1 || nota > 10) {
            alert("Nota inválida. Debe ser un número entre 1 y 10");
          } else {
            estudiante.notas.push(nota);
  
            let confirmar = confirm("¿Desea agregar otra nota?");
            continuar = confirmar;
          }
        }
  
        alert(`Las notas para ${estudiante.nombre} ${estudiante.apellido} en la materia de ${materia} son: ${estudiante.notas.join(", ")}`);
      }
    }
  }
  
  // Función para mostrar todos los estudiantes o los estudiantes de una materia específica
  function mostrarEstudiantes() {
    let opcion = prompt("Ingrese 1 para mostrar todos los estudiantes o 2 para mostrar los estudiantes de una materia específica");
  
    if (opcion === "1") {
      if (estudiantes.length === 0) {
        alert("No hay estudiantes agregados");
      } else {
        alert(
          estudiantes
            .map(
              (estudiante) =>
                `${estudiante.nombre} ${estudiante.apellido} - ${estudiante.materia}: ${estudiante.notas.join(", ")}`
            )
            .join("\n")
        );
      }
    } else if (opcion === "2") {
      let materia = prompt("Ingrese el nombre de la materia");
  
      let estudiantesFiltrados = estudiantes.filter((estudiante) => estudiante.materia === materia);
  
      if (estudiantesFiltrados.length === 0) {
        alert(`No hay estudiantes agregados en ${materia}`);
      } else {
        alert(
          `Estudiantes de ${materia}:\n\n${estudiantesFiltrados
            .map((estudiante) => `${estudiante.nombre} ${estudiante.apellido}: ${estudiante.notas.join(", ")}`)
            .join("\n")}`
        );
      }
    } else {
      alert("Opción inválida");
    }
  }
  
  agregarEstudiante();
  registrarCalificaciones();
  mostrarEstudiantes();