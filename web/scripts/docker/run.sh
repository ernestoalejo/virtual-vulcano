#!/bin/bash

# Copyright (c) 2015 The Virtual Vulcano authors. All rights reserved.
# Use of this source code is governed by a BSD-style license that
# can be found in the LICENSE.md file.

set -eu

docker rm web || echo -n
docker run --privileged=true -v $(pwd):/web -i -p 8000:8000 --link database:database --name web -t virtualvulcano/web bash
