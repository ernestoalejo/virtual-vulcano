# -*- coding: utf-8 -*-
#
# Copyright (c) 2014 The Virtual Vulcano authors. All rights reserved.
# Use of this source code is governed by a BSD-style license that
# can be found in the LICENSE.md file.
#

import webapp2
import json
from virtual.lib.cloud_config import *

from google.appengine.api import urlfetch


class CodeHandler(webapp2.RequestHandler):
    def post(self):
        result = urlfetch.fetch('http://discovery.etcd.io/new')
        if result.status_code != 200:
            self.abort(503)
        self.response.out.write(
            json.dumps({
                "cloudConfig": generate_cloud_config(result.content[26:]),
                "token": result.content[26:]
                }))
