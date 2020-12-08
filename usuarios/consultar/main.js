function llenarTablaUsuarios() {
    let request = new XMLHttpRequest();
    request.open('GET', 'https://plataforma2020.herokuapp.com/api/usuarios');
    request.setRequestHeader('x-user-token', localStorage.tokenUser);
    request.send();

    request.onload = () => {
        if (request.status == 200) {
            let usuarios = JSON.parse(request.responseText);
            console.log(usuarios);
            mostrarUsuarios(usuarios);
        } else if (request.status == 500) {
            alert('Error ' + request.status + ': ' + request.statusText);
        } else if (request.status == 401) {
            window.location.href = "/login";
        }
    };
}

function mostrarUsuarios(usuarios) {
    let CuerpoTablaUsuarios = document.getElementById('CuerpoTablaUsuarios');
    usuarios.forEach(usuario => {
        let fila = `<tr height="50" onclick="window.location.href = '../consultarUno?correo=${usuario.correo}';" style="cursor:pointer;">
        <td scope="row">${usuario.nombre}</td>
        <td>${usuario.apellidos}</td>
        <td>${usuario.correo}</td>
        </tr>`;
        CuerpoTablaUsuarios.insertAdjacentHTML('beforeend', fila);
    });
}

llenarTablaUsuarios();