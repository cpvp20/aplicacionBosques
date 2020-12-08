const params = new URLSearchParams(window.location.search);
console.log('Mostrando al animal ' + params.get('id_animal'));

let options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
}; //para fechas

let request = new XMLHttpRequest();
request.open('GET', `https://plataforma2020.herokuapp.com/api/animales/${params.get('id_animal')}`);
request.setRequestHeader('x-user-token', localStorage.tokenUser);
request.send();

request.onload = () => {
    if (request.status == 200) {
        let animal = JSON.parse(request.responseText);
        document.querySelector('#especie').append(animal.especie);
        document.querySelector('#vivo').append(animal.vivo ? "Si" : "No");
        document.querySelector('#sano').append(animal.sano ? "Si" : "No");
        document.querySelector('#folioAnimal').append(animal.id_animal);
        document.querySelector('#folioRescate').append(animal.id_rescate);

        let footerRescate = document.getElementById('footerRescate');
        let btnConsultarRescate = `<a href = '/rescates/consultarUno?id_rescate=${animal.id_rescate}' class="btn btn-info">Ver Mas</a>`;
        footerRescate.insertAdjacentHTML('beforeend', btnConsultarRescate);

    } else if (request.status == 500) {
        alert('Error ' + request.status + ': ' + request.statusText);
    } else if (request.status == 401) {
        window.location.href = "/login";
    }
};

let requestFichas = new XMLHttpRequest();
requestFichas.open('GET', `https://plataforma2020.herokuapp.com/api/fichas/animal/${params.get('id_animal')}`);
requestFichas.setRequestHeader('x-user-token', localStorage.tokenUser);
requestFichas.send();

requestFichas.onload = () => {
    if (requestFichas.status == 200) {
        let fichas = JSON.parse(requestFichas.responseText);
        let fichasHTML = "";
        
        if (fichas.length > 0) {
            let fecha;
            for (let i = 0; i < fichas.length; i++) {
                console.log(fichas[i]);
                fecha= new Date(fichas[i].fecha).toLocaleDateString('es-ES', options);
                fichasHTML+= `<p><b>Ficha #${i+1}</b><p>
            <p>Fecha: ${fecha};</p>
            </p>Diagnostico: ${fichas[i].diagnostico}</p>
            <a href = '/fichas/consultarUno?id_ficha=${fichas[i].id_ficha}' class="btn btn-info">Ver Mas</a>
            <br><br>`;
            }
        } else {
            fichasHTML = "Este animal aun no tiene fichas medicas";
        }
        let cardBodyFichas = document.getElementById('cardBodyFichas');
        cardBodyFichas.insertAdjacentHTML('beforeend', fichasHTML);


    } else if (requestFichas.status == 500) {
        alert('Error ' + requestFichas.status + ': ' + requestFichas.statusText);
    }
};