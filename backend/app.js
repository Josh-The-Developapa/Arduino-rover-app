const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000'
    }
});

const { Board, Motor } = require("johnny-five");

const board = new Board();

board.on("ready", () => {
    const motors = {
        a: new Motor([2, 3]),
        b: new Motor([4, 5])
    }

    io.on('connection', (socket) => {
        console.log('User connected!')

        socket.on('forward', function (speed) {
            motors.a.forward(speed);
            motors.b.forward(speed);
        })

        socket.on('reverse', function (speed) {
            motors.a.reverse(speed);
            motors.b.reverse(speed);
        })

        socket.on('left', function (speed) {
            motors.a.reverse(speed);
            motors.b.forward(speed);
        })

        socket.on('right', function (speed) {
            motors.a.forward(speed);
            motors.b.reverse(speed);
        })

        socket.on('stop', function () {
            motors.a.stop()
            motors.b.stop();
        })

    });
});

const PORT = 8000;

server.listen(PORT, () => {
    console.log(`Listening on port: ${ PORT }`);
});