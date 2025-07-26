String command;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  pinMode(2, OUTPUT);
}

void loop() {
  // put your main code here, to run repeatedly:
  digitalWrite(2, HIGH);
  if(Serial.available()){
    command = Serial.readStringUntil('\n');
    command.trim();
    if(command.equals("ON")){
      digitalWrite(2, HIGH);
    }else if(command.equals("OFF")){
      digitalWrite(2, LOW);
    }else{
      Serial.println("ERROR");
    }
  }
}
