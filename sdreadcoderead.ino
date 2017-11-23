#include <string.h>
#include <SPI.h>
#include <SD.h>
#include "moveservos.h"
File myFile;

int SSPIN = 4;
int joints = 9;
char delimiters[] = ", ";
int frametime = 0;


char inputString [1000];
char inputChar;
int stringIndex = 0; // String stringIndexing int;
bool INITITALIZED = false;  
bool FILEISREAD = false;
bool PRINTSERIAL = true;
void setup()
{
  setupServos();
  Serial.begin(115200);
  while (!Serial) {
    ;
  }
  
  Serial.print("Initializing SD card...");

  if (!SD.begin(SSPIN)) {
    Serial.println("initialization failed!");
    return;
  }
  Serial.println("initialization done.");
  INITITALIZED = true;
  
  //char instring[] = "xH 16.3 yH 5.5 zH 40.5 J 30.3";
}
  


void loop()
{
  
  if(!INITITALIZED)
  {
    Serial.print("Initializing SD card...");
  
    if (!SD.begin()) {
      Serial.println("initialization failed!");
      return;
    }
    Serial.println("initialization done.");
    INITITALIZED = true;
  }
  if(INITITALIZED && !FILEISREAD)
  {
    readSD();
  }
  
}
void readSD ()
{
  myFile = SD.open("test.R3D");
  if (myFile) {
    Serial.println("test.R3D:");

    // read from the file until there's nothing else in it:
    while (myFile.available()) {
      //readCode(myFile.read());
      inputChar = myFile.read();
      if (inputChar != 'f') // define breaking char here (\n isnt working for some reason, i will follow this up later)
      {
        inputString[stringIndex] = inputChar; // Store it
        stringIndex++; // Increment where to write next
      }
      else
      {
        delay(28);
        stringIndex = 0;
        readCode(inputString);
        //Serial.println(inputString);
        for( int i = 0; i < sizeof(inputString);  ++i )
          {inputString[i] = (char)0;}
        
      }
      
      
    }
    
    
      FILEISREAD = true;
    // close the file:
    myFile.close();
    endRoutine();
  } else {
    // if the file didn't open, print an error:
    Serial.println("error opening test.txt");
  }
}
void readCode (char instring[])
{
  float passThis;
  char* valPosition;
  
  //This initializes strtok with our string to tokenize
  valPosition = strtok(instring, delimiters);
  
 
  
  if(valPosition != NULL){
    for(int i=0; i < joints; i++)
    {
      if(i == 0)
        {
            if(PRINTSERIAL)Serial.print("LEAVE THIS OUT: ");
        }
      if(i == 1)
        {
            if(PRINTSERIAL)Serial.print(" SERVO 1: ");
            passThis = atof(valPosition);
            moveServo1(passThis);
        }
      if(i == 2)
        {
            if(PRINTSERIAL)Serial.print(" SERVO 2: ");
            passThis = atof(valPosition);
            moveServo2(passThis);
        }
      if(i == 3)
        {
            if(PRINTSERIAL)Serial.print(" SERVO 3: ");
            passThis = atof(valPosition);
            moveServo3(passThis);
        }
        if(i == 4)
        {
            if(PRINTSERIAL)Serial.print(" SERVO 4: ");
            passThis = atof(valPosition);
            moveServo4(passThis);
        }
        if(i == 5)
        {
            if(PRINTSERIAL)Serial.print(" SERVO 5: ");
            passThis = atof(valPosition);
            moveServo5(passThis);
        }
        if(i == 6)
        {
            if(PRINTSERIAL)Serial.print(" SERVO 6: ");
            passThis = atof(valPosition);
            moveServo6(passThis);
        }
        if(i == 7)
        {
            if(PRINTSERIAL)Serial.print(" SERVO 7: ");
            passThis = atof(valPosition);
            moveServo7(passThis);
        }
        if(i == 8)
        {
            if(PRINTSERIAL)Serial.print(" SERVO 8: ");
            passThis = atof(valPosition);
            moveServo8(passThis);
        }
      if(PRINTSERIAL)Serial.print(valPosition);    
      //Here we pass in a NULL value, which tells strtok to continue working with the previous string
      valPosition = strtok(NULL, delimiters);     
      }
      
    }
    if(PRINTSERIAL)Serial.println(" ");
    //Serial.println("Delay:");
    //Serial.println(frametime);
    //delay(frametime);
}

