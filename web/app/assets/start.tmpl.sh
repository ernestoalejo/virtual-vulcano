#!/bin/bash

# Copyright (c) 2014 The Virtual Vulcano authors. All rights reserved.
# Use of this source code is governed by a BSD-style license that
# can be found in the LICENSE.md file.

mkdir -p /services
mv /tmp/<%- id %>.service /services/<%- id %>.service

cd /services
fleetctl submit <%- id %>.service
fleetctl load <%- id %>.service
fleetctl start <%- id %>.service
