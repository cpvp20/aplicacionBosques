function llenarTablaRescates() {
    let request = new XMLHttpRequest();

    request.open('GET', 'https://plataforma2020.herokuapp.com/api/rescates');
    request.setRequestHeader('x-user-token', localStorage.tokenUser);
    request.send();

    request.onload = () => {
        if (request.status == 200) {
            let rescates = JSON.parse(request.responseText);
            console.log(rescates);
            mostrarRescates(rescates);
        } else if (request.status == 500) {
            alert('Error ' + request.status + ': ' + request.statusText);
        } else if (request.status == 401) {
            window.location.href = "/login";
        }
    };
}

function mostrarRescates(rescates) {
    let CuerpoTablaRescates = document.getElementById('CuerpoTablaRescates');
    rescates.forEach(rescate => {
        let fila = `<tr height="50" onclick="window.location.href = '../consultarUno?id_rescate=${rescate.id_rescate}';" style="cursor:pointer;">
        <td scope="row">${rescate.id_rescate}</td>
        <td>${rescate.tipo}</td>
        <td>${(new Date(rescate.fecha_entrega).toLocaleDateString('es-ES'))}</td>
        </tr>`;
        CuerpoTablaRescates.insertAdjacentHTML('beforeend', fila);
    });
}

llenarTablaRescates();