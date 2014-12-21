# -*- coding: utf-8 -*-
#
# Copyright (c) 2014 The Virtual Vulcano authors. All rights reserved.
# Use of this source code is governed by a BSD-style license that
# can be found in the LICENSE.md file.
#

def generate_cloud_config(token):
    template = open('assets/cloud-config.tmpl.yml', 'r')
    template_str = template.read()
    template.close()
    return template_str.replace('${TOKEN}', token)
