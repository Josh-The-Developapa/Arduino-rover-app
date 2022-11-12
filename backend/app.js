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

//Import the Board, Motor, Led and Proximity classes from johnny-five library
const { Board, Motor, Led } = require("johnny-five");

//Create a new board instance
const board = new Board(
    // port: '/dev/tty.usbmodem1201'
);

//Wait for board to finish setting up
board.on("ready", () => {
    //Create instances for the two motors (a and b) and store them in an object
    const motors = {
        //Motor 'a' created using Motor class that takes in a numbers array of the pins its been connected to (2 and 3).
        a: new Motor([2, 3]),
        //Motor 'b' created using Motor class that takes in a numbers array of the pins its been connected to (4 and 5).
        b: new Motor([4, 5])
    }

    //Create a new instance for in built Arduino-Uno LED light on pin 13
    const led = new Led(13)

    //Start listening for a connection event using socket.io bi-directional communication protocol.
    io.on('connection', (socket) => {
        //Log to the console when a user has connected
        console.log('User connected!')

        socket.on('turn-on', function () {
            led.on()
        })

        socket.on('turn-off', function () {
            led.off()
        })

        //Listen for when 'forward' event is fired 
        socket.on('forward', function (speed) {
            //Rotate both motors clockwise at speed in the payload sent with event
            motors.a.forward(speed);
            motors.b.forward(speed);
        })

        //Listen for when 'reverse' event is fired 
        socket.on('reverse', function (speed) {
            //Rotate both motors anti-clockwise at speed in the payload sent with event
            motors.a.reverse(speed);
            motors.b.reverse(speed);
        })

        //Listen for when 'left' event is fired
        socket.on('left', function (speed) {
            //Rotate motor 'a' anti-clockwise at speed in the payload sent with event
            motors.a.reverse(speed);
            //Rotate motor 'b' clockwise at speed in the payload sent with event
            motors.b.forward(speed);
        })

        //Listen for when 'right' event is fired
        socket.on('right', function (speed) {
            //Rotate motor 'a' clockwise at speed in the payload sent with event
            motors.a.forward(speed);
            //Rotate motor 'b' anti-clockwise at speed in the payload sent with event
            motors.b.reverse(speed);
        })

        //Listen for when 'stop' event is fired
        socket.on('stop', function () {
            //Stop motion for both motors
            motors.a.reverse()
            motors.b.reverse();
        })

    });
});

const PORT = 8000;

//Start the server listening on port: 8000 stored in 'PORT' variable
server.listen(PORT, () => {
    console.log(`Listening on port: ${ PORT }`);
});