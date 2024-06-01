const app = require("express").Router();
const messageRoutes = require("./message.route")
const mailboxRoutes = require("./mailbox.route")


app.use("/messages", messageRoutes)
app.use("/mailboxes", mailboxRoutes)



app.all("*", (req, res) => {
    return res.status(404).json({ success: false, error: 'Invalid Request', code: 404 })
})

module.exports = app;
