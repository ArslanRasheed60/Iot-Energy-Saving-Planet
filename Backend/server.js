// Import necessary modules
const express = require("express");
const WebSocket = require("ws");
const mqtt = require("mqtt");
const cors = require("cors");
const crypto = require("crypto");
const { request } = require("http");

// Initialize the Express application
const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS (Cross-Origin Resource Sharing) for all origins
// This should be adjusted for security in production environments
app.use(
  cors({
    origin: "*", // Allow all origins
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
    methods: "*", // Allow all HTTP methods
    allowedHeaders: "*", // Allow all headers
  })
);

// MQTT Broker configuration
// emqx cloud ip
// mqtt://aws.emqxcloud.com
const mqttURL = "";

const mqttOptions = {
  clientId: `node-mqtt-${Math.floor(Math.random() * 1000)}`,
  username: "admin",
  password: "admin",
};

// Buffer to store messages received from MQTT topics
const controlMessages = [];

// Connect to the MQTT broker with the specified options
const client = mqtt.connect(mqttURL, mqttOptions);

function generateRandomId(length) {
  return crypto.randomBytes(length).toString("hex").slice(0, length);
}

const getCurrentTimestamp = () => {
  return Math.floor(Date.now() / 1000);
};

const formatedData = (name, value) => {
  return {
    id: generateRandomId(8),
    name: name,
    date: getCurrentTimestamp(),
    place: "Room",
    value:
      name == "temperature"
        ? `${value}°C`
        : name == "light" || name == "humidity"
        ? `${value}%`
        : name == "motion" && value == true
        ? "Detected"
        : "Not Detected",
  };
};

// MQTT event handlers
client.on("connect", () => console.log("Connected to MQTT Broker!"));
client.on("error", (err) =>
  console.log("Failed to connect to MQTT Broker:", err)
);

// Function to publish messages to specified MQTT topics
function notifySubscribers(topic, message) {
  client.publish(topic, message, (err) => {
    if (!err) {
      console.log(`Sent ${message} to topic ${topic}\n\n`);
    } else {
      console.log(`Failed to send message to topic ${topic}\n`);
    }
  });
}

// Subscribe to a specific topic
client.subscribe("Home/Setting", { qos: 0 });

// Handle incoming MQTT messages
client.on("message", (topic, message) => {
  console.log(`Received '${message}' from '${topic}' topic\n\n`);
  controlMessages.push(message.toString());
});

// Setup a WebSocket server on top of the existing HTTP server
const server = require("http").createServer(app);
const wss = new WebSocket.Server({ server });

// WebSocket connection handler
wss.on("connection", (ws) => {
  console.log("WebSocket client connected");
  let count = 0;
  ws.on("message", (message) => {
    console.log("received from esp: %s", message, " -- ", count, "\n\n");

    let updated_date = [];
    try {
      const data = JSON.parse(message);
      // console.log(data);

      Object.entries(data).forEach(([key, value]) => {
        updated_date.push(formatedData(key, value));
      });
      count = count + 1;
    } catch (e) {
      console.error("Error parsing JSON!", e);
    }
    // let msg = `Someone has breached the ${message.trim()}`;
    notifySubscribers(`Home/Room`, JSON.stringify(updated_date));
  });

  // Function to periodically send control messages to the WebSocket client
  const sendControlMessages = async () => {
    while (true) {
      if (controlMessages.length > 0) {
        ws.send(controlMessages.shift());
      }
      await new Promise((resolve) => setTimeout(resolve, 5000)); // Sleep for 5 seconds
    }
  };

  // Start sending control messages and handle any exceptions
  sendControlMessages().catch((e) => console.log("Exception occurred:", e));
});

// Start the server
server.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
