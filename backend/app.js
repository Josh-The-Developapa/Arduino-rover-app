import express from 'express';
const app = express();
import { createServer } from 'http';
const server = createServer(app);
import { Server } from "socket.io";
import { SerialPort } from "serialport";

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000'
    }
});


const port = new SerialPort({
    baudRate: 9600,
    path: "/dev/cu.usbmodem1101"
});

port.on('open', function () {
    console.log("Port open");
    port.on('data', (data) => {
        console.log("data: ", data);
    });
});

//Start listening for a connection event using socket.io bi-directional communication protocol.
io.on('connection', (socket) => {
    //Log to the console when a user has connected
    console.log('User connected!');

    socket.on('turn-on', function () {
        port.write('on', (err) => {
            if (err) console.log(err);
        });
        // port.close();
    });

    socket.on('turn-off', function () {
        port.write('off', (err) => {
            if (err) console.log(err);
        });
    });

    //Listen for when 'forward' event is fired 
    socket.on('forward', function (speed) {
        port.write('forward', (err) => {
            if (err) console.log(err);
        });
    });

    // //Listen for when 'reverse' event is fired 
    socket.on('reverse', function (speed) {
        port.write('backward', (err) => {
            if (err) console.log(err);
        });
    });

    // //Listen for when 'left' event is fired
    socket.on('left', function (speed) {
        port.write('left', (err) => {
            if (err) console.log(err);
        });
    });

    // //Listen for when 'right' event is fired
    socket.on('right', function (speed) {
        port.write('right', (err) => {
            if (err) console.log(err);
        });
    });

    // //Listen for when 'stop' event is fired
    socket.on('stop', function () {
        port.write('stop', (err) => {
            if (err) console.log(err);
        });
    });

});

const PORT = 8000;

//Start the server listening on port: 8000 stored in 'PORT' variable
server.listen(PORT, () => {
    console.log(`Listening on port: ${ PORT }`);
});