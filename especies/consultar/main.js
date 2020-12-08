function llenarTablaEspecies() {
    let request = new XMLHttpRequest();
    request.open('GET', 'https://plataforma2020.herokuapp.com/api/especies');
    request.setRequestHeader('x-user-token', localStorage.tokenUser);
    request.send();
    request.onload = () => {
        if (request.status == 200) {
            let especies = JSON.parse(request.responseText);
            console.log(especies);
            mostrarEspecies(especies);
        } else if (request.status == 500) {
            alert('Error ' + request.status + ': ' + request.statusText);
        } else if (request.status == 401) {
            window.location.href = "/login";
        }
    };
}

function mostrarEspecies(especies) {
    let CuerpoTablaEspecies = document.getElementById('CuerpoTablaEspecies');
    especies.forEach(especie => {
        let fila = `<tr height="50" onclick="location.href='../consultarUno?id_especie=${especie.id_especie}';" style="cursor:pointer;">
        <td scope="row">${especie.nombre_comun}</td>
        <td>${especie.clase}</td>
        <td>${especie.origen}</td>
        </tr>`;
        CuerpoTablaEspecies.insertAdjacentHTML('beforeend', fila);
    });
}

llenarTablaEspecies();