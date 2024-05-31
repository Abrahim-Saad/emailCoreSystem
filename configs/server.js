const app = require("./app");
const http = require('http');
const server = http.createServer(app);

server.listen(process.env.PORT || 4000, process.env.LOCAL_HOST || "0.0.0.0", () => {
    console.log(`Server is up and running on port ${process.env.PORT}!`)
})


module.exports = app