#!/bin/bash

# Copyright (c) 2014 The Virtual Vulcano authors. All rights reserved.
# Use of this source code is governed by a BSD-style license that
# can be found in the LICENSE.md file.

mongod > /tmp/mongo-logs &

cd /web

while [[ 1 ]]; do
  node app/index.js
  sleep 3
  
    echo
  echo "-----------------------------------------"
  echo
done
