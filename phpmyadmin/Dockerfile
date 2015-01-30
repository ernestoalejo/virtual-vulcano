# Copyright (c) 2015 The Virtual Vulcano authors. All rights reserved.
# Use of this source code is governed by a BSD-style license that
# can be found in the LICENSE.md file.

FROM debian:wheezy
MAINTAINER Virtual Vulcano <virtualvulcano@gmail.com>

RUN apt-get update
RUN apt-get install -y apache2 && \ 
    apt-get install -y php5-common libapache2-mod-php5 php5-cli

RUN DEBIAN_FRONTED=noninteractive apt-get install -y phpmyadmin

ADD provision/config.inc.php /etc/phpmyadmin/config.inc.php

RUN echo "Include /etc/phpmyadmin/apache.conf" >> /etc/apache2/apache2.conf

CMD /usr/sbin/apache2ctl -D FOREGROUND
