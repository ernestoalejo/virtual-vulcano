#!/bin/bash

docker build -t virtualvulcano/web web
docker push virtualvulcano/web
