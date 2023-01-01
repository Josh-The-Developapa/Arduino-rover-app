#include <Arduino.h>
#include <L298N.h>
const int ledPin = 13;  // LED is connected to pin 13

int motorPin1 = 2;
int motorPin2 = 3;
int motorPin3 = 4;
int motorPin4 = 5;

L298N motor1(motorPin1, motorPin2);
L298N motor2(motorPin3, motorPin4);

void setup() {
    pinMode(ledPin, OUTPUT);  // Set pin 13 as an output
    Serial.begin(9600);       // Start serial communication at 9600 baud rate
}

void loop() {
    if (Serial.available()) {              // Check if there is data available to read
        String str = Serial.readString();  // Read the data as a string

        if (str == "on") {
            digitalWrite(ledPin, HIGH);  // Turn on LED
        } else if (str == "off") {
            digitalWrite(ledPin, LOW);  // Turn off LED
        } else if (str == "forward") {
            // move motor1 and 2 forward
            motor1.backward();  // forward motion
            motor2.forward();   // forward motion
        } else if (str == "backward") {
            // move motor1 and 2 backward
            motor1.forward();   // backward motion
            motor2.backward();  // backward motion
        } else if (str == "left") {
            // move motor2 backward and motor2 forward. Use motor2 wheel as pivot
            motor1.backward();  // forward motion
            motor2.backward();  // backward motion
        } else if (str == "right") {
            // move motor2 forward and motor2 backward. Use motor1 wheel as pivot
            motor1.forward();  // backward motion
            motor2.forward();  // forward motion
        } else if (str == "stop") {
            // Stop both wheels
            motor1.stop();
            motor2.stop();
        }
    }
}