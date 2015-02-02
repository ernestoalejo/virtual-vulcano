#!/bin/bash

docker build -t virtualvulcano/haproxy haproxy
docker push virtualvulcano/haproxy
