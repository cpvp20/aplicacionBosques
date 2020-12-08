var formAgregar = document.querySelector('#formAgregar');

formAgregar.addEventListener("submit", function (e) {
    e.preventDefault(); // para que no te recargue la página cuando sometes el formulario

    //Este handler debe atrapar todos los valores del formulario en un objeto que cumpla con lo que pide el back-end
    let nuevoUsuario = {
        "nombre": formAgregar.nombre.value,
        "apellidos": formAgregar.apellidos.value,
        "correo": formAgregar.correo.value,
        "password": formAgregar.password.value,
        "IMSS": formAgregar.IMSS.value,
        "fecha_nacimiento": formAgregar.fecha_nacimiento.value,
        "telefono": formAgregar.telefono.value,
        "alergias": formAgregar.alergias.value,
        "tipo_sangre": formAgregar.tipo_sangre.value
    };
    console.log(nuevoUsuario);
    //Manda la información al back-end  

    let request = new XMLHttpRequest();

    request.open('POST', 'https://plataforma2020.herokuapp.com/api/usuarios');
    request.setRequestHeader('Content-Type', 'application/json');
    request.setRequestHeader('x-user-token', localStorage.tokenUser);
    request.send([JSON.stringify(nuevoUsuario)]); 

    request.onload = () => {
        if (request.status == 200) {
            alert('Usuario ha sido registrado exitosamente');
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