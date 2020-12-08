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
    estados.forEach(estado => {
        let estadoHTML = `<div class="form-check">
        <input class="form-check-input" type="checkbox" value="${estado}" name="estados" id="estados">
        <label class="form-check-label" for="">${estado}</label>
    </div>`

        listaEstados.insertAdjacentHTML('beforeend', estadoHTML);
    });
}

llenarListaEstados();

let formAgregar = document.querySelector('#formAgregar');

formAgregar.addEventListener("submit", function (e) {
    e.preventDefault(); // para que no te recargue la página cuando sometes el formulario

    //Este handler debe atrapar todos los valores del formulario en un objeto que cumpla con lo que pide el back-end
    let estadosChecked = []
    let checkboxes = document.querySelectorAll('input[type=checkbox]:checked');
    for (let i = 0; i < checkboxes.length; i++) {
        estadosChecked.push(checkboxes[i].value)
    }
    console.log("estados checked", estadosChecked);
    let nuevaEspecie = {
        "nombre_cientifico": formAgregar.nombre_cientifico.value,
        "nombre_comun": formAgregar.nombre_comun.value,
        "descripcion": formAgregar.descripcion.value,
        "origen": formAgregar.origen.value,
        "clase": formAgregar.clase.value,
        "apendice_CITES": formAgregar.apendice_CITES.value,
        "norma": formAgregar.norma.value,
        "estados": estadosChecked
    };
    //Manda la información al back-end  
    let request = new XMLHttpRequest();
    request.open('POST', 'https://plataforma2020.herokuapp.com/api/especies');
    request.setRequestHeader('x-user-token', localStorage.tokenUser);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send([JSON.stringify(nuevaEspecie)]);

    request.onload = () => {
        if (request.status == 200) {
            alert('Especie ha sido registrada exitosamente');
            window.location.href = "../consultar/";
        } else if (request.status == 400) {
            alert('Error ' + request.status + ': ' + request.responseText); //error de usuario
        } else if (request.status == 500) {
            alert('Error ' + request.status + ': ' + request.statusText); //error servidor
        } else if (request.status == 401) {
            window.location.href = "/login";
        }
    };
});