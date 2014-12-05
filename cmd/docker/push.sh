#!/bin/bash
#
# Copyright (c) 2014 The Virtual Vulcano authors. All rights reserved.
# Use of this source code is governed by a BSD-style license that
# can be found in the LICENSE.md file.
# 

cmd/docker/build.sh
(cd containers && docker push virtualvulcano/virtual-vulcano)
