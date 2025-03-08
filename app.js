const express = require("express");
const bodyParsel = require("body-parser");

const app = express();

app.use(bodyParsel.urlencoded({ extended: false }));
app.use(bodyParsel.json());

app.listen(8080);

