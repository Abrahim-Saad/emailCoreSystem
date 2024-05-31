let app = require("express").Router();


app.get("/", (req, res) => {
    return res.status(200).json({ success: true, message: 'Welcome', code: 200 })
})


app.all("*", (req, res) => {
    return res.status(404).json({ success: false, error: 'Invalid Request', code: 404 })
})

module.exports = app;
