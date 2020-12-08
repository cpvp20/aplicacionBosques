const params = new URLSearchParams(window.location.search);

let cardBody = document.getElementById('cardBody');
let btn = `<a href = '../editar?id_rescate=${params.get('id_rescate')}' class="btn btn-info">Editar</a>`;
cardBody.insertAdjacentHTML('beforeend', btn);
let options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
}; //para fechas

let request = new XMLHttpRequest();
request.open('GET', `https://plataforma2020.herokuapp.com/api/rescates/${params.get('id_rescate')}`);
request.setRequestHeader('x-user-token', localStorage.tokenUser);
request.send();

request.onload = () => {
    if (request.status == 200) {
        let rescate = JSON.parse(request.responseText);
        //document.querySelector('#encargado').append(rescate.encargado);
        //ahora en lugar de cargar el correo, consigue el nombre y apellido del encargado y lo carga
        let requestUsuario = new XMLHttpRequest();
        requestUsuario.open('GET', `https://plataforma2020.herokuapp.com/api/usuarios/${rescate.encargado}`);
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

        document.querySelector('#folio').append(rescate.id_rescate);
        document.querySelector('#fecha_entrega').append(new Date(rescate.fecha_entrega).toLocaleDateString('es-ES', options));
        document.querySelector('#hora_entrega').append(new Date(rescate.fecha_entrega).toLocaleTimeString());
        document.querySelector('#direccion_origen').append(rescate.direccion_origen);
        document.querySelector('#municipio_origen').append(rescate.municipio_origen);
        document.querySelector('#coordenadas_origen').append(rescate.coordenadas_origen);
        document.querySelector('#direccion_entrega').append(rescate.direccion_entrega);
        document.querySelector('#municipio_entrega').append(rescate.municipio_entrega);
        document.querySelector('#coordenadas_entrega').append(rescate.coordenadas_entrega);
        document.querySelector('#nombre_entregador').append(rescate.nombre_entregador);
        document.querySelector('#telefono_entregador').append(rescate.telefono_entregador);
        document.querySelector('#orgs_participantes').append(rescate.orgs_participantes);
        document.querySelector('#CMC_fue').append(rescate.direccion_origen ? 'Si' : 'No');
        document.querySelector('#tipo').append(rescate.tipo);
        document.querySelector('#situacion').append(rescate.situacion);
        document.querySelector('#resena').append(rescate.resena);
        document.querySelector('#total_animales').append(rescate.total_animales);
        document.querySelector('#recibe').append(rescate.recibe);
        document.querySelector('#fecha_ingreso').append(new Date(rescate.fecha_ingreso).toLocaleDateString('es-ES', options));
        document.querySelector('#hora_ingreso').append(new Date(rescate.fecha_ingreso).toLocaleTimeString());
        rescate.animales.forEach(animal => {
            let node = document.createElement("LI");
            let str = animal.especie + ', ' + (animal.vivo ? "vivo" : "muerto") + ', ' + (animal.sano ? "sano" : "lesionado") + ', ' + animal.observaciones;
            node.appendChild(document.createTextNode(str));
            document.getElementById("animales").appendChild(node);
        });


    } else if (request.status == 500) {
        alert('Error ' + request.status + ': ' + request.statusText);
    } else if (request.status == 401) {
        window.location.href = "/login";
    }
};
/*
let pdfBtn = document.getElementById('pdf');
pdfBtn.addEventListener("click", () => {
    //window.location.href = "/a4.pdf/";

    let request = new XMLHttpRequest();
    request.open('GET', `https://plataforma2020.herokuapp.com/api/rescates/pdf/${params.get('id_rescate')}`);
    request.setRequestHeader('x-user-token', localStorage.tokenUser);
    request.send();

    request.onload = () => {
        if (request.status == 200) {
            console.log(request.response);
            //window.location.href = '/pdf/hello.pdf';

        } else {
            console.log("EROR");
        }

    }
});

*/