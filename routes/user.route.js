const app = require("express").Router();
const userController = require("../controllers/user.controller")


app.post("/create", userController.createUser)
app.get("/get", userController.getUser)
app.get("/list", userController.listUsers)
app.put("/update", userController.updateUser)
app.delete("/delete", userController.deleteUser)


module.exports = app;