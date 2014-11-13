
FROM dockerfile/python
MAINTAINER Virtual Vulcano <virtualvulcano@gmail.com>

RUN apt-get update
RUN apt-get -y install python-pil

RUN pip install Flask

ADD vulcano/ /vulcano

WORKDIR /vulcano
CMD python server.py
