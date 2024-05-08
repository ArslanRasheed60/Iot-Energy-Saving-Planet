#include "DHT.h"
#include <ArduinoJson.h>

#define DHTPIN 2     // Digital pin connected to the DHT sensor
#define DHTTYPE DHT11   // DHT 11

int calibrationTime = 30; 
long unsigned int lowIn;
long unsigned int pause = 5000;
boolean lockLow = true;
boolean takeLowTime;

int pirPin = 3;    // Digital pin connected to the PIR sensor's output
int ledPin = 4;    // Digital pin connected to an LED
int tempLedPin = 6; // Digital pin connected to the temperature LED

int ldrPin = A0;   // Analog pin connected to the LDR and 10k ohm resistor junction

DHT dht(DHTPIN, DHTTYPE);

int temperature_threshold = 33.5;
int light_threshold = 30;

void setup() {
  Serial.begin(115200);
  // Serial.println("DHT11 sensor test!");
  
  dht.begin();

  pinMode(pirPin, INPUT);
  pinMode(ledPin, OUTPUT);
  pinMode(tempLedPin, OUTPUT);  // Initialize the temperature LED pin as an output
  pinMode(ldrPin, INPUT);
  digitalWrite(pirPin, LOW);

  Serial.print("calibrating sensor ");
  for(int i = 0; i < calibrationTime; i++){
    Serial.print(".");
    delay(1000);
  }
  Serial.println(" done");
  Serial.println("SENSOR ACTIVE");
  delay(50);

  pinMode(5, OUTPUT);
}

void loop() {

  if (Serial.available()) {
    String payload = Serial.readStringUntil('\n');
    payload.trim();  // Remove any non-printable characters

    if (payload.length() > 0) {
      StaticJsonDocument<200> doc; // Increase size if your JSON is larger
      DeserializationError error = deserializeJson(doc, payload);

      if (error) {
        // Serial.print("deserializeJson() failed: ");
        // Serial.println(error.c_str());
        return;
      }

      // Extract values
      // Use is<int>() to check if the value can be treated as int
      if (doc["temperature"].is<int>()) {
        temperature_threshold = doc["temperature"];
      }

      if (doc["light"].is<int>()) {
        light_threshold = doc["light"];
      }

      // Debugging output to the Serial Monitor
      // Serial.print("Temperature Threshold: ");
      // Serial.println(temperature_threshold);
      // Serial.print("Light Threshold: ");
      // Serial.println(light_threshold);
    }
  }

  float humidity = dht.readHumidity();
  float temperature = dht.readTemperature();
  if (isnan(humidity) || isnan(temperature)) {
    // Serial.println("Failed to read from DHT sensor!");
    return;
  }

  // Serial.print("Humidity: ");
  // Serial.print(humidity);
  // Serial.print(" %\t");
  // Serial.print("Temperature: ");
  // Serial.print(temperature);
  // Serial.println(" *C");

  int lightLevel = analogRead(ldrPin); // Read the light level
  float lightPercentage = (lightLevel / 1023.0) * 100; // Convert to percentage
  // Serial.print("Light Level: ");
  // Serial.print(lightPercentage);
  // Serial.println(" %");
  if (lightPercentage < light_threshold) {
    digitalWrite(5, HIGH);  // Turn on LED if dark
  } else {
    digitalWrite(5, LOW);   // Turn off LED if light
  }

  if(temperature > temperature_threshold) {
    digitalWrite(tempLedPin, HIGH); // Turn on temperature LED if above 33°C
  } else {
    digitalWrite(tempLedPin, LOW); // Turn off temperature LED if 33°C or below
  }

  bool motionDetected = digitalRead(pirPin) == HIGH;

  if(digitalRead(pirPin) == HIGH){
    digitalWrite(ledPin, HIGH);
    if(lockLow){
      lockLow = false;
      // Serial.println("---");
      // Serial.print("motion detected at ");
      // Serial.print(millis()/1000);
      // Serial.println(" sec");
      delay(50);
    }
    takeLowTime = true;
  }

  if(digitalRead(pirPin) == LOW){
    digitalWrite(ledPin, LOW);
    if(takeLowTime){
      lowIn = millis();
      takeLowTime = false;
    }
    if(!lockLow && millis() - lowIn > pause){
      lockLow = true;
      // Serial.print("motion ended at ");
      // Serial.print((millis() - pause)/1000);
      // Serial.println(" sec");
      delay(50);
    }
  }

  // Send data in JSON format
  Serial.println("{\"temperature\":" + String(temperature) + ",\"humidity\":" + String(humidity) + ",\"light\":" + String(lightPercentage) + ",\"motion\":" + (motionDetected ? "true" : "false") + "}");
  delay(3000);
}
