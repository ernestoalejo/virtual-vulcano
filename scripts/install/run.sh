# Copyright (c) 2015 The Virtual Vulcano authors. All rights reserved.
# Use of this source code is governed by a BSD-style license that
# can be found in the LICENSE.md file.
#!/usr/bin/bash

set -eu

SERVICES_PATH=/opt/virtualvulcano/services

docker pull virtualvulcano/web-server

sudo mkdir -p $SERVICES_PATH
cd $SERVICES_PATH

curl https://raw.githubusercontent.com/ernestoalejo/virtual-vulcano/master/services/database.service | sudo tee database.service > /dev/null
curl https://raw.githubusercontent.com/ernestoalejo/virtual-vulcano/master/services/web.service | sudo tee web.service > /dev/null
curl https://raw.githubusercontent.com/ernestoalejo/virtual-vulcano/master/services/ftp.service | sudo tee ftp.service > /dev/null

sudo systemctl enable $SERVICES_PATH/database.service
sudo systemctl start database

sudo systemctl enable $SERVICES_PATH/web.service
sudo systemctl start web

sudo systemctl enable $SERVICES_PATH/ftp.service
sudo systemctl start ftp
