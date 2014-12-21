# -*- coding: utf-8 -*-
#
# Copyright (c) 2014 The Virtual Vulcano authors. All rights reserved.
# Use of this source code is governed by a BSD-style license that
# can be found in the LICENSE.md file.
#

import webapp2

from virtual.lib.cloud_config import *


class GenetareCloudConfigHandler(webapp2.RequestHandler):
    def get(self, token):
        # return 'self.response(generate_cloud_config(token))'
        self.response.headers['Content-Type'] = "application/json"
        self.response.out.write(generate_cloud_config(token))
            
