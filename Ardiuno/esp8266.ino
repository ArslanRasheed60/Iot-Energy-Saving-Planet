#include <ESP8266WiFi.h>
#include <ArduinoWebsockets.h>

const char* ssid = "OnePlus 6"; // Replace with your WiFi network name
const char* password = "123456789"; // Replace with your WiFi password

const char* websocket_server = "ws://192.168.255.26:3000"; // Replace with your WebSocket server URL

using namespace websockets;

WebsocketsClient client;

void onMessageCallback(WebsocketsMessage message) {
  // Serial.print("Got Message: ");
  Serial.println(message.data());
}

void onEventsCallback(WebsocketsEvent event, String data) {
  if(event == WebsocketsEvent::ConnectionOpened) {
    Serial.println("Connnection Opened");
  } else if(event == WebsocketsEvent::ConnectionClosed) {
    Serial.println("Connnection Closed");
  } else if(event == WebsocketsEvent::GotPing) {
    Serial.println("Got a Ping!");
  } else if(event == WebsocketsEvent::GotPong) {
    Serial.println("Got a Pong!");
  }
}

void setup() {
  Serial.begin(115200);

  // Connect to wifi
  WiFi.begin(ssid, password);

  // Wait for connection
  Serial.println("Connecting to WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print(".");
  }

  // Connected to WiFi
  Serial.println();
  Serial.println("Connected");

  // Setup Callbacks
  client.onMessage(onMessageCallback);
  client.onEvent(onEventsCallback);

  // Connect to server
  client.connect(websocket_server);
}

void loop() {
  
   client.poll();

  if (Serial.available()) {
    String payload = Serial.readStringUntil('\n');
    payload.trim();  // Remove any non-printable characters

    if (!payload.isEmpty() && client.available()) {
      client.send(payload);  // Send data as a string
      // Serial.println("Sent: " + payload);  // Debug what is sent
    }
  }
  // String payload = "{\"temperature\":34.20,\"humidity\":39.00,\"light\":43.01,\"motion\":false}";
  // payload.trim();  // Remove any non-printable characters

  // if (!payload.isEmpty() && client.available()) {
  //   client.send(payload);  // Send data as a string
  //   Serial.println("Sent: " + payload);  // Debug what is sent
  // }
  // delay(5000);
}
