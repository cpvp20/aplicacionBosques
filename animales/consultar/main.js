function llenarTablaAnimales() {
    let request = new XMLHttpRequest();

    request.open('GET', 'https://plataforma2020.herokuapp.com/api/animales');
    request.setRequestHeader('x-user-token', localStorage.tokenUser);
    request.send();

    request.onload = () => {
        if (request.status == 200) {
            let animales = JSON.parse(request.responseText);
            console.log(animales);
            mostrarAnimales(animales);
        } else if (request.status == 500) {
            alert('Error ' + request.status + ': ' + request.statusText);
        } else if (request.status == 401) {
            window.location.href = "/login";
        }
    };
}

function mostrarAnimales(animales) {
    let CuerpoTablaAnimales = document.getElementById('CuerpoTablaAnimales');
    animales.forEach(animal => {
        let fila = `<tr height="50" onclick="window.location.href = '../consultarUno?id_animal=${animal.id_animal}';" style="cursor:pointer;">
        <td scope="row">${animal.id_animal}</td>
        <td>${animal.id_rescate}</td>
        <td>${animal.especie}</td>
        </tr>`;
        CuerpoTablaAnimales.insertAdjacentHTML('beforeend', fila);
    });
}

llenarTablaAnimales();