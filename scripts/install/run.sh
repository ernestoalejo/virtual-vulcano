# Copyright (c) 2015 The Virtual Vulcano authors. All rights reserved.
# Use of this source code is governed by a BSD-style license that
# can be found in the LICENSE.md file.
#!/usr/bin/bash

set -eu

SERVICES_PATH=/opt/virtualvulcano/services

echo " [*] Cache web server..."
docker pull virtualvulcano/web-server

echo " [*] Prepare dist folder..."
sudo mkdir -p $SERVICES_PATH
cd $SERVICES_PATH

echo " [*] Download services files..."
curl https://raw.githubusercontent.com/ernestoalejo/virtual-vulcano/master/services/database.service | sudo tee database.service > /dev/null
curl https://raw.githubusercontent.com/ernestoalejo/virtual-vulcano/master/services/web.service | sudo tee web.service > /dev/null
curl https://raw.githubusercontent.com/ernestoalejo/virtual-vulcano/master/services/ftp.service | sudo tee ftp.service > /dev/null

echo " [*] Enable & start database service..."
sudo systemctl enable $SERVICES_PATH/database.service
sudo systemctl start database

echo " [*] Enable & start web service..."
sudo systemctl enable $SERVICES_PATH/web.service
sudo systemctl start web

echo " [*] Enable & start ftp service..."
sudo systemctl enable $SERVICES_PATH/ftp.service
sudo systemctl start ftp
