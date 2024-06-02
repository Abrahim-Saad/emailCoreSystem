const app = require("express").Router();
const pageRoutes = require("./page.route")
const messageRoutes = require("./message.route")
const mailboxRoutes = require("./mailbox.route")
const userRoutes = require("./user.route")



app.use("/pages", pageRoutes)
app.use("/messages", messageRoutes)
app.use("/mailboxes", mailboxRoutes)
app.use("/users", userRoutes)



app.all("*", (req, res) => {
    return res.status(404).json({ success: false, error: 'Invalid Request', code: 404 })
})

module.exports = app;
