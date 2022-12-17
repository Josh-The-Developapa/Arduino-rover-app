#include <Arduino.h>

const int motorPin2 = 2;
const int motorPin3 = 3;
const int motorPin4 = 4;
const int motorPin5 = 5;

void move(int pin1, int pin2, int s1, int s2, char d)
{
    if (d == 'f')
    {
        digitalWrite(pin1, s1);
        digitalWrite(pin2, s2);
    }
    else
    {
        digitalWrite(pin1, s2);
        digitalWrite(pin2, s1);
    }
}

int main()
{
    // pinMode configuration
    pinMode(13, OUTPUT);
    pinMode(motorPin2, INPUT);
    pinMode(motorPin3, INPUT);
    pinMode(motorPin4, INPUT);
    pinMode(motorPin5, INPUT);

    digitalWrite(13, HIGH);
    move(motorPin2, motorPin3, 1, 0, 'f');
    move(motorPin4, motorPin5, 0, 1, 'f');


    return 0;
}