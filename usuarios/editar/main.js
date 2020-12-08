const params = new URLSearchParams(window.location.search);
console.log('Editando al usuario ' + params.get('correo'));
let formEditar = document.querySelector('#formEditar');
let usuario;

function llenarForm() {
    let request = new XMLHttpRequest();
    request.open('GET', `https://plataforma2020.herokuapp.com/api/usuarios/${params.get('correo')}`);
    request.setRequestHeader('x-user-token', localStorage.tokenUser);
    request.send();

    request.onload = () => {
        if (request.status == 200) {
            usuario = JSON.parse(request.responseText);
            formEditar.nombre.value = usuario.nombre
            formEditar.apellidos.value = usuario.apellidos;
            formEditar.correo.value = usuario.correo;
            formEditar.fecha_nacimiento.value = new Date(usuario.fecha_nacimiento).toLocaleDateString('es-ES', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            }).split("/").reverse().join("-");
            formEditar.alergias.value = usuario.alergias;
            formEditar.tipo_sangre.value = usuario.tipo_sangre;
            formEditar.telefono.value = usuario.telefono;
            formEditar.IMSS.value = usuario.IMSS;
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
    let nuevoUsuario = {
        "nombre": formEditar.nombre.value,
        "apellidos": formEditar.apellidos.value,
        "alergias": formEditar.alergias.value,
        "IMSS": formEditar.IMSS.value,
        "fecha_nacimiento": formEditar.fecha_nacimiento.value,
        "tipo_sangre": formEditar.tipo_sangre.value,
        "telefono": formEditar.telefono.value
        //correo y fecha registro no cambian
    };
    //Manda la información al back-end  
    let request = new XMLHttpRequest();
    request.open('PUT', `https://plataforma2020.herokuapp.com/api/usuarios/${params.get('correo')}`);
    request.setRequestHeader('x-user-token', localStorage.tokenUser);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send([JSON.stringify(nuevoUsuario)]);

    request.onload = () => {
        if (request.status == 200) {
            alert('Usuario ha sido actualizado exitosamente');
            window.location.href = "../consultar/";
        } else if (request.status == 400) {
            alert('Error ' + request.status + ': ' + request.responseText); //error de usuario
        } else if (request.status == 500) {
            alert('Error ' + request.status + ': ' + request.statusText); //error servidor
        }
    };
});

function verBorrar() {
    str = usuario.nombre + ' ' + usuario.apellidos;
    document.querySelector('#usuarioABorrar').append(str);
}

function borrar() {
    let request = new XMLHttpRequest();
    request.open('DELETE', `https://plataforma2020.herokuapp.com/api/usuarios/${params.get('correo')}`);
    request.setRequestHeader('x-user-token', localStorage.tokenUser);
    request.send();
    request.onload = () => {
        if (request.status == 200) {
            alert('Usuario borrado exitosamente'); //Muestra mensaje de exito
            window.location.href = "../consultar/";
        } else {
            alert('Error al tratar de borrar del usuario');
        }
    }
}