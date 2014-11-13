#!/usr/bin/env python
# -*- coding: utf-8 -*-

import webapp2


class HelloWorldHandler(webapp2.RequestHandler):
  def get(self):
    self.response.headers['Content-Type'] = 'text/plain'
    self.response.write('Hello world!')
