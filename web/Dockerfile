# Copyright (c) 2015 The Virtual Vulcano authors. All rights reserved.
# Use of this source code is governed by a BSD-style license that
# can be found in the LICENSE.md file.

FROM dockerfile/nodejs-bower-gulp
MAINTAINER Virtual Vulcano <virtualvulcano@gmail.com>

RUN apt-get update

RUN \
  echo oracle-java7-installer shared/accepted-oracle-license-v1-1 select true | debconf-set-selections && \
  add-apt-repository -y ppa:webupd8team/java && \
  apt-get update && \
  apt-get install -y oracle-java7-installer && \
  rm -rf /var/lib/apt/lists/* && \
  rm -rf /var/cache/oracle-jdk7-installer

ADD provision/.bashrc /root/.bashrc

ADD app /web
ADD package.json /web/package.json
ADD bower.json /web/bower.json
ADD .bowerrc /web/.bowerrc

RUN npm install -g nodemon

RUN cd /web && npm i
RUN cd /web && bower install --allow-root

ENV JAVA_HOME /usr/lib/jvm/java-7-oracle

WORKDIR /web
CMD scripts/run.sh
