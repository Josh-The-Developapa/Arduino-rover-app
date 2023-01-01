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
    Serial.begin(9600);       // Start serial communication at 9600 baud
}

void loop() {
    if (Serial.available()) {              // Check if there is data available to read
        String str = Serial.readString();  // Read the data as a string
        if (str == "on") {
            digitalWrite(ledPin, HIGH);  // Turn on LED
        } else if (str == "off") {
            digitalWrite(ledPin, LOW);
        } else if (str == "forward") {
            // move motor1 with pins 2 and 3 forward
            motor1.backward();  // forward motion
            motor2.forward();   // forward motion
        } else if (str == "backward") {
            motor1.forward();
            motor2.backward();
        } else if (str == "left") {
            motor1.backward();
            motor2.backward();
        } else if (str == "right") {
            motor1.forward();
            motor2.forward();
        } else if (str == "stop") {
            motor1.stop();
            motor2.stop();
        }
    }
}