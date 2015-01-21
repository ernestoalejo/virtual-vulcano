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

sudo systemctl enable database.service
sudo systemctl start database.service

sudo systemctl enable web.service
sudo systemctl start web.service

sudo systemctl enable ftp.service
sudo systemctl start ftp.service

