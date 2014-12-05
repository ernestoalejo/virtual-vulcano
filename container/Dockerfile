# Copyright (c) 2014 The Virtual Vulcano authors. All rights reserved.
# Use of this source code is governed by a BSD-style license that
# can be found in the LICENSE.md file.

FROM dockerfile/python
MAINTAINER Virtual Vulcano <virtualvulcano@gmail.com>

RUN apt-get update
RUN apt-get -y install python-pil

RUN pip install Flask

ADD web/ /web

WORKDIR /web
CMD python server.py
