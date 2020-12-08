function llenarTablaFichas() {
    let request = new XMLHttpRequest();

    request.open('GET', 'https://plataforma2020.herokuapp.com/api/fichas');
    request.setRequestHeader('x-user-token', localStorage.tokenUser);
    request.send();

    request.onload = () => {
        if (request.status == 200) {
            let fichas = JSON.parse(request.responseText);
            mostrarFichas(fichas);
        } else if (request.status == 500) {
            alert('Error ' + request.status + ': ' + request.statusText);
        } else if (request.status == 401) {
            window.location.href = "/login";
        }
    };
}

function mostrarFichas(fichas) {
    let CuerpoTablaFichas = document.getElementById('CuerpoTablaFichas');
    fichas.forEach(ficha => {
        let fila = `<tr height="50" onclick="window.location.href = '../consultarUno?id_ficha=${ficha.id_ficha}';" style="cursor:pointer;">
        <td scope="row">${ficha.id_ficha}</td>
        <td>${(new Date(ficha.fecha).toLocaleDateString('es-ES'))}</td>
        <td>${ficha.id_animal}</td>
        <td>${ficha.diagnostico}</td>
        </tr>`;
        CuerpoTablaFichas.insertAdjacentHTML('beforeend', fila);
    });
}

llenarTablaFichas();