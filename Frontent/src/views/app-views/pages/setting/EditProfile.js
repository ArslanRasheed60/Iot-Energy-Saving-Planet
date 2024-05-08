import React, { useState } from "react";
import { Button, Slider } from "antd";
import { client, publishMessage } from "../../../../mqttService";

const EditProfile = () => {
  const [temperature, setTemperature] = useState(30);
  const [light, setLight] = useState(30);

  const handleSend = () => {
    console.log("send");
    const message = `{"temperature" : ${temperature}, "light" : ${light}}`;
    console.log(message);
    const topic = "Home/Setting";
    publishMessage(topic, message);
  };

  const onTemperatureChange = (value) => {
    setTemperature(value);
  };

  const onLightChange = (value) => {
    setLight(value);
  };

  return (
    <>
      <div>
        <h4>Temperature Thresholding</h4>
        <Slider
          className="w-100"
          defaultValue={30}
          onChange={onTemperatureChange}
        />
      </div>
      <div>
        <h4>Light Thresholding</h4>
        <Slider className="w-100" defaultValue={30} onChange={onLightChange} />
      </div>
      <div className="mt-4">
        <Button type="primary" onClick={handleSend}>
          Save Changes
        </Button>
      </div>
    </>
  );
};

export default EditProfile;
