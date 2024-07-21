from fastapi import FastAPI
import paho.mqtt.client as mqtt
import time
import threading
import random
import json


MQTT_BROKER = "121.167.176.201"
MQTT_PORT = 18810
MQTT_TOPIC = "tcp/example"

mqtt_client = mqtt.Client()
mqtt_client.connect(MQTT_BROKER, MQTT_PORT, 60)

app = FastAPI()


def generate_random_coordinates():
    return {
        "x": random.uniform(-10, 10),
        "y": random.uniform(-10, 10),
        "z": random.uniform(-10, 10),
        "rx": random.uniform(-180, 180),
        "ry": random.uniform(-180, 180),
        "rz": random.uniform(-180, 180),
    }


def publish_message_continuously():
    while True:
        payload = generate_random_coordinates()
        payload_json = json.dumps(payload)
        mqtt_client.publish(MQTT_TOPIC, payload_json)
        print(payload)
        time.sleep(1)


@app.on_event("startup")
def start_background_task():
    threading.Thread(target=publish_message_continuously, daemon=True).start()


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
