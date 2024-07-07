import json
import socketio
import asyncio
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from confluent_kafka import Consumer, KafkaException
from threading import Thread

app = FastAPI()

sio = socketio.AsyncServer(cors_allowed_origins="*", async_mode="asgi")
socket_app = socketio.ASGIApp(sio, other_asgi_app=app)

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

KAFKA_BROKER = "localhost:9092"
KAFKA_TOPIC = "random_points"
KAFKA_GROUP = "fastapi-consumer-group"


def consume_and_emit():
    consumer = Consumer(
        {
            "bootstrap.servers": KAFKA_BROKER,
            "group.id": KAFKA_GROUP,
            "auto.offset.reset": "earliest",
        }
    )
    consumer.subscribe([KAFKA_TOPIC])

    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)

    while True:
        msg = consumer.poll(1.0)
        if msg is None:
            continue
        if msg.error():
            if msg.error().code() == KafkaException._PARTITION_EOF:
                continue
            else:
                print(msg.error())
                break
        message = json.loads(msg.value().decode("utf-8"))
        print(f"Consumed: {message}")
        loop.run_until_complete(sio.emit("message", message))
    consumer.close()


@app.on_event("startup")
async def startup_event():
    consumer_thread = Thread(target=consume_and_emit)
    consumer_thread.start()


@sio.on("connect")
async def connect(sid, environ):
    print("New Client Connected to This id: " + str(sid))


@sio.on("disconnect")
async def disconnect(sid):
    print("Client Disconnected: " + str(sid))


@app.get("/")
def read_root():
    return {"Hello": "World"}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(socket_app, host="0.0.0.0", port=8002)
