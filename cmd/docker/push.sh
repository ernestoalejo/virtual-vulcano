#!/bin/bash

cmd/docker/build.sh
(cd containers && docker push virtualvulcano/virtual-vulcano)
