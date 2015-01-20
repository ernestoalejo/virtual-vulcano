# Copyright (c) 2015 The Virtual Vulcano authors. All rights reserved.
# Use of this source code is governed by a BSD-style license that
# can be found in the LICENSE.md file.

FROM debian:wheezy
MAINTAINER Virtual Vulcano <virtualvulcano@gmail.com>

RUN apt-get update
RUN apt-get install -y apache2 && \ 
    apt-get install -y php5-common libapache2-mod-php5 php5-cli

CMD /usr/sbin/apache2ctl -D FOREGROUND
