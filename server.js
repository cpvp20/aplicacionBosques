const express = require('express');
const port = process.env.PORT || 8080;
const app = express();
const path = require('path')

app.use(express.static(__dirname + "/home"));
app.use('/login', express.static(__dirname + "/login"));
app.use('/pdf', express.static(__dirname + "/"));
app.use('/bosques/consultarUno', express.static(__dirname + "/bosques/consultarUno"));
app.use('/bosques/consultar', express.static(__dirname + "/bosques/consultar"));
app.use('/bosques/agregar', express.static(__dirname + "/bosques/agregar"));
app.use('/bosques/editar', express.static(__dirname + "/bosques/editar"));

app.use('/usuarios/consultarUno', express.static(__dirname + "/usuarios/consultarUno"));
app.use('/usuarios/consultar', express.static(__dirname + "/usuarios/consultar"));
app.use('/usuarios/agregar', express.static(__dirname + "/usuarios/agregar"));
app.use('/usuarios/editar', express.static(__dirname + "/usuarios/editar"));

app.use('/especies/consultarUno', express.static(__dirname + "/especies/consultarUno"));
app.use('/especies/consultar', express.static(__dirname + "/especies/consultar"));
app.use('/especies/agregar', express.static(__dirname + "/especies/agregar"));
app.use('/especies/editar', express.static(__dirname + "/especies/editar"));

app.use('/rescates/consultarUno', express.static(__dirname + "/rescates/consultarUno"));
app.use('/rescates/consultar', express.static(__dirname + "/rescates/consultar"));
app.use('/rescates/agregar', express.static(__dirname + "/rescates/agregar"));
app.use('/rescates/editar', express.static(__dirname + "/rescates/editar"));

app.use('/animales/consultarUno', express.static(__dirname + "/animales/consultarUno"));
app.use('/animales/consultar', express.static(__dirname + "/animales/consultar"));

app.use('/historiales/consultarUno', express.static(__dirname + "/historiales/consultarUno"));
app.use('/historiales/consultar', express.static(__dirname + "/historiales/consultar"));
app.use('/historiales/agregar', express.static(__dirname + "/historiales/agregar"));
app.use('/historiales/editar', express.static(__dirname + "/historiales/editar"));

app.use('/fichas/consultarUno', express.static(__dirname + "/fichas/consultarUno"));
app.use('/fichas/consultar', express.static(__dirname + "/fichas/consultar"));
app.use('/fichas/agregar', express.static(__dirname + "/fichas/agregar"));
app.use('/fichas/editar', express.static(__dirname + "/fichas/editar"));

app.use('/reportes/consultar', express.static(__dirname + "/reportes/consultar"));


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})
