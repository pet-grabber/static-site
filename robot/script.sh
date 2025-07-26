#!/bin/bash

#Asteptam sa-si updateze timpul ca sa nu dea fail JWT (eroare daca PI-ul nu a fost pornit in ultima ora)
#Vom rezolva in intr-o buna zi cu soare

while [ "$(date +%Y)" -lt 2025 ]; do
  echo "Waiting for system time to sync..."
  sleep 1
done

source /home/pi/Desktop/venvs/robotNOAI/bin/activate
python /home/pi/Desktop/stream/stream.py > /home/pi/Desktop/text.txt 2>&1 &
python /home/pi/Desktop/cod_proiect/cod.py > /home/pi/Desktop/text.txt 2>&1 &
