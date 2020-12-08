const params = new URLSearchParams(window.location.search);

let cardBody = document.getElementById('cardBody');
let btn = `<a href = "../editar?id_ficha=${params.get('id_ficha')}" class="btn btn-info">Editar</a>`;
cardBody.insertAdjacentHTML('beforeend', btn);
let options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
}; //para fechas

let request = new XMLHttpRequest();
request.open('GET', `https://plataforma2020.herokuapp.com/api/fichas/${params.get('id_ficha')}`);
request.setRequestHeader('x-user-token', localStorage.tokenUser);
request.send();

request.onload = () => {
    if (request.status == 200) {
        let ficha = JSON.parse(request.responseText);
        //document.querySelector('#encargado').append(ficha.encargado);
        //ahora en lugar de cargar el correo, consigue el nombre y apellido del encargado y lo carga
        let requestUsuario = new XMLHttpRequest();
        requestUsuario.open('GET', `https://plataforma2020.herokuapp.com/api/usuarios/${ficha.encargado}`);
        requestUsuario.setRequestHeader('x-user-token', localStorage.tokenUser);
        requestUsuario.send();
        requestUsuario.onload = () => {
            if (requestUsuario.status == 200) {
                let usuario = JSON.parse(requestUsuario.responseText);
                let str = usuario.nombre + ' ' + usuario.apellidos;
                document.querySelector('#encargado').append(str);
            } else if (requestUsuario.status == 500) {
                alert('Error ' + request.status + ': ' + request.statusText);
            }
        }

        document.querySelector('#folio_ficha').append(ficha.id_ficha);
        document.querySelector('#folio_animal').append(ficha.id_animal);
        document.querySelector('#fecha').append(new Date(ficha.fecha).toLocaleDateString('es-ES', options));
        document.querySelector('#hora').append(new Date(ficha.fecha).toLocaleTimeString());
        document.querySelector('#sexo').append(ficha.sexo);
        document.querySelector('#peso').append(ficha.peso);
        document.querySelector('#edad').append(ficha.edad);
        document.querySelector('#nivel_reaccion').append(ficha.nivel_reaccion);
        document.querySelector('#frecuencia_cardiaca').append(ficha.frecuencia_cardiaca || "");
        document.querySelector('#frecuencia_respiratoria').append(ficha.frecuencia_respiratoria || "");
        document.querySelector('#temperatura').append(ficha.temperatura || "");
        document.querySelector('#condicion_corporal').append(ficha.condicion_corporal || "");
        document.querySelector('#tiempo_llenado_capilar').append(ficha.tiempo_llenado_capilar || "");
        document.querySelector('#pulso').append(ficha.pulso || "");
        document.querySelector('#hidratacion').append(ficha.hidratacion || "");
        document.querySelector('#examen_fisico').append(ficha.examen_fisico || "");
        document.querySelector('#observaciones').append(ficha.observaciones || "");
        document.querySelector('#diagnostico').append(ficha.diagnostico);

    } else if (request.status == 500) {
        alert('Error ' + request.status + ': ' + request.statusText);
    } else if (request.status == 401) {
        window.location.href = "/login";
    }
};