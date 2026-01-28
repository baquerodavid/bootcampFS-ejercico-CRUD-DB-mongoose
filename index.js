const express = require("express");
const app = express();
require("dotenv").config();
const { dbConnection } = require("./config/config");
const routes = require("./routes");
const APP_PORT = process.env.APP_PORT;

app.use(express.json()); // Para la API usando json
// app.use(express.urlencoded({extended:true})) // Para cuando tengamos un formulario que recoja los datos
app.use("/", routes);

dbConnection();

app.listen(APP_PORT, () => console.log(`Server started on port ${APP_PORT}`));
