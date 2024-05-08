// src/MQTTService.js
import mqtt from "mqtt";
// wss://[domain]:[port]/mqtt
const MQTT_URL = ""; // Replace with your actual URL and port
const options = {
  connectTimeout: 4000,
  clientId: `mqtt_${Math.random().toString(16).substr(2, 8)}`,
  keepalive: 60,
  clean: true,
  username: "admin", // Replace with actual username
  password: "admin", // Replace with actual password
  reconnectPeriod: 1000,
};

export const client = mqtt.connect(MQTT_URL, options);

client.on("connect", () => console.log("Connected to EMQ X Cloud via MQTT!"));
client.on("error", (err) => console.log("Connection error:", err));
client.on("reconnect", () => console.log("Reconnecting..."));

export const subscribeToTopic = (topic, onMessageReceived) => {
  client.subscribe(topic, { qos: 0 }, (error) => {
    if (error) {
      console.log("Subscription error:", error);
      return;
    }
    console.log(`Subscribed to ${topic}`);
  });

  client.on("message", (receivedTopic, message) => {
    if (receivedTopic === topic) {
      onMessageReceived(message.toString());
    }
  });
};

export const publishMessage = (topic, message) => {
  client.publish(topic, message, { qos: 0 }, (error) => {
    if (error) {
      console.log("Failed to publish message:", error);
    } else {
      console.log(`Message published to ${topic}`);
    }
  });
};
