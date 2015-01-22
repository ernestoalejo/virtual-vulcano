#!/bin/bash

# Copyright (c) 2015 The Virtual Vulcano authors. All rights reserved.
# Use of this source code is governed by a BSD-style license that
# can be found in the LICENSE.md file.

set -eu

docker run -p 21:21 --privileged=true -i -t virtualvulcano/ftp -name ftp
