# Copyright (c) 2015 The Virtual Vulcano authors. All rights reserved.
# Use of this source code is governed by a BSD-style license that
# can be found in the LICENSE.md file.

FROM debian:wheezy
MAINTAINER Virtual Vulcano <virtualvulcano@gmail.com>

RUN echo deb http://ftp.debian.org/debian/ wheezy-backports main >> /etc/apt/sources.list && \
    apt-get update && \
    apt-get install -y haproxy

CMD haproxy -f /etc/haproxy/haproxy.cfg -p /var/run/haproxy.pid
