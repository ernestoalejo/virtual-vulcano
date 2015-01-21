# Copyright (c) 2015 The Virtual Vulcano authors. All rights reserved.
# Use of this source code is governed by a BSD-style license that
# can be found in the LICENSE.md file.
#!/usr/bin/bash

set -eu

SERVICES_PATH=/opt/virtualvulcano/services

echo " [*] Cache containers..."
docker pull virtualvulcano/database
docker pull virtualvulcano/ftp
docker pull virtualvulcano/web
docker pull virtualvulcano/web-server

echo " [*] Prepare dist folder..."
sudo mkdir -p $SERVICES_PATH
cd $SERVICES_PATH

echo " [*] Download services files..."
declare -a SERVICES=("database" "web" "ftp")
for SERVICE in "${SERVICES[@]}"
do
    echo " [*] Download service definition file"
    curl -silent https://raw.githubusercontent.com/ernestoalejo/virtual-vulcano/master/services/$SERVICE.service | sudo tee database.service > /dev/null

    echo " [*] Enable & start $SERVICE service..."
    sudo systemctl enable $SERVICES_PATH/$SERVICE.service
    sudo systemctl start $SERVICE
done
