#!/usr/bin/env python
# -*- coding: utf-8 -*-

import webapp2
import json

from google.appengine.api import urlfetch


class CodeHandler(webapp2.RequestHandler):
    def post(self):
        result = urlfetch.fetch('http://discovery.etcd.io/new')
        if result.status_code != 200:
            self.abort(503)

        self.response.headers['Content-Type'] = 'application/json'
        self.response.out.write(json.dumps({
            'id': result.content[26:],
        }))
