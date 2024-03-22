class Tarea {
    constructor(nombre) {
        this.nombre = nombre;
        this.fueCompletada = false;
        this.fechaCreacion = new Date(Date.now());
        this.fechaCompletada = undefined;
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
    tareas.push(nuevaTarea);
    reiniciarLista();
}

function reiniciarLista() {
    textBox.value = '';
    listaTareas.innerHTML= '';
    tareas.forEach((tarea, index) => {
        const nuevaTareaHTML = document.createElement('li');
        if (tarea.fueCompletada) {
            nuevaTareaHTML.classList.add('completada');
        }
        nuevaTareaHTML.textContent = tarea.nombre;
        listaTareas.appendChild(nuevaTareaHTML);
        nuevaTareaHTML.addEventListener('click', () => completarTarea(index))
        const btnBorrar = document.createElement('button')
        btnBorrar.classList.add('btnBorrar')
        btnBorrar.textContent = 'Borrar'
        btnBorrar.addEventListener('click', () => borrarTarea(index))
        listaTareas.appendChild(btnBorrar)
    });
}

function completarTarea(index) {
    const tarea = tareas[index];
    tarea.fueCompletada = !tarea.fueCompletada;
    if (tarea.fueCompletada) {
        tarea.fechaCompletada = new Date(Date.now());
    } else {
        tarea.fechaCompletada = undefined;
    }
    reiniciarLista();
}

function calcularRapidez() {
    let tareasCompletadas = tareas.filter(tarea => tarea.fueCompletada);
    if (tareasCompletadas.length === 0) {
        alert('No hay tareas completadas')
        return;
    }
    let tareaMasRapida = tareasCompletadas.reduce((anterior, actual) => {
        return (anterior.fechaCompletada - anterior.fechaCreacion < actual.fechaCompletada - actual.fechaCreacion) ? anterior : actual
    });
    alert(`La tarea más rapida en completarse fue ${tareaMasRapida.nombre}`)
}

function borrarTarea(index) {
    tareas.splice(index, 1)
    reiniciarLista();
}