const express = require("express");
const bodyParsel = require("body-parser");

const authRoute = require("./routes/auth");
const postRoute = require("./routes/post");

const app = express();

app.use(bodyParsel.urlencoded({ extended: false }));
app.use(bodyParsel.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Orign", "*");
  res.setHeader("Access-Control-Allow-Methods", "post,get,delete,put");
  res.setHeader("Access-Control-Allow-Headers", "Content-type,Authorization");
  next();
});

app.use(authRoute);
app.use(postRoute)

app.use((err, req, res, next) => {
  if (!err.statusCode) {
    err.statusCode = 500;
  }
  const statusCode = err.statusCode;
  res.status(statusCode).json({
    err
  })
});

app.listen(8080);
