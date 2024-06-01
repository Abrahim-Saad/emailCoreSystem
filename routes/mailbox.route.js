const app = require("express").Router();
const mailboxController = require("../controllers/mailbox.controller")


app.post("/create", mailboxController.createMailbox)
app.get("/get", mailboxController.getMailbox)
app.get("/list", mailboxController.listMailboxs)
app.put("/update", mailboxController.updateMailbox)
app.delete("/delete", mailboxController.deleteMailbox)


module.exports = app;