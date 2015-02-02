#Copyright (c) 2015 The Virtual Vulcano authors. All rights reserved.
#Use of this source code is governed by a BSD-style license that
#can be found in the LICENSE.md file.

#!/bin/bash

docker build -t virtualvulcano/ftp ftp
docker push virtualvulcano/ftp
