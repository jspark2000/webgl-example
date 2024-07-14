import json
import socketio
import asyncio
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import paho.mqtt.client as mqtt
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

MQTT_BROKER = "121.167.176.201"
MQTT_PORT = 18810
MQTT_TOPIC = "tcp/example"


def consume_and_emit():
    mqtt_client = mqtt.Client()

    def on_message(client, userdata, msg):
        message = msg.payload.decode()
        print(f"Consumed: {message}")
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        loop.run_until_complete(sio.emit("message", json.loads(message)))
        loop.close()

    mqtt_client.on_message = on_message

    mqtt_client.connect(MQTT_BROKER, MQTT_PORT, 60)
    mqtt_client.subscribe(MQTT_TOPIC)

    mqtt_client.loop_forever()


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
