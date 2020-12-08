function llenarReporte() {
    let request = new XMLHttpRequest();

    request.open('GET', 'https://plataforma2020.herokuapp.com/api/reportes');
    request.setRequestHeader('x-user-token', localStorage.tokenUser);
    request.send();

    request.onload = () => {
        if (request.status == 200) {
            let response = JSON.parse(request.responseText);

            console.log(response.rescatesPorUsuario);
            response.rescatesPorUsuario.forEach(e => {
                str = e.usuario + ': ' + e.rescates;
                let node = document.createElement("LI");
                node.appendChild(document.createTextNode(str));
                document.getElementById("rescatesPorUsuario").appendChild(node);
            });

            console.log(response.totalEspecies);
            document.getElementById("totalEspecies").append(response.totalEspecies);

            console.log(response.especiesPorClase);
            response.especiesPorClase.forEach(e => {
                str = e.clase + ': ' + e.especies;
                let node = document.createElement("LI");
                node.appendChild(document.createTextNode(str));
                document.getElementById("especiesPorClase").appendChild(node);
            });

            console.log(response.totalAnimales);
            document.getElementById("totalAnimales").append(response.totalAnimales);

            console.log(response.totalRescatesCaptura);
            document.getElementById("totalRescatesCaptura").append(response.totalRescatesCaptura);

        } else if (request.status == 500) {
            alert('Error ' + request.status + ': ' + request.statusText);
        } else if (request.status == 401) {
            window.location.href = "/login";
        }
    };
}

llenarReporte();