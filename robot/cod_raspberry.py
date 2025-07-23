import serial
import time
import firebase_admin
from firebase_admin import credentials, db

cred = credentials.Certificate("/home/pi/Desktop/cod_proiect/private_key.json")
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://pet-grabber-default-rtdb.europe-west1.firebasedatabase.app/'
})

ser = serial.Serial('/dev/ttyACM0', 9600, timeout=2)
ser.flush()


def stream_handler(event):
    key_changed = event.path.strip("/").strip()

    if isinstance(event.data, dict):
        print(f"Root dict updated, keys: {list(event.data.keys())}")
        for k, v in event.data.items():
            print(f"Sending {k} -> {v}")
            ser.write((k + "\n").encode('utf-8'))
            ser.write((str(v) + "\n").encode('utf-8'))
        return

    new_value = str(event.data).strip()

    if key_changed and new_value:

        if key_changed in ["brat", "umar", "cleste"]:
            ser.write((key_changed + "\n").encode('utf-8'))
            ser.write((new_value + "\n").encode('utf-8'))
        else:
            ser.write((new_value + "\n").encode('utf-8'))

        while ser.in_waiting > 0:
            print("Arduino:", ser.readline().decode('utf-8').strip())


db.reference('commands').listen(stream_handler)

print("Listening for Firebase changes...")
while True:
    time.sleep(0.01)
import serial
import time
import firebase_admin
from firebase_admin import credentials, db

cred = credentials.Certificate("/home/pi/Desktop/cod_proiect/private_key.json")
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://pet-grabber-default-rtdb.europe-west1.firebasedatabase.app/'
})

ser = serial.Serial('/dev/ttyACM0', 9600, timeout=2)
ser.flush()


def stream_handler(event):
    key_changed = event.path.strip("/").strip()

    if isinstance(event.data, dict):
        print(f"Root dict updated, keys: {list(event.data.keys())}")
        for k, v in event.data.items():
            print(f"Sending {k} -> {v}")
            ser.write((k + "\n").encode('utf-8'))
            ser.write((str(v) + "\n").encode('utf-8'))
        return

    new_value = str(event.data).strip()

    if key_changed and new_value:

        if key_changed in ["brat", "umar", "cleste"]:
            ser.write((key_changed + "\n").encode('utf-8'))
            ser.write((new_value + "\n").encode('utf-8'))
        else:
            ser.write((new_value + "\n").encode('utf-8'))

        while ser.in_waiting > 0:
            print("Arduino:", ser.readline().decode('utf-8').strip())


db.reference('commands').listen(stream_handler)

print("Listening for Firebase changes...")
while True:
    time.sleep(0.01)
