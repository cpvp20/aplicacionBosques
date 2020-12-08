let formAgregar = document.querySelector('#formAgregar');
let animalesDiv = document.querySelector('#animalesDiv');
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

function cargarAnimalesInputs() {
    let request = new XMLHttpRequest();
    request.open('GET', 'https://plataforma2020.herokuapp.com/api/especies');
    request.setRequestHeader('x-user-token', localStorage.tokenUser);
    request.send();
    request.onload = () => {
        if (request.status == 200) {
            let especies = JSON.parse(request.responseText);
            let especiesHTML = "";
            especies.forEach(especie => especiesHTML += `<option>${especie.nombre_comun}</option>`);
            animalesDiv.innerHTML = ""; //limpiar todos por si no es la primera vez que ingresas el valor
            for (let i = 1; i < (parseInt(formAgregar.total_animales.value) + 1); i++) {
                animalesDiv.insertAdjacentHTML('beforeend',
                    `<div class="row"><div class="col-1"><div class="form-group"><label>#</label><input value="${i}" disabled class="form-control" id=""></div></div>
            <div class="col-3"><div class="form-group"><label for="especie">Especie</label>
        <select required class="form-control" id="especie">
            <option selected disabled value="">Seleccionar una</option>${especiesHTML}
        </select>
    </div></div>
<div class="col-2"><div class="form-group"><label for="vivo">Vivo</label>
        <select required class="form-control" id="vivo"><option selected disabled value="">Seleccionar una</option><option>Vivo</option><option>Muerto</option></select>
    </div></div>
<div class="col-2"><div class="form-group"><label for="sano">Sano</label>
        <select required class="form-control" id="sano"><option selected disabled value="">Seleccionar una</option><option>Sano</option><option>Lesionado</option></select>
    </div></div>
<div class="col-4"><label for="observaciones">Observaciones</label><input required type="text" class="form-control" id="observaciones"></div></div>`);
            }
        } else {
            alert("Error al cargar animales");
        }
    }
};

cargarAnimalesInputs(); //llamar una vez para cargar 1 animal
formAgregar.total_animales.addEventListener("change", function (e) { //event listener para actualizar cada vez que cambie 
    cargarAnimalesInputs();
});

formAgregar.addEventListener("submit", function (e) {
    e.preventDefault(); // para que no te recargue la página cuando sometes el formulario

    //Este handler debe atrapar todos los valores del formulario en un objeto que cumpla con lo que pide el back-end

    //animales
    let animalesArr = [];
    let nuevoAnimal;

    if (formAgregar.total_animales.value == 1) {
        nuevoAnimal = {
            "especie": formAgregar.especie.value,
            "vivo": formAgregar.vivo.value == 'Vivo' ? true : false,
            "sano": formAgregar.sano.value == 'Sano' ? true : false,
            "observaciones": formAgregar.observaciones.value
        }
        //console.log("Solamente guardaremos 1 animal: " );
        //console.log(nuevoAnimal);
        animalesArr.push(nuevoAnimal);
    } else {
        for (let i = 0; i < formAgregar.especie.length; i++) {
            nuevoAnimal = {
                "especie": formAgregar.especie[i].value,
                "vivo": formAgregar.vivo[i].value == 'Vivo' ? true : false,
                "sano": formAgregar.sano[i].value == 'Sano' ? true : false,
                "observaciones": formAgregar.observaciones[i].value
            }
            //console.log("en el ciclo", i, "guardaremos este animal: " );
            //console.log(nuevoAnimal);
            animalesArr.push(nuevoAnimal);
        }
    }

    //el resto
    let nuevoRescate = {
        "encargado": infoDeUsuario.correo, //formAgregar.encargado.value,
        "telefono_entregador": formAgregar.telefono_entregador.value,
        "nombre_entregador": formAgregar.nombre_entregador.value,
        "fecha_entrega": formAgregar.fecha_entrega.value,
        "hora_entrega": formAgregar.hora_entrega.value,
        "fecha_ingreso": formAgregar.fecha_ingreso.value,
        "hora_entrega": formAgregar.hora_entrega.value,
        "hora_ingreso": formAgregar.hora_ingreso.value,
        "direccion_origen": formAgregar.direccion_origen.value,
        "direccion_entrega": formAgregar.direccion_entrega.value,
        "municipio_origen": formAgregar.municipio_origen.value,
        "municipio_entrega": formAgregar.municipio_entrega.value,
        "coordenadas_origen": formAgregar.coordenadas_origen.value,
        "coordenadas_entrega": formAgregar.coordenadas_entrega.value,
        "orgs_participantes": formAgregar.orgs_participantes.value,
        "resena": formAgregar.resena.value,
        "tipo": formAgregar.tipo.value,
        "situacion": formAgregar.situacion.value,
        "CMC_fue": formAgregar.CMC_fue.value == 'Si' ? true : false,
        "total_animales": formAgregar.total_animales.value,
        "animales": animalesArr,
        "recibe": formAgregar.recibe.value
    };

    //Manda la info al back-end  

    let request = new XMLHttpRequest();

    request.open('POST', 'https://plataforma2020.herokuapp.com/api/rescates');
    request.setRequestHeader('x-user-token', localStorage.tokenUser);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send([JSON.stringify(nuevoRescate)]);

    request.onload = () => {
        if (request.status == 200) {
            alert('Reporte de rescate ha sido registrado exitosamente');
            window.location.href = "../consultar/";
        } else if (request.status == 400) {
            alert('Error ' + request.status + ': ' + request.responseText); //error de usuario
        } else if (request.status == 500) {
            alert('Error ' + request.status + ': ' + request.statusText); //error servidor
        }
    };
});