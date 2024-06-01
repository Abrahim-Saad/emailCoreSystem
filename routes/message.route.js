const app = require("express").Router();
const messageController = require("../controllers/message.controller")


app.post("/create", messageController.createEmailMessage)
app.get("/get", messageController.getEmailMessage)
app.get("/list", messageController.listEmailMessages)
app.put("/update", messageController.updateEmailMessage)
app.delete("/delete", messageController.deleteEmailMessage)


module.exports = app;