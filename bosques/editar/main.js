const params = new URLSearchParams(window.location.search);
console.log('Editando al bosque ' + params.get('id_bosque'));
let formEditar = document.querySelector('#formEditar');
let especiesDeEsteBosque = [];

function llenarForm() {
    let request = new XMLHttpRequest();
    request.open('GET', `https://plataforma2020.herokuapp.com/api/bosques/${params.get('id_bosque')}`);
    request.setRequestHeader('x-user-token', localStorage.tokenUser);
    request.send();

    request.onload = () => {
        if (request.status == 200) {
            let bosque = JSON.parse(request.responseText);
            console.log(bosque);
            formEditar.nombre.value = bosque.nombre
            formEditar.superficie.value = bosque.superficie;
            formEditar.flora.value = bosque.flora;
            especiesDeEsteBosque = bosque.especies;
            llenarListaEspecies();
        } else if (request.status == 500) {
            alert('Error ' + request.status + ': ' + request.statusText); //error servidor
        } else if (request.status == 401) {
            window.location.href = "/login";
        }
    };
}

function llenarListaEspecies() {
    let request = new XMLHttpRequest();
    request.open('GET', 'https://plataforma2020.herokuapp.com/api/especies');
    request.setRequestHeader('x-user-token', localStorage.tokenUser);
    request.send();
    request.onload = () => {
        if (request.status == 200) {
            let especies = JSON.parse(request.responseText);
            // console.log("todas las especies\n", especies);
            mostrarEspecies(especies);
        } else if (request.status == 500) {
            alert('Error ' + request.status + ': ' + request.statusText); //error servidor
        }
    };
}

function mostrarEspecies(especies) {
    let listaEspecies = document.getElementById('listaEspecies');
    let especieHTML;
    especies.forEach(especie => {
        console.log(especie.nombre_comun);

        if (especiesDeEsteBosque.includes(especie.nombre_comun)) {
            console.log('presente');
            especieHTML = `<div class="form-check">
        <input class="form-check-input" type="checkbox" value="${especie.nombre_comun}"  name="especies" id="especies" checked>
        <label class="form-check-label" for="">${especie.nombre_comun}</label></div>`
        } else {
            console.log('no presente');
            especieHTML = `<div class="form-check">
            <input class="form-check-input" type="checkbox" value="${especie.nombre_comun}" name="especies" id="especies">
            <label class="form-check-label" for="">${especie.nombre_comun}</label></div>`
        }

        listaEspecies.insertAdjacentHTML('beforeend', especieHTML);
    });
}

llenarForm();

formEditar.addEventListener("submit", function (e) {
    e.preventDefault(); // para que no te recargue la página cuando sometes el formulario

    //Este handler debe atrapar todos los valores del formulario en un objeto que cumpla con lo que pide el back-end
    let especiesChecked = []
    let checkboxes = document.querySelectorAll('input[type=checkbox]:checked');

    for (let i = 0; i < checkboxes.length; i++) {
        especiesChecked.push(checkboxes[i].value)
    }
    console.log("especies checked", especiesChecked);

    let nuevoBosque = {
        "nombre": formEditar.nombre.value,
        "superficie": formEditar.superficie.value,
        "especies": especiesChecked,
        "flora": formEditar.flora.value
    };
    //Manda la información al back-end  
    let request = new XMLHttpRequest();
    request.open('PUT', `https://plataforma2020.herokuapp.com/api/bosques/${params.get('id_bosque')}`);
    request.setRequestHeader('x-user-token', localStorage.tokenUser);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send([JSON.stringify(nuevoBosque)]);

    request.onload = () => {
        if (request.status == 200) {
            alert('Bosque ha sido actualizado exitosamente');
            window.location.href = "../consultar/";
        } else if (request.status == 400) {
            alert('Error ' + request.status + ': ' + request.responseText); //error de usuario
        } else if (request.status == 500) {
            alert('Error ' + request.status + ': ' + request.statusText); //error servidor
        }
    };
});