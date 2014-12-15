# Copyright (c) 2014 The Virtual Vulcano authors. All rights reserved.
# Use of this source code is governed by a BSD-style license that
# can be found in the LICENSE.md file.

FROM dockerfile/nodejs-bower-gulp
MAINTAINER Virtual Vulcano <virtualvulcano@gmail.com>

RUN apt-get update

# Intalar mongoDB
RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10 && \
   echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' > /etc/apt/sources.list.d/mongodb.list && \
   apt-get update && \
   apt-get install -y mongodb-10gen
RUN mkdir -p /data/db

ADD . /web

WORKDIR /web
CMD ((mongod > /tmp/mongo-logs) &) && bash
