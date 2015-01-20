# Copyright (c) 2015 The Virtual Vulcano authors. All rights reserved.
# Use of this source code is governed by a BSD-style license that
# can be found in the LICENSE.md file.
#!/usr/bin/bash

set -eu

SERVICES_PATH=/opt/virtualvulcano/services

docker pull virtualvulcano/web-server

mkdir -p $SERVICES_PATH
cd $SERVICES_PATH

wget https://raw.githubusercontent.com/ernestoalejo/virtual-vulcano/master/services/database.service
wget https://raw.githubusercontent.com/ernestoalejo/virtual-vulcano/master/services/web.service

fleetctl submit database.service
fleetctl load database.service
fleetctl start database.service

fleetctl submit web.service
fleetctl load web.service
fleetctl start web.service
