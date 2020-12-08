function llenarListaEspecies() {
    let request = new XMLHttpRequest();

    request.open('GET', 'https://plataforma2020.herokuapp.com/api/especies');
    request.setRequestHeader('x-user-token', localStorage.tokenUser);
    request.send();

    request.onload = () => {
        if (request.status == 200) {
            let especies = JSON.parse(request.responseText);
            mostrarEspecies(especies);
        } else if (request.status == 500) {
            alert('Error ' + request.status + ': ' + request.statusText); //error servidor
        } else if (request.status == 401) {
            window.location.href = "/login";
        }
    };
}

function mostrarEspecies(especies) {
    let listaEspecies = document.getElementById('listaEspecies');
    especies.forEach(especie => {
        let especieHTML = `<div class="form-check">
        <input class="form-check-input" type="checkbox" value="${especie.nombre_comun}" name="especies" id="especies">
        <label class="form-check-label" for="">${especie.nombre_comun}</label>
    </div>`

        listaEspecies.insertAdjacentHTML('beforeend', especieHTML);
    });
}

llenarListaEspecies();

let formAgregar = document.querySelector('#formAgregar');

formAgregar.addEventListener("submit", function (e) {
    e.preventDefault(); // para que no te recargue la página cuando sometes el formulario

    //Este handler debe atrapar todos los valores del formulario en un objeto que cumpla con lo que pide el back-end
    let especiesChecked = []
    let checkboxes = document.querySelectorAll('input[type=checkbox]:checked');

    for (let i = 0; i < checkboxes.length; i++) {
        especiesChecked.push(checkboxes[i].value)
    }
    console.log("especies checked", especiesChecked);

    let nuevoBosque = {
        "nombre": formAgregar.nombre.value,
        "superficie": formAgregar.superficie.value,
        "especies": especiesChecked,
        "flora": formAgregar.flora.value
    };
    //Manda la información al back-end  
    let request = new XMLHttpRequest();
    request.open('POST', 'https://plataforma2020.herokuapp.com/api/bosques');
    request.setRequestHeader('x-user-token', localStorage.tokenUser);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send([JSON.stringify(nuevoBosque)]);

    request.onload = () => {
        if (request.status == 200) {
            alert('Bosque ha sido registrado exitosamente');
            window.location.href = "../consultar/index.html";
        } else if (request.status == 400) {
            alert('Error ' + request.status + ': ' + request.responseText); //error de usuario
        } else if (request.status == 500) {
            alert('Error ' + request.status + ': ' + request.statusText); //error servidor
        }
    };
});