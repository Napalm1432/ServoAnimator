#include <Servo.h>

#define offset1 = 0;
#define offset2 = 0;
#define offset3 = 0;
#define offset4 = 0;
#define offset5 = 0;
#define offset6 = 0;
#define offset7 = 0;
#define offset8 = 0;

Servo servo1;
Servo servo2;
Servo servo3;
Servo servo4;
Servo servo5;
Servo servo6;
Servo servo7;
Servo servo8;

void setupServos()
{
  //ATTACH TO DIGITAL PINS:
  servo1.attach(22);
  servo2.attach(37);
  servo3.attach(25);
  servo4.attach(29);
  servo5.attach(33);
  servo6.attach(41);
  servo7.attach(45);
  servo8.attach(2);
}
void endRoutine()
{
  servo1.attach(NULL);
  servo2.attach(NULL);
  servo3.attach(NULL);
  servo4.attach(NULL);
  servo5.attach(NULL);
  servo6.attach(NULL);
  servo7.attach(NULL);
  servo8.attach(NULL);
}

