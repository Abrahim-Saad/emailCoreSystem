const app = require("express").Router();
const messageController = require("../controllers/message.controlle")


app.post("/create", messageController.createEmailMessage)


module.exports = app;