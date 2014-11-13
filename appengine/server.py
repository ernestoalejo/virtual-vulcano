#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os

import webapp2

debug = os.environ.get('SERVER_SOFTWARE', '').startswith('Dev')

application = webapp2.WSGIApplication([
  ('/', 'virtual.handlers.hello_world_handler.HelloWorldHandler'),
], debug=debug)
