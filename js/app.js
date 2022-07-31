//Elementos del formulario
const mascotaInput = document.querySelector("#mascota");
const propietarioInput = document.querySelector("#propietario");
const telefonoInput = document.querySelector("#telefono");
const fechaInput = document.querySelector("#fecha");
const horaInput = document.querySelector("#hora");
const sintomaTxa = document.querySelector("#sintomas");

// Elementos UI
const contenedorCitas = document.querySelector("#citas");
const formulario = document.querySelector("#nueva-cita");

let editando;

class Citas {
  constructor() {
    this.citas = [];
  }

  agregarCita(cita) {
    this.citas = [...this.citas, cita];
  }

  eliminarCita(id){
    this.citas = this.citas.filter(cita => cita.id !== id);
  }

  editarCita(cita){
    // Si la el id de cita es igual a un id de el arreglo cita entonces toma el valor de cita si no el mismo valor de item
    this.citas = this.citas.map( item => item.id === cita.id ? cita : item)
  }
}

class UI {
  mostrarAviso(mensaje, tipo) {
    const mensajeDiv = document.createElement("div");
    mensajeDiv.classList.add("text-center", "alert", "d-block", "col-12");
    mensajeDiv.textContent = mensaje;

    if (tipo === "error") {
      mensajeDiv.classList.add("alert-danger");
    } else {
      mensajeDiv.classList.add("alert-success");
    }

    // Agregar al DOM
    document
      .querySelector("#contenido")
      .insertBefore(mensajeDiv, document.querySelector(".agregar-cita"));

    setTimeout(() => {
      mensajeDiv.remove();
    }, 3000);
  }

  mostrarCitas({ citas }) {

    this.limpiarHTML();

    citas.forEach((cita) => {
      const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;
      const divCita = document.createElement("div");
      divCita.classList.add("cita", "p-3");
      divCita.dataset.id = id;

      // Scripting
        const mascotaParrafo = document.createElement('h2');
        mascotaParrafo.classList.add('card-title', 'font-weight-bolder');
        mascotaParrafo.textContent = mascota;
        
        const propietarioParrafo = document.createElement('p');
        propietarioParrafo.innerHTML = ` <span class="font-weight-bolder">Propietario: </span> ${propietario} `;
        
        const telefonoParrafo = document.createElement('p');
        telefonoParrafo.innerHTML = ` <span class="font-weight-bolder">Telefono: </span> ${telefono} `;
        
        const fechaParrafo = document.createElement('p');
        fechaParrafo.innerHTML = ` <span class="font-weight-bolder">Fecha: </span> ${fecha} `;
        
        const horaParrafo = document.createElement('p');
        horaParrafo.innerHTML = ` <span class="font-weight-bolder">Hora: </span> ${hora} `;
        
        const sintomaParrafo = document.createElement('p');
        sintomaParrafo.innerHTML = ` <span class="font-weight-bolder">Sintomas: </span> ${sintomas} `;

        // Boton para eliminar cita
        const btnEliminar = document.createElement('button');
        btnEliminar.classList.add('btn', 'btn-danger', 'mr-2');
        btnEliminar.innerHTML = `Eliminar <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>`;

        // Boton para editar cita
        const btnEditar = document.createElement('button');
        btnEditar.classList.add('btn', 'btn-warning');
        btnEditar.innerHTML = `Editar <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>`;

        btnEliminar.onclick = () => eliminarCita(id);
        btnEditar.onclick = () => cargarEdicion(cita);
        
        // Agregar al DOM
        divCita.appendChild(mascotaParrafo);
        divCita.appendChild(propietarioParrafo);
        divCita.appendChild(telefonoParrafo);
        divCita.appendChild(fechaParrafo);
        divCita.appendChild(horaParrafo);
        divCita.appendChild(sintomaParrafo);
        divCita.appendChild(btnEliminar);
        divCita.appendChild(btnEditar);

        contenedorCitas.appendChild(divCita);
    });
  }

  limpiarHTML(){
    while (contenedorCitas.firstChild) {
      contenedorCitas.removeChild( contenedorCitas.firstChild );
    }
  }
}

const ui = new UI();
const administraCitas = new Citas();

eventListeners();
function eventListeners() {
  mascotaInput.addEventListener("change", datosCita);
  propietarioInput.addEventListener("change", datosCita);
  telefonoInput.addEventListener("change", datosCita);
  fechaInput.addEventListener("change", datosCita);
  horaInput.addEventListener("change", datosCita);
  sintomaTxa.addEventListener("change", datosCita);

  formulario.addEventListener("submit", nuevaCita);
}

const citasObj = {
  mascota: "",
  propietario: "",
  telefono: "",
  fecha: "",
  hora: "",
  sintomas: "",
};

// Agrega datos a el objeto de cita
function datosCita(e) {
  // El nombre del atributo de html coincide con la clave del objeto y escribe el valor del objeto
  citasObj[e.target.name] = e.target.value;
}

// Valida y agrega una nueva cita
function nuevaCita(e) {
  e.preventDefault();

  // Extraer la informacion del objeto de cita
  const { mascota, propietario, telefono, fecha, hora, sintomas } = citasObj;

  // Validaciones
  if (
    mascota === "" ||
    propietario === "" ||
    telefono === "" ||
    fecha === "" ||
    hora === "" ||
    sintomas === ""
  ) {
    ui.mostrarAviso("Todos los campos son obligatorios", "error");

    return;
  }

  if(editando === true){
    // Cambio de texto a texto original "crear cita"
    formulario.querySelector('button[type="submit"]').textContent = `Crear citas`;

    ui.mostrarAviso('Editado correctamente', 'succeed');

    // Se pasa una copia para evitar duplicar valores
    administraCitas.editarCita({...citasObj});

    // Restablece modo edicion
    editando = false;
  }
  else{
    // Generar id unico
    citasObj.id = Date.now();

    // Administrar cita
    administraCitas.agregarCita({...citasObj});

    ui.mostrarAviso('Agregado correctamente', 'succeed');
  }

  // Reiniciar el objeto para validar otra vez
  reiniciarObjeto();

  // Reinicia el formulario
  formulario.reset();

  // Imprimir citas
  ui.mostrarCitas(administraCitas);
}

function reiniciarObjeto() {
  citasObj.mascota = "";
  citasObj.propietario = "";
  citasObj.telefono = "";
  citasObj.fecha = "";
  citasObj.hora = "";
  citasObj.sintomas = "";
}

function eliminarCita(id){
  // Eliminar la cita
  administraCitas.eliminarCita(id);
  // Mostrar mensaje de eliminado
  ui.mostrarAviso('Eliminada correctamente', 'succeed');
  // Refrescar
  ui.mostrarCitas(administraCitas)

}

// Carga datos
function cargarEdicion(cita){
  const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;
  mascotaInput.value = mascota;
  propietarioInput.value = propietario;
  telefonoInput.value = telefono;
  fechaInput.value = fecha;
  horaInput.value = hora;
  sintomaTxa.value =  sintomas;
  id.value = id;

  // Llenar objeto 
  citasObj.mascota = mascota;
  citasObj.propietario = propietario;
  citasObj.telefono = telefono;
  citasObj.fecha = fecha;
  citasObj.hora = hora;
  citasObj.sintomas = sintomas;
  citasObj.id = id;

 formulario.querySelector('button[type="submit"]').textContent = `Guardar cambios`;

 editando = true;

}