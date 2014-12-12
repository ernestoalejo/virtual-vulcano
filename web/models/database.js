//Copyright (c) 2014 The Virtual Vulcano authors. All rights reserved.
//Use of this source code is governed by a BSD-style license that
//can be found in the LICENSE.md file.

"use strict";

var mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/vv:27017', function (error) {
   if (error) {
      throw error; 
   }
});
