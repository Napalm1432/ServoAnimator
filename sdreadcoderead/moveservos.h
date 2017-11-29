#include "servopins.h"

bool PRINTSERIALSERVOS = false;
void moveServo1(int val)
{
  if (PRINTSERIALSERVOS)Serial.print("SERVO 1: ");
  if (PRINTSERIALSERVOS)Serial.println(val);
  servo1.write(val);
}
void moveServo2(int val)
{
  if (PRINTSERIALSERVOS)Serial.print("SERVO 2: ");
  if (PRINTSERIALSERVOS)Serial.println(val);
  servo2.write(val);
}
void moveServo3(int val)
{
  if (PRINTSERIALSERVOS)Serial.print("SERVO 3: ");
  if (PRINTSERIALSERVOS)Serial.println(val);
  servo3.write(val);
}
void moveServo4(int val)
{
  if (PRINTSERIALSERVOS)Serial.print("SERVO 4: ");
  if (PRINTSERIALSERVOS)Serial.println(val);
  servo4.write(val);
}
void moveServo5(int val)
{
  if (PRINTSERIALSERVOS)Serial.print("SERVO 5: ");
  if (PRINTSERIALSERVOS)Serial.println(val);
  servo5.write(val);
}
void moveServo6(int val)
{
  if (PRINTSERIALSERVOS)Serial.print("SERVO 6: ");
  if (PRINTSERIALSERVOS)Serial.println(val);
  servo6.write(val);
}
void moveServo7(int val)
{
  if (PRINTSERIALSERVOS)Serial.print("SERVO 7: ");
  if (PRINTSERIALSERVOS)Serial.println(val);
  servo7.write(val);
}
void moveServo8(int val)
{
  if (PRINTSERIALSERVOS)Serial.print("SERVO 8: ");
  if (PRINTSERIALSERVOS)Serial.println(val);
  servo8.write(val);
}
