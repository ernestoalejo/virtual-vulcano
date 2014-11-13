#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os

import webapp2


debug = os.environ.get('SERVER_SOFTWARE', '').startswith('Dev')


application = webapp2.WSGIApplication([
  ('/api/code', 'virtual.handlers.code_handler.CodeHandler'),
], debug=debug)
