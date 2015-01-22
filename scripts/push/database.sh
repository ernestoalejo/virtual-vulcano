#!/bin/bash

docker build -t virtualvulcano/database database
docker push virtualvulcano/database
