let formEditar = document.querySelector('#formEditar');
let animalesDiv = document.querySelector('#animalesDiv');
//NOTA: la cantidad de animales en el reporte no puede cambiar, solo pueden cambiar las caracteristicas de los animales exitentes
const params = new URLSearchParams(window.location.search);
console.log('Editando al rescate ' + params.get('id_rescate'));

function cargarAnimalesInputs(animales) {
    let total = animales.length;
    let request = new XMLHttpRequest();
    request.open('GET', 'https://plataforma2020.herokuapp.com/api/especies');
    request.setRequestHeader('x-user-token', localStorage.tokenUser);
    request.send();
    request.onload = () => {
        if (request.status == 200) {
            let especies = JSON.parse(request.responseText);
            let especiesHTML;
            let noVivoHTML;
            let noSanoHTML;
            let especieHTML;
            for (i = 1; i < (total + 1); i++) {
                especiesHTML = "";
                especies.forEach(especie => {
                    if (animales[i - 1].especie == especie.nombre_comun)
                        especiesHTML += `<option selected>${especie.nombre_comun}</option>`;
                    else
                        especiesHTML += `<option>${especie.nombre_comun}</option>`;
                });

                noVivoHTML = animales[i - 1].vivo ? "" : "selected";
                noSanoHTML = animales[i - 1].sano ? "" : "selected";
                animalesDiv.insertAdjacentHTML('beforeend',
                    `<div class="row"><div class="col-1"><div class="form-group"><label>#</label><input value="${i}" disabled class="form-control" id=""></div></div>
            <div class="col-3"><div class="form-group"><label for="especie">Especie</label>
        <select required class="form-control" id="especie">
            ${especiesHTML}
        </select>
    </div></div>
<div class="col-2"><div class="form-group"><label for="vivo">Vivo</label>
        <select required class="form-control" id="vivo"><option selected>Vivo</option><option ${noVivoHTML}>Muerto</option></select>
    </div></div>
<div class="col-2"><div class="form-group"><label for="sano">Sano</label>
        <select required class="form-control" id="sano"><option selected>Sano</option><option ${noSanoHTML}>Lesionado</option></select>
    </div></div>
<div class="col-4"><label for="observaciones">Observaciones</label><input value="${animales[i-1].observaciones}" required type="text" class="form-control" id="observaciones"></div></div>`);
            }
        } else {
            alert("Error al cargar animales");
        }
    }
};
let options = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
}; //para fechas

function llenarForm() {
    let request = new XMLHttpRequest();
    request.open('GET', `https://plataforma2020.herokuapp.com/api/rescates/${params.get('id_rescate')}`);
    request.setRequestHeader('x-user-token', localStorage.tokenUser);
    request.send();

    request.onload = () => {
        if (request.status == 200) {
            let rescate = JSON.parse(request.responseText);
            console.log("Rescate");
            console.log(rescate);
            formEditar.fecha_entrega.value = new Date(rescate.fecha_entrega).toLocaleDateString('es-ES', options).split("/").reverse().join("-");
            formEditar.hora_entrega.value = new Date(rescate.fecha_entrega).toLocaleTimeString('es-ES', {
                hour: '2-digit',
                minute: '2-digit'
            });
            formEditar.direccion_entrega.value = rescate.direccion_entrega;
            formEditar.municipio_entrega.value = rescate.municipio_entrega;
            formEditar.coordenadas_entrega.value = rescate.coordenadas_entrega;
            formEditar.direccion_origen.value = rescate.direccion_origen;
            formEditar.municipio_origen.value = rescate.municipio_origen;
            formEditar.coordenadas_origen.value = rescate.coordenadas_origen;
            formEditar.nombre_entregador.value = rescate.nombre_entregador;
            formEditar.telefono_entregador.value = rescate.telefono_entregador;
            formEditar.orgs_participantes.value = rescate.orgs_participantes;
            formEditar.CMC_fue.value = rescate.CMC_fue ? 'Si' : 'No';
            formEditar.tipo.value = rescate.tipo
            formEditar.situacion.value = rescate.situacion;
            formEditar.resena.value = rescate.resena;
            formEditar.total_animales.value = rescate.total_animales;
            cargarAnimalesInputs(rescate.animales); //llamar una vez para cargar animales
            formEditar.recibe.value = rescate.recibe;
            formEditar.fecha_ingreso.value = new Date(rescate.fecha_ingreso).toLocaleDateString('es-ES', options).split("/").reverse().join("-");
            formEditar.hora_ingreso.value = new Date(rescate.fecha_ingreso).toLocaleTimeString('es-ES', {
                hour: '2-digit',
                minute: '2-digit'
            });
        } else if (request.status == 500) {
            alert('Error ' + request.status + ': ' + request.statusText); //error servidor
        } else if (request.status == 401) {
            window.location.href = "/login";
        }
    }
};

llenarForm();

formEditar.addEventListener("submit", function (e) {
    e.preventDefault(); // para que no te recargue la página cuando sometes el formulario
    //Este handler debe atrapar todos los valores del formulario en un objeto que cumpla con lo que pide el back-end
    //animales
    let animalesArr = [];
    let nuevoAnimal;

    if (formEditar.total_animales.value == 1) {
        nuevoAnimal = {
            "especie": formEditar.especie.value,
            "vivo": formEditar.vivo.value == 'Vivo' ? true : false,
            "sano": formEditar.sano.value == 'Sano' ? true : false,
            "observaciones": formEditar.observaciones.value
        }
        animalesArr.push(nuevoAnimal);
    } else {
        for (i = 0; i < formEditar.especie.length; i++) {
            nuevoAnimal = {
                "especie": formEditar.especie[i].value,
                "vivo": formEditar.vivo[i].value == 'Vivo' ? true : false,
                "sano": formEditar.sano[i].value == 'Sano' ? true : false,
                "observaciones": formEditar.observaciones[i].value
            }
            animalesArr.push(nuevoAnimal);
        }
    }

    //el resto
    let nuevoRescate = {
        "telefono_entregador": formEditar.telefono_entregador.value,
        "nombre_entregador": formEditar.nombre_entregador.value,
        "fecha_entrega": formEditar.fecha_entrega.value,
        "hora_entrega": formEditar.hora_entrega.value,
        "fecha_ingreso": formEditar.fecha_ingreso.value,
        "hora_entrega": formEditar.hora_entrega.value,
        "hora_ingreso": formEditar.hora_ingreso.value,
        "direccion_origen": formEditar.direccion_origen.value,
        "direccion_entrega": formEditar.direccion_entrega.value,
        "municipio_origen": formEditar.municipio_origen.value,
        "municipio_entrega": formEditar.municipio_entrega.value,
        "coordenadas_origen": formEditar.coordenadas_origen.value,
        "coordenadas_entrega": formEditar.coordenadas_entrega.value,
        "orgs_participantes": formEditar.orgs_participantes.value,
        "resena": formEditar.resena.value,
        "tipo": formEditar.tipo.value,
        "situacion": formEditar.situacion.value,
        "CMC_fue": formEditar.CMC_fue.value == 'Si' ? true : false,
        "animales": animalesArr,
        "recibe": formEditar.recibe.value
    };

    //alert(JSON.stringify(nuevoRescate));
    //Manda la información al back-end  

    let request = new XMLHttpRequest();

    request.open('PUT', `https://plataforma2020.herokuapp.com/api/rescates/${params.get('id_rescate')}`);
    request.setRequestHeader('x-user-token', localStorage.tokenUser);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send([JSON.stringify(nuevoRescate)]);

    request.onload = () => {

        if (request.status == 200) {
            alert('Reporte de rescate ha sido actualizado exitosamente');
            window.location.href = "../consultar/";
        } else if (request.status == 400) {
            alert('Error ' + request.status + ': ' + request.responseText); //error de usuario
        } else if (request.status == 500) {
            alert('Error ' + request.status + ': ' + request.statusText); //error servidor
        }
    };

});