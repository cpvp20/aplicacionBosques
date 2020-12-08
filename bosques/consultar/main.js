function llenarTablaBosques() {
    let request = new XMLHttpRequest();
    request.open('GET', 'https://plataforma2020.herokuapp.com/api/bosques');
    request.setRequestHeader('x-user-token', localStorage.tokenUser);
    request.send();

    request.onload = () => {
        if (request.status == 200) {
            let bosques = JSON.parse(request.responseText);
            console.log(bosques);
            mostrarBosques(bosques);
        } else if (request.status == 500) {
            alert('Error ' + request.status + ': ' + request.statusText);
        } else if (request.status == 401) {
            window.location.href = "/login";
        }
    };
}

function mostrarBosques(bosques) {
    let CuerpoTablaBosques = document.getElementById('CuerpoTablaBosques');
    bosques.forEach(bosque => {
        let fila = `<tr height="70" style="cursor:pointer;" onclick="window.location.href = '../consultarUno?id_bosque=${bosque.id_bosque}';">
        <td scope="row">${bosque.nombre}</td>
        <td>${bosque.superficie}</td>
        </tr>`;
        CuerpoTablaBosques.insertAdjacentHTML('beforeend', fila);
    });
}

llenarTablaBosques();