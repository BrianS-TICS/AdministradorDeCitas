/*
    Clases
*/
class Paciente{
    constructor(mascota,propietario,telefono,fecha,hora, sintoma){
        this.mascota = mascota;
        this.propietario = propietario;
        this.telefono = telefono;
        this.fecha = fecha;
        this.hora = hora;
        this.sintoma = sintoma;
        this.id = Date.now();
    };

    // Metodos

}

class Cita{
    constructor(){
        this.citas = [];
    }

    agregaPaciente(objPaciente){
        this.citas = [...this.citas, objPaciente];
    }

    limpiaPacientes(){

    }
}

class UI{
    muestraPacientes(objCitas){

        objCitas.citas.forEach(paciente => {
            const {mascota,propietario,telefono,fecha,hora, sintoma} = paciente;

            console.log(mascota);
            const li = document.createElement('li');
            li.classList.add('list-group-item');

            const pMascota = document.createElement('p');
            pMascota.textContent = mascota;

            li.appendChild(pMascota);
            ulCitas.appendChild(li);

        });

    }
}

/*
    Instancias
*/

let objPaciente;
let objCitas = new Cita();
let ui = new UI();

/*
    Variables de DOM Globales
*/
const ulCitas = document.querySelector('#citas');
const frmNuevaCita = document.querySelector('#nueva-cita');
const btnSubmit = document.querySelector('button[type=submit]');

/*
    Funciones
*/

// Ejecucion de eventos
eventListener();
function eventListener(){

    // frmNuevaCita.addEventListener('submit');

    // Crea paciente
    btnSubmit.addEventListener('click',crearParciente);
}


function crearParciente(e) {

    // Eliminacion de reload
    e.preventDefault();

    //Elementos del formulario
    const inpMascota = document.querySelector("#mascota").textContent;
    const inpPropietario = document.querySelector("#propietario").textContent;
    const inpTelefono = document.querySelector('#telefono').textContent;
    const inpFecha = document.querySelector('#fecha').textContent;
    const inpHora = document.querySelector('#hora').textContent;
    const inpSintoma = document.querySelector('#sintomas').textContent;


    // Creacion de paciente
    objPaciente = new Paciente(inpMascota,inpPropietario,inpTelefono,inpFecha,inpHora,inpSintoma);

    console.log(objPaciente);
    // Adiccion de paciente a objeto arreglo citas
    objCitas.agregaPaciente(objPaciente);

    // Lee el paciente dentro de citas
    ui.muestraPacientes(objCitas);
}