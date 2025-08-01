#include <Wire.h>
#include <Adafruit_PWMServoDriver.h>

Adafruit_PWMServoDriver PCA9865 = Adafruit_PWMServoDriver();

#define fENA 5//speed fA
#define fENB 3//speed fB
#define fIN1 2
#define fIN2 4
#define fIN3 7
#define fIN4 8

#define rENA 6//speed rA
#define rENB 9//speed rB
#define rIN1 10
#define rIN2 11
#define rIN3 12
#define rIN4 13

//f de la front wheels si r de la rear wheels
String command;
int speed = 255;
int gbrat = 90;
int gumar = 90;
  byte cleste = 2;
  byte brat = 0;
  byte umar = 1;

void setServotoAngleSmooth(byte servo, int toAngle, int lastAngle);
void setServotoAngle(byte servo, int angle);
void forward(int speed);
void backward(int speed);
void forward_right(int speed);
void forward_left(int speed);
void backward_right(int speed);
void backward_left(int speed);
void stop();

void setup() {
  Serial.begin(9600);
  
  pinMode(fENA, OUTPUT);
  pinMode(fENB, OUTPUT);
  pinMode(fIN1, OUTPUT);
  pinMode(fIN2, OUTPUT);
  pinMode(fIN3, OUTPUT);
  pinMode(fIN4, OUTPUT);
  
  pinMode(rENA, OUTPUT);
  pinMode(rENB, OUTPUT);
  pinMode(rIN1, OUTPUT);
  pinMode(rIN2, OUTPUT);
  pinMode(rIN3, OUTPUT);
  pinMode(rIN4, OUTPUT);

  PCA9865.begin();
  PCA9865.setPWMFreq(60);

  setServotoAngle(cleste, 0);
  setServotoAngle(brat, gbrat);
  setServotoAngle(umar, gumar);
}

void loop() {
  //IN1 = LoW, IN2 = HIGH && IN3 = LOW, IN4= HIGH => forward drive
  //invers => marche arrier

  if(Serial.available()){
    command = Serial.readStringUntil('\n');
    command.trim();
    if(command.equals("forward")){
      forward(speed);
    }else if(command.equals("backward")){
      backward(speed);
    }else if(command.equals("forward_right")){
      forward_right(speed);
    }else if(command.equals("backward_right")){
      backward_right(speed);
    }else if(command.equals("forward_left")){
      forward_left(speed);
    }else if(command.equals("backward_left")){
      backward_left(speed);
    }else if(command.equals("stop")){
      stop();
    }else if(command.equals("cleste")){
      String w = Serial.readStringUntil('\n');
      w.trim();
      if(w == "True"){
        setServotoAngle(cleste, 180);
      }else if(w == "False"){
        setServotoAngle(cleste, 0);
      }
    }else if(command.equals("brat")){
      String x = Serial.readStringUntil('\n');
      x.trim();
      if (x.length() == 0) {
        //Serial.println("ERROR: No angle given for brat");
      }else{
        int lastgbrat = gbrat;
        gbrat = x.toInt();
        /*int step = (gbrat > lastgbrat) ? 1 : -1;
        for (int i = lastgbrat; i != gbrat; i += step) {
          setServotoAngle(brat, i);
          delay(10);
        }*/
        setServotoAngleSmooth(brat, gbrat, lastgbrat);
      }
    }else if(command.equals("umar")){
      String y = Serial.readStringUntil('\n');
      y.trim();
      if (y.length() == 0) {
        //Serial.println("ERROR: No angle given for umar");
      }else{
        int lastgumar = gumar;
        gumar = y.toInt();
        /*int step = (gumar >lastgumar) ? 1 : -1;
        for (int i= lastgumar; i!= gumar; i+= step){
          setServotoAngle(umar, i);
          delay(10);
        }*/
        setServotoAngleSmooth(umar, gumar, lastgumar);
      }
    }else{
      //Serial.println("ERROR: Command not found -> ");
      //Serial.println(command);
    }
  }
  
}

void forward(int speed){
  analogWrite(fENA, speed);
  analogWrite(fENB, speed);
  digitalWrite(fIN1, LOW);
  digitalWrite(fIN2, HIGH);
  digitalWrite(fIN3, LOW);
  digitalWrite(fIN4, HIGH);

  analogWrite(rENA, speed);
  analogWrite(rENB, speed);
  digitalWrite(rIN1, LOW);
  digitalWrite(rIN2, HIGH);
  digitalWrite(rIN3, LOW);
  digitalWrite(rIN4, HIGH);
}

void backward(int speed){
  analogWrite(fENA, speed);
  analogWrite(fENB, speed);
  digitalWrite(fIN1, HIGH);
  digitalWrite(fIN2, LOW);
  digitalWrite(fIN3, HIGH);
  digitalWrite(fIN4, LOW);

  analogWrite(rENA, speed);
  analogWrite(rENB, speed);
  digitalWrite(rIN1, HIGH);
  digitalWrite(rIN2, LOW);
  digitalWrite(rIN3, HIGH);
  digitalWrite(rIN4, LOW);
}

void forward_left(int speed){
  analogWrite(fENA, speed);
  analogWrite(fENB, 0);
  digitalWrite(fIN1, LOW);
  digitalWrite(fIN2, HIGH);
  digitalWrite(fIN3, LOW);
  digitalWrite(fIN4, LOW); // stop left motor

  analogWrite(rENA, speed);
  analogWrite(rENB, 0);
  digitalWrite(rIN1, LOW);
  digitalWrite(rIN2, HIGH);
  digitalWrite(rIN3, LOW);
  digitalWrite(rIN4, LOW); // stop left motor
}

void forward_right(int speed){
  analogWrite(fENA, 0);
  analogWrite(fENB, speed);
  digitalWrite(fIN1, LOW);
  digitalWrite(fIN2, LOW);
  digitalWrite(fIN3, LOW);
  digitalWrite(fIN4, HIGH);

  analogWrite(rENA, 0);
  analogWrite(rENB, speed);
  digitalWrite(rIN1, LOW);
  digitalWrite(rIN2, LOW);
  digitalWrite(rIN3, LOW);
  digitalWrite(rIN4, HIGH);
}

void backward_left(int speed){
  analogWrite(fENA, speed);
  analogWrite(fENB, 0);
  digitalWrite(fIN1, HIGH);
  digitalWrite(fIN2, LOW);
  digitalWrite(fIN3, LOW);
  digitalWrite(fIN4, LOW);

  analogWrite(rENA, speed);
  analogWrite(rENB, 0);
  digitalWrite(rIN1, HIGH);
  digitalWrite(rIN2, LOW);
  digitalWrite(rIN3, LOW);
  digitalWrite(rIN4, LOW);

}

void backward_right(int speed){
  analogWrite(fENA, 0);
  analogWrite(fENB, speed);
  digitalWrite(fIN1, LOW);
  digitalWrite(fIN2, LOW);
  digitalWrite(fIN3, HIGH);
  digitalWrite(fIN4, LOW);

  analogWrite(rENA, 0);
  analogWrite(rENB, speed);
  digitalWrite(rIN1, LOW);
  digitalWrite(rIN2, LOW);
  digitalWrite(rIN3, HIGH);
  digitalWrite(rIN4, LOW);
}

void stop(){
  analogWrite(fENA, 0);
  analogWrite(fENB, 0);
  analogWrite(rENA, 0);
  analogWrite(rENB, 0);

  digitalWrite(fIN1, LOW);
  digitalWrite(fIN2, LOW);
  digitalWrite(fIN3, LOW);
  digitalWrite(fIN4, LOW);
  digitalWrite(rIN1, LOW);
  digitalWrite(rIN2, LOW);
  digitalWrite(rIN3, LOW);
  digitalWrite(rIN4, LOW);
}

void setServotoAngleSmooth(byte servo, int toAngle, int lastAngle) {
  int steps = abs(toAngle - lastAngle);
  if (steps == 0) return;

  float t = 0.0;
  float dt = 1.0 / steps;

  for (int i = 0; i <= steps; i++) {
    // easing-out cubic y = 1 - pow(1-t, 3)
    float eased = 1 - pow(1 - t, 3);
    int currentAngle = lastAngle + (toAngle - lastAngle) * eased;

    int pwmpulse = map(currentAngle, 0, 180, 150, 600); //servomin si servomax
    PCA9865.setPWM(servo, 0, pwmpulse);

    delay(5); // mai rapid sau mai lent
    t += dt;
  }
}

void setServotoAngle(byte servo, int angle){
  int pwmpulse = map(angle, 0, 180, 150, 600); //servomin si servomax daca nu sunt puse bine byebye servo o7
  PCA9865.setPWM(servo, 0, pwmpulse);
}
