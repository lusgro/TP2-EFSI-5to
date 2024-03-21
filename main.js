class Tarea {
    constructor(nombre) {
        this.nombre = nombre;
        this.fueCompletada = false;
        this.fechaCreacion = new Date(Date.now());
        this.fechaCompletada = undefined;
        this.id = undefined;
      }
}

const tareas = []
const textBox = document.getElementById('textBox');
const btnAgregar = document.getElementById('btnAgregar');
const btnRapidez = document.getElementById('btnRapidez');
const listaTareas = document.getElementById('listaTareas');

document.addEventListener('DOMContentLoaded', () => {
    btnAgregar.addEventListener('click', agregarTarea);
    btnRapidez.addEventListener('click', calcularRapidez);
});

function agregarTarea() {
    const nuevaTarea = new Tarea(textBox.value.trim());
    const nuevaTareaHTML = document.createElement('li');
    nuevaTarea.id = nuevaTareaHTML;
    nuevaTareaHTML.textContent = nuevaTarea.nombre;
    listaTareas.appendChild(nuevaTareaHTML);
    const btnBorrar = document.createElement('button')
    btnBorrar.textContent = 'Borrar'
    btnBorrar.addEventListener('click', borrarTarea)
    listaTareas.appendChild(btnBorrar)
    tareas.push(nuevaTarea);
    reiniciarLista();
}

function reiniciarLista() {
    listaTareas.innerHTML= '';
    for (var tarea of tareas) {
        const nuevaTareaHTML = document.createElement('li');
        tarea.id = nuevaTareaHTML;
        console.log(tarea)
        if (tarea.fueCompletada) {
            nuevaTareaHTML.classList.add('completada');
        }
        nuevaTareaHTML.textContent = tarea.nombre;
        listaTareas.appendChild(nuevaTareaHTML);
        nuevaTareaHTML.addEventListener('click', completarTarea)
    }
}

function completarTarea(event) {
    const tarea = event.target
    tarea.classList.toggle('completada')
    let indexTarea = tareas.findIndex(tarea => tarea.id === event.target)

    if (tareas[indexTarea].fueCompletada) {
        tareas[indexTarea].fueCompletada = false;
        tareas[indexTarea].fechaCompletada = undefined;
        
    }
    else {
        tareas[indexTarea].fueCompletada = true;
        tareas[indexTarea].fechaCompletada = new Date(Date.now());
    }
}

function calcularRapidez() {
    let tareasCompletadas = tareas.filter(tarea => tarea.fueCompletada);
    let diferencias = [];
    for (tarea of tareasCompletadas) {
        diferencias.push(tarea.fechaCompletada - tarea.fechaCreacion);
    }
    let valorMinimo = Math.min(...diferencias);
    let index = tareas.findIndex(tarea => valorMinimo === tarea.fechaCompletada - tarea.fechaCreacion)
    alert(`La tarea más rapida en completarse fue ${tareas[index].nombre}`)
}

function borrarTarea() {
    
}