#!/usr/bin/bash

# Copyright (c) 2015 The Virtual Vulcano authors. All rights reserved.
# Use of this source code is governed by a BSD-style license that
# can be found in the LICENSE.md file.

set -eu

SERVICES_PATH=/opt/virtualvulcano/services

echo " [*] Cache containers..."
docker pull virtualvulcano/apache
docker pull virtualvulcano/database
docker pull virtualvulcano/ftp
docker pull virtualvulcano/haproxy
docker pull virtualvulcano/phpmyadmin
docker pull virtualvulcano/web

echo " [*] Prepare dist folder..."
sudo mkdir -p $SERVICES_PATH
cd $SERVICES_PATH

echo " [*] Download services files..."
declare -a SERVICES=("database" "web" "ftp" "haproxy" "phpmyadmin")
for SERVICE in "${SERVICES[@]}"
do
    echo " [*] Download service $SERVICE definition file"
    sudo curl -s https://raw.githubusercontent.com/ernestoalejo/virtual-vulcano/master/services/$SERVICE.service -o $SERVICE.service

    echo " [*] Enable $SERVICE service..."
    sudo systemctl enable $SERVICES_PATH/$SERVICE.service
done


# We initialize the containers manually to control the times
echo " [*] Restart database service"
sudo systemctl restart database
echo " [*] Restart ftp service"
sudo systemctl restart ftp
echo " Waiting for database"
sleep 20
echo " [*] Restart web service"
sudo systemctl restart web
echo " [*] Restart phpmyadmin service"
sudo systemctl restart phpmyadmin
echo " [*] Restart haproxy service"
sudo systemctl restart haproxy

