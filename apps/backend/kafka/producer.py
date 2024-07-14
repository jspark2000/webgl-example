import json
import random
import time
from fastapi import FastAPI
from confluent_kafka import Producer
from threading import Thread

app = FastAPI()

KAFKA_BROKER = "localhost:9092"
KAFKA_TOPIC = "random_points"

producer = Producer({"bootstrap.servers": KAFKA_BROKER})


def delivery_report(err, msg):
    if err is not None:
        print("Message delivery failed: {}".format(err))
    else:
        print("Message delivered to {} [{}]".format(msg.topic(), msg.partition()))


def publish_random_point():
    while True:
        point = {
            "x": random.uniform(-5, 5),
            "y": random.uniform(-5, 5),
            "z": random.uniform(-5, 5),
        }
        producer.produce(
            KAFKA_TOPIC, key="key", value=json.dumps(point), callback=delivery_report
        )
        producer.poll(1)
        print(f"Published: {point}")
        time.sleep(1)


@app.on_event("startup")
async def startup_event():
    thread = Thread(target=publish_random_point)
    thread.start()


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8001)
