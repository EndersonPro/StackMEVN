const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");

/* Conexion a la base de datos de MONGODB */
mongoose.connect('mongodb://localhost:27017/listTasks', { useNewUrlParser: true }).then(() => {
    console.log("Base de datos conectada");
}).catch(err => console.log(err));

/* Configuracion para el puerto de conexion */
const port = process.env.PORT || 9000;

/* Middleware */
// Me permite servir archivos estaticos al cliente..
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(require("./routes/tasks"))
app.use(express.static(path.resolve(path.join(__dirname, '../public'))));


app.listen(port, () => {
    console.log("Servidor corriendo en el puerto", port);
})