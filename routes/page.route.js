const app = require("express").Router();

app.get("/register", (req, res) => res.render("register"))


module.exports = app;