// Define Module Dependencies
const mongoose = require('mongoose');
const http = require('http');

// Define Config Dependencies
const app = require('./config/app');
const configDB = require('./config/db');

// Define project constants
const db = configDB();
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

// Create HTTP Server
const server = http.createServer(app);

// Listen on Port
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

// Normalize Port into Number, String or False
function normalizePort(val) {
    var port = parseInt(val, 10);
    if (isNaN(port)) { return val; }
    if (port >= 0) { return port; }
    return false;
}

//HTTP 'error' Event Listener
function onError(error) {
    if (error.syscall !== 'listen') { throw error; }
    var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated priveleges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default: throw error;
    }
}

// HTTP 'listening' Server Event Listener
function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    console.log('App is listening on port: ' + port);
}