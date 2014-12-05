# -*- coding: utf-8 -*-
#
# Copyright (c) 2014 The Virtual Vulcano authors. All rights reserved.
# Use of this source code is governed by a BSD-style license that
# can be found in the LICENSE.md file.
#

import os

import webapp2


debug = os.environ.get('SERVER_SOFTWARE', '').startswith('Dev')


application = webapp2.WSGIApplication([
  ('/api/code', 'virtual.handlers.code_handler.CodeHandler'),
], debug=debug)
