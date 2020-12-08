const params = new URLSearchParams(window.location.search);
console.log('Mostrando al especie ' + params.get('id_especie'));

let cardBody = document.getElementById('cardBody');
let btn = `<a href = '../editar?id_especie=${params.get('id_especie')}' class="btn btn-info">Editar</a>`;
cardBody.insertAdjacentHTML('beforeend', btn);

let request = new XMLHttpRequest();
request.open('GET', `https://plataforma2020.herokuapp.com/api/especies/${params.get('id_especie')}`);
request.setRequestHeader('x-user-token', localStorage.tokenUser);
request.send();

request.onload = () => {
    if (request.status == 200) {
        let especie = JSON.parse(request.responseText);
        console.log(especie);
        document.querySelector('#nombre_comun').append(especie.nombre_comun);
        document.querySelector('#nombre_cientifico').append(especie.nombre_cientifico);
        document.querySelector('#clase').append(especie.clase);
        document.querySelector('#norma').append(especie.norma);
        document.querySelector('#apendice_CITES').append(especie.apendice_CITES);
        document.querySelector('#origen').append(especie.origen);
        document.querySelector('#descripcion').append(especie.descripcion);
        especie.estados.forEach(e => {
            let node = document.createElement("LI");
            node.appendChild(document.createTextNode(e));
            document.getElementById("estados").appendChild(node);
        });
    } else if (request.status == 500) {
        alert('Error ' + request.status + ': ' + request.statusText);
    } else if (request.status == 401) {
        window.location.href = "/login";
    }
};