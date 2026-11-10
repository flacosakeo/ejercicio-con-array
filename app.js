// Estado de la aplicación
let personas = ["Eduardo Lazarte", "Ramiro Lazarte", "Iván Lazarte", "Patricia Almaraz"];
let personaParaModificar = null;

// Elementos del DOM
const formAgregar = document.getElementById('form-agregar');
const formEditar = document.getElementById('form-editar');
const cardAgregar = document.getElementById('card-agregar');
const cardEditar = document.getElementById('card-editar');
const inputNuevaPersona = document.getElementById('nuevaPersona');
const inputEditarPersona = document.getElementById('editarPersona');
const btnCancelar = document.getElementById('btnCancelar');
const listaPersonas = document.getElementById('personas');
const contadorPersonas = document.getElementById('contador-personas');

/**
 * Renderiza la lista de personas en el DOM.
 */
function mostrarPersonas() {
    listaPersonas.innerHTML = '';
    contadorPersonas.textContent = personas.length;

    if (personas.length === 0) {
        const itemVacio = document.createElement('li');
        itemVacio.className = 'text-center text-muted py-4 fst-italic';
        itemVacio.innerHTML = '<i class="bi bi-inbox fs-2 d-block mb-2"></i>No hay personas en la lista.';
        listaPersonas.appendChild(itemVacio);
        return;
    }

    personas.forEach((persona, index) => {
        const item = document.createElement('li');
        item.className = 'persona-item d-flex flex-column flex-sm-row justify-content-between align-items-sm-center p-3 rounded-3 border';

        // Nombre de la persona (seguro contra XSS)
        const divNombre = document.createElement('div');
        divNombre.className = 'persona-nombre fw-semibold text-break mb-2 mb-sm-0';
        divNombre.textContent = persona;

        // Botones de acción
        const divBotones = document.createElement('div');
        divBotones.className = 'd-flex gap-2 justify-content-end';

        // Botón Editar
        const btnEditar = document.createElement('button');
        btnEditar.type = 'button';
        btnEditar.className = 'btn btn-outline-primary btn-sm d-flex align-items-center gap-1';
        btnEditar.innerHTML = '<i class="bi bi-pencil"></i> <span>Editar</span>';
        btnEditar.addEventListener('click', () => mostrarFormEditar(index));

        // Botón Eliminar
        const btnEliminar = document.createElement('button');
        btnEliminar.type = 'button';
        btnEliminar.className = 'btn btn-outline-danger btn-sm d-flex align-items-center gap-1';
        btnEliminar.innerHTML = '<i class="bi bi-trash3"></i> <span>Eliminar</span>';
        btnEliminar.addEventListener('click', () => {
            if (confirm(`¿Estás seguro de que deseas eliminar a "${persona}"?`)) {
                eliminarPersona(index);
            }
        });

        divBotones.appendChild(btnEditar);
        divBotones.appendChild(btnEliminar);

        item.appendChild(divNombre);
        item.appendChild(divBotones);
        listaPersonas.appendChild(item);
    });
}

/**
 * Agrega una nueva persona a la lista.
 */
function agregarPersona(e) {
    e.preventDefault();
    const nombre = inputNuevaPersona.value.trim();

    if (nombre.length > 0) {
        personas.push(nombre);
        inputNuevaPersona.value = '';
        inputNuevaPersona.focus();
        mostrarPersonas();
    } else {
        alert('Por favor ingresa un nombre válido.');
        inputNuevaPersona.focus();
    }
}

/**
 * Elimina una persona por su índice.
 */
function eliminarPersona(index) {
    // Si estábamos editando a la persona que se acaba de eliminar, cancelar edición
    if (personaParaModificar === index) {
        cancelarEdicion();
    } else if (personaParaModificar !== null && personaParaModificar > index) {
        // Ajustar el índice si se eliminó un elemento previo
        personaParaModificar--;
    }

    personas.splice(index, 1);
    mostrarPersonas();
}

/**
 * Muestra el formulario de edición con los datos correspondientes.
 */
function mostrarFormEditar(index) {
    personaParaModificar = index;
    inputEditarPersona.value = personas[index];

    cardAgregar.hidden = true;
    cardEditar.hidden = false;

    inputEditarPersona.focus();
    inputEditarPersona.select();
}

/**
 * Guarda los cambios realizados en una persona.
 */
function modificarPersona(e) {
    e.preventDefault();
    const nombreModificado = inputEditarPersona.value.trim();

    if (nombreModificado.length > 0 && personaParaModificar !== null) {
        personas[personaParaModificar] = nombreModificado;
        cancelarEdicion();
        mostrarPersonas();
    } else {
        alert('Por favor, ingresa un nombre válido para guardar.');
        inputEditarPersona.focus();
    }
}

/**
 * Cancela el proceso de edición y restaura la vista inicial.
 */
function cancelarEdicion() {
    personaParaModificar = null;
    inputEditarPersona.value = '';
    cardEditar.hidden = true;
    cardAgregar.hidden = false;
}

// Event Listeners
formAgregar.addEventListener('submit', agregarPersona);
formEditar.addEventListener('submit', modificarPersona);
btnCancelar.addEventListener('click', cancelarEdicion);

// Inicialización de la vista al cargar el DOM
document.addEventListener('DOMContentLoaded', mostrarPersonas);
