const app = require("express").Router();
const messageRoutes = require("./message.route")


app.use("/messages", messageRoutes)

app.get("/", (req, res) => {
    return res.status(200).json({ success: true, result: 'Welcome', code: 200 })
})




app.all("*", (req, res) => {
    return res.status(404).json({ success: false, error: 'Invalid Request', code: 404 })
})

module.exports = app;
