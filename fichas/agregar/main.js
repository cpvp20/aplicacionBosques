let infoDeUsuario;
let request = new XMLHttpRequest();
request.open('GET', 'https://plataforma2020.herokuapp.com/api/usuarios/loggedIn');
request.setRequestHeader('x-user-token', localStorage.tokenUser);
request.send();
request.onload = () => {
    if (request.status == 200) {
        infoDeUsuario = JSON.parse(request.responseText);
        console.log('infoDeUsuario');
        console.log(infoDeUsuario);
    } else if (request.status == 401) {
        window.location.href = "/login";
    }
}

function llenarListaAnimales() {
    let request = new XMLHttpRequest();
    request.open('GET', 'https://plataforma2020.herokuapp.com/api/animales');
    request.setRequestHeader('x-user-token', localStorage.tokenUser);
    request.send();
    request.onload = () => {
        if (request.status == 200) {
            let animales = JSON.parse(request.responseText);
            mostrarAnimales(animales);
        } else if (request.status == 500) {
            alert('Error ' + request.status + ': ' + request.statusText); //error servidor
        }
    };
}

function mostrarAnimales(animales) {
    let animalesHTML = "";
    animales.forEach(animal => animalesHTML += `<option>${animal.id_animal}</option>`);
    let id_animal = document.querySelector('#id_animal');
    id_animal.insertAdjacentHTML('beforeend', animalesHTML);
}

llenarListaAnimales();

let formAgregar = document.querySelector('#formAgregar');

formAgregar.addEventListener("submit", function (e) {
    e.preventDefault(); // para que no te recargue la página cuando sometes el formulario

    //Este handler debe atrapar todos los valores del formulario en un objeto que cumpla con lo que pide el back-end
    let nuevaFicha = {
        "id_animal": formAgregar.id_animal.value,
        "encargado": infoDeUsuario.correo, //formAgregar.encargado.value,
        "sexo": formAgregar.sexo.value,
        "peso": formAgregar.peso.value, 
        "edad": formAgregar.edad.value,
        "fecha": formAgregar.fecha.value,
        "hora": formAgregar.hora.value,
        "nivel_reaccion": formAgregar.nivel_reaccion.value, 
        "frecuencia_cardiaca": formAgregar.frecuencia_cardiaca.value, 
        "frecuencia_respiratoria": formAgregar.frecuencia_respiratoria.value, 
        "temperatura": formAgregar.temperatura.value, 
        "condicion_corporal": formAgregar.condicion_corporal.value,
        "tiempo_llenado_capilar": formAgregar.tiempo_llenado_capilar.value,
        "pulso": formAgregar.pulso.value,
        "hidratacion": formAgregar.hidratacion.value,
        "examen_fisico": formAgregar.examen_fisico.value, 
        "observaciones": formAgregar.observaciones.value,
        "diagnostico": formAgregar.diagnostico.value
    };
    //Manda la información al back-end  
    let request = new XMLHttpRequest();
    request.open('POST', 'https://plataforma2020.herokuapp.com/api/fichas');
    request.setRequestHeader('x-user-token', localStorage.tokenUser);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send([JSON.stringify(nuevaFicha)]);

    request.onload = () => {
        if (request.status == 200) {
            alert('Ficha ha sido registrada exitosamente');
            window.location.href = "../consultar/index.html";
        } else if (request.status == 500) {
            alert('Error ' + request.status + ': ' + request.statusText); //error servidor
        }
    };
});