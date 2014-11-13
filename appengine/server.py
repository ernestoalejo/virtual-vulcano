#!/usr/bin/env python
# -*- coding: utf-8 -*-

import webapp2


application = webapp2.WSGIApplication([
  ('/', 'virtual.handlers.hello_world_handler.HelloWorldHandler'),
], debug=True)
