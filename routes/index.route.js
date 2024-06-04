const app = require("express").Router();
const pageRoutes = require("./page.route")
const messageRoutes = require("./message.route")
const mailboxRoutes = require("./mailbox.route")
const userRoutes = require("./user.route")
const indexController = require("../helpers/elasticSearch.helper")


app.use("/pages", pageRoutes)
app.use("/messages", messageRoutes)
app.use("/mailboxes", mailboxRoutes)
app.use("/users", userRoutes)

app.delete("/delete", async (req, res) => {
    let result = await indexController.deleteIndex(req.query.index)
    return res.json(result)
})

app.all("*", (req, res) => {
    return res.status(404).json({ success: false, error: 'Invalid Request', code: 404 })
})

module.exports = app;
