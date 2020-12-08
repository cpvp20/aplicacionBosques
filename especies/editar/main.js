const params = new URLSearchParams(window.location.search);
console.log('Editando a la especie ' + params.get('id_especie'));
let formEditar = document.querySelector('#formEditar');
let estadosDeEstaEspecie = [];
let listaEstados = document.getElementById('listaEstados');

function llenarForm() {
    let request = new XMLHttpRequest();
    request.open('GET', `https://plataforma2020.herokuapp.com/api/especies/${params.get('id_especie')}`);
    request.setRequestHeader('x-user-token', localStorage.tokenUser);
    request.send();

    request.onload = () => {
        if (request.status == 200) {
            let especie = JSON.parse(request.responseText);
            console.log(especie);
            formEditar.nombre_comun.value = especie.nombre_comun;
            formEditar.nombre_cientifico.value = especie.nombre_cientifico;
            formEditar.clase.value = especie.clase;
            formEditar.norma.value = especie.norma;
            formEditar.apendice_CITES.value = especie.apendice_CITES;
            formEditar.origen.value = especie.origen;
            formEditar.descripcion.value = especie.descripcion;
            estadosDeEstaEspecie = especie.estados;
            llenarListaEstados();
        } else if (request.status == 500) {
            alert('Error ' + request.status + ': ' + request.statusText); //error servidor
        } else if (request.status == 401) {
            window.location.href = "/login";
        }
    };
}

function llenarListaEstados() {
    let estados = ['Aguascalientes',
        'Baja California',
        'Baja California Sur',
        'Campeche',
        'Chiapas',
        'Chihuahua',
        'Coahuila de Zaragoza',
        'Colima',
        'Ciudad de México',
        'Durango',
        'Guanajuato',
        'Guerrero',
        'Hidalgo',
        'Jalisco',
        'Estado de Mexico',
        'Michoacan de Ocampo',
        'Morelos',
        'Nayarit',
        'Nuevo Leon',
        'Oaxaca',
        'Puebla',
        'Queretaro de Arteaga',
        'Quintana Roo',
        'San Luis Potosi',
        'Sinaloa',
        'Sonora',
        'Tabasco',
        'Tamaulipas',
        'Tlaxcala',
        'Veracruz de Ignacio de la Llave',
        'Yucatan',
        'Zacatecas',
    ];
    mostrarEstados(estados);
}

function mostrarEstados(estados) {
    let listaEstados = document.getElementById('listaEstados');
    let estadoHTML;
    estados.forEach(estado => {
        if (estadosDeEstaEspecie.includes(estado)) {
            estadoHTML = `<div class="form-check"><input class="form-check-input" type="checkbox" value="${estado}" name="estados" id="estados" checked><label class="form-check-label" for="">${estado}</label></div>`
        } else {
            estadoHTML = `<div class="form-check"><input class="form-check-input" type="checkbox" value="${estado}" name="estados" id="estados"><label class="form-check-label" for="">${estado}</label></div>`
        }
        listaEstados.insertAdjacentHTML('beforeend', estadoHTML);
    });
}

llenarForm();

formEditar.addEventListener("submit", function (e) {
    e.preventDefault(); // para que no te recargue la página cuando sometes el formulario

    //Este handler debe atrapar todos los valores del formulario en un objeto que cumpla con lo que pide el back-end
    let estadosChecked = []
    let checkboxes = document.querySelectorAll('input[type=checkbox]:checked');

    for (let i = 0; i < checkboxes.length; i++) {
        estadosChecked.push(checkboxes[i].value)
    }
    console.log("estados checked", estadosChecked);

    let nuevaEspecie = {
        "nombre_comun": formEditar.nombre_comun.value,
        "nombre_cientifico": formEditar.nombre_cientifico.value,
        "clase": formEditar.clase.value,
        "norma": formEditar.norma.value,
        "apendice_CITES": formEditar.apendice_CITES.value,
        "origen": formEditar.origen.value,
        "descripcion": formEditar.descripcion.value,
        "estados": estadosChecked
    };

    //Manda la información al back-end  
    let request = new XMLHttpRequest();
    request.open('PUT', `https://plataforma2020.herokuapp.com/api/especies/${params.get('id_especie')}`);
    request.setRequestHeader('x-user-token', localStorage.tokenUser);
    request.setRequestHeader('Content-Type', 'application/json'); //necesario?
    request.send([JSON.stringify(nuevaEspecie)]);

    request.onload = () => {
        if (request.status == 200) {
            alert('Especie ha sido actualizada exitosamente');
            window.location.href = "../consultar/";
        } else if (request.status == 400) {
            alert('Error ' + request.status + ': ' + request.responseText); //error de usuario
        } else if (request.status == 500) {
            alert('Error ' + request.status + ': ' + request.statusText); //error servidor
        }
    };
});