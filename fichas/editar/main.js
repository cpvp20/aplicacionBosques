const params = new URLSearchParams(window.location.search);
console.log('Editando a la ficha ' + params.get('id_ficha'));
let formEditar = document.querySelector('#formEditar');
let ficha;

function llenarForm() {
    let request = new XMLHttpRequest();
    request.open('GET', `https://plataforma2020.herokuapp.com/api/fichas/${params.get('id_ficha')}`);
    request.setRequestHeader('x-user-token', localStorage.tokenUser);
    request.send();

    request.onload = () => {
        if (request.status == 200) {
            ficha = JSON.parse(request.responseText);
            formEditar.id_animal.value = ficha.id_animal;
            formEditar.sexo.value = ficha.sexo;
            formEditar.peso.value = ficha.peso;
            formEditar.edad.value = ficha.edad;
            formEditar.fecha.value = new Date(ficha.fecha).toLocaleDateString('es-ES', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            }).split("/").reverse().join("-");
            formEditar.hora.value = new Date(ficha.fecha).toLocaleTimeString('es-ES', {
                hour: '2-digit',
                minute: '2-digit'
            });
            formEditar.nivel_reaccion.value = ficha.nivel_reaccion;
            formEditar.frecuencia_cardiaca.value = ficha.frecuencia_cardiaca;
            formEditar.frecuencia_respiratoria.value = ficha.frecuencia_respiratoria;
            formEditar.temperatura.value = ficha.temperatura;
            formEditar.condicion_corporal.value = ficha.condicion_corporal;
            formEditar.tiempo_llenado_capilar.value = ficha.tiempo_llenado_capilar;
            formEditar.pulso.value = ficha.pulso;
            formEditar.hidratacion.value = ficha.hidratacion;
            formEditar.examen_fisico.value = ficha.examen_fisico;
            formEditar.observaciones.value = ficha.observaciones;
            formEditar.diagnostico.value = ficha.diagnostico;
        } else if (request.status == 500) {
            alert('Error ' + request.status + ': ' + request.statusText); //error servidor
        } else if (request.status == 401) {
            window.location.href = "/login";
        }
    }
}

llenarForm();

formEditar.addEventListener("submit", function (e) {
    e.preventDefault(); // para que no te recargue la página cuando sometes el formulario

    //Este handler debe atrapar todos los valores del formulario en un objeto que cumpla con lo que pide el back-end
    let nuevaFicha = {
        "sexo": formEditar.sexo.value,
        "peso": formEditar.peso.value,
        "edad": formEditar.edad.value,
        "fecha": formEditar.fecha.value,
        "hora": formEditar.hora.value,
        "nivel_reaccion": formEditar.nivel_reaccion.value,
        "frecuencia_cardiaca": formEditar.frecuencia_cardiaca.value,
        "frecuencia_respiratoria": formEditar.frecuencia_respiratoria.value,
        "temperatura": formEditar.temperatura.value,
        "condicion_corporal": formEditar.condicion_corporal.value,
        "tiempo_llenado_capilar": formEditar.tiempo_llenado_capilar.value,
        "pulso": formEditar.pulso.value,
        "hidratacion": formEditar.hidratacion.value,
        "examen_fisico": formEditar.examen_fisico.value,
        "observaciones": formEditar.observaciones.value,
        "diagnostico": formEditar.diagnostico.value
    };

    //Manda la información al back-end  
    let request = new XMLHttpRequest();
    request.open('PUT', `https://plataforma2020.herokuapp.com/api/fichas/${params.get('id_ficha')}`);
    request.setRequestHeader('x-user-token', localStorage.tokenUser);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send([JSON.stringify(nuevaFicha)]);

    request.onload = () => {
        if (request.status == 200) {
            alert('Ficha ha sido actualizada exitosamente');
            window.location.href = "../consultar/index.html";
        } else if (request.status == 500) {
            alert('Error ' + request.status + ': ' + request.statusText); //error servidor
        }
    };
});