require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const compression = require('compression');
const path = require('path');
const toobusy = require('node-toobusy');
const cookieParser = require('cookie-parser');

const handleCorsPolicy = require("../helpers/cors.helper");
const routes = require("../routes/index.route");

app.use(cors());
app.use(handleCorsPolicy);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(morgan("dev"));
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      ...helmet.contentSecurityPolicy.getDefaultDirectives(),
      'script-src': ["'self'", "'unsafe-inline'"]
    }
  }
}));
app.use(compression())
app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname, '../public')))
app.use(cookieParser());


// Express Status Monitor for monitoring server status
app.use(require('express-status-monitor')({
  title: 'Server Status',
  path: '/status',
  // socketPath: '/socket.io', // In case you use a custom path for socket.io
  // websocket: existingSocketIoInstance,
  spans: [{
    interval: 1,
    retention: 60
  }, {
    interval: 5,
    retention: 60
  }, {
    interval: 15,
    retention: 60
  }],
  chartVisibility: {
    cpu: true,
    mem: true,
    load: true,
    eventLoop: true,
    heap: true,
    responseTime: true,
    rps: true,
    statusCodes: true
  },
  healthChecks: [{
    protocol: 'http',
    host: 'localhost',
    path: '/',
    port: '3000'
  }],
  // ignoreStartsWith: ''
}));


// middleware which blocks requests when server is too busy
app.use(function (req, res, next) {
  if (toobusy()) return res.status(503).json({
    success: false,
    code: 503,
    error: "Server is busy right now, sorry."
  });
  else return next();
});


// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  return res.status(500).json({
    success: false,
    code: 500,
    error: "Internal Server Error."
  });

});


process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at promise ' + promise + ' reason ', reason);
  console.log('Server is still running...\n');
});


// globally catching unhandled exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception is thrown =>', error + '\n');
  process.exit();
});

app.use("/api/v1/", routes);



module.exports = app;