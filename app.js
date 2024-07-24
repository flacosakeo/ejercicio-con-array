let personas = ["eduardo lazarte","ramiro Lazarte","ivan lazarte","patricia almaraz"];
//let personas = [];

function mostrarPersonas(){
    event.preventDefault();
    let lista = document.getElementById('personas');
    lista.innerHTML = '';
    personas.forEach((persona, index) => {
        console.log(persona, index);
        let li = document.createElement('li');
        let btnEliminar = document.createElement('button');
        let btnEditar = document.createElement('button');
        let divGral = document.createElement('div');
        let divNombres = document.createElement('div');
        let divBotones = document.createElement('div');
        divNombres.classList.add('listaNombres');
        divBotones.classList.add('listaBotones');
        divGral.classList.add('listaGral')
        //btnEliminar.setAttribute = ('data-index', index);

        btnEliminar.type = 'button';
        btnEliminar.classList.add('btn','btn-danger','m-2');
        btnEliminar.id = 'delete';
        btnEliminar.innerHTML = 'Eliminar';
        //btnEditar.setAttribute = ('data-index', index);
        btnEditar.type = 'button';
        btnEditar.classList.add('btn','btn-primary','m-2');
        btnEditar.id = 'edit';
        btnEditar.innerHTML = 'Editar';
        li.innerHTML = persona;
        
        divNombres.appendChild(li);
        divBotones.appendChild(btnEliminar);
        divBotones.appendChild(btnEditar);
        divGral.appendChild(divNombres);
        divGral.appendChild(divBotones);
        lista.appendChild(divGral)

        btnEliminar.addEventListener('click', ()=>{
            let result = confirm("Confirmación: ¿Desea eliminar este Usuario?")
            if (result){
                eliminarPersona(index);
            }
        });
        btnEditar.addEventListener('click', ()=>{
            cancelar();
            mostrarFormEditar(index);
        });
    });
};

function eliminarPersona(index){
    personas.splice(index, 1);
    mostrarPersonas();
}

function agregarPersona(){
    event.preventDefault();
    let nuevaPersona = document.getElementById('nuevaPersona').value;
    if (nuevaPersona) {
        personas.push(nuevaPersona);
        document.getElementById('nuevaPersona').value = '';
        document.getElementById('nuevaPersona').focus();
        mostrarPersonas();
    }else{
        alert('Aviso: Campo vacio.');
    }
}

function mostrarFormEditar(index){
    event.preventDefault();
    personaParaModificar = index;
    document.getElementById('form-agregar').toggleAttribute('hidden')
    document.getElementById('form-editar').removeAttribute('hidden')
    //document.getElementById('form-agregar').style.display = 'none';
    //document.getElementById('form-editar').style.display = 'block';
    personaModificada = document.getElementById('editarPersona').value = personas[personaParaModificar];
}



function modificarPersona(){
    event.preventDefault();
    let personaModificada = document.getElementById('editarPersona').value;
    if (personaModificada && personaParaModificar !== null){  
        personas[personaParaModificar] = personaModificada;
        cancelar();
        mostrarPersonas();
    }else{
        alert('Nada para Modificar');
    }
}

function cancelar(){
    event.preventDefault();
    document.getElementById('form-editar').toggleAttribute('hidden')
    document.getElementById('form-agregar').removeAttribute('hidden')
    //document.getElementById('form-agregar').style.display = 'block';
    //document.getElementById('form-editar').style.display = 'none';
}

document.getElementById('form-agregar').addEventListener('submit', agregarPersona);
document.getElementById('form-editar').addEventListener('submit', modificarPersona);