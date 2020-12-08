const params = new URLSearchParams(window.location.search);
console.log('Mostrando al bosque ' + params.get('id_bosque'));

let cardBody = document.getElementById('cardBody');
let btn = `<a href = "../editar?id_bosque=${params.get('id_bosque')}" class="btn btn-info">Editar</a>`;
cardBody.insertAdjacentHTML('beforeend', btn);

let request = new XMLHttpRequest();
request.open('GET', `https://plataforma2020.herokuapp.com/api/bosques/${params.get('id_bosque')}`);
request.setRequestHeader('x-user-token', localStorage.tokenUser);
request.send();

request.onload = () => {
    if (request.status == 200) {
        let bosque = JSON.parse(request.responseText);
        console.log(bosque);
        document.querySelector('#nombre').append(bosque.nombre);
        document.querySelector('#superficie').append(bosque.superficie);
        document.querySelector('#flora').append(bosque.flora);
        bosque.especies.forEach(e => {
            var node = document.createElement("LI");
            node.appendChild(document.createTextNode(e));
            document.getElementById("especies").appendChild(node);
        });
    } else if (request.status == 500) {
        alert('Error ' + request.status + ': ' + request.statusText);
    } else if (request.status == 401) {
        window.location.href = "/login";
    }
};