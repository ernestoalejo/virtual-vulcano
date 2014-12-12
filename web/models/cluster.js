//Copyright (c) 2014 The Virtual Vulcano authors. All rights reserved.
//Use of this source code is governed by a BSD-style license that
//can be found in the LICENSE.md file.

"use strict";


var ClusterSchema = mongoose.Schema ({
   clusterId: {type: String, required: true}, 
   name: {type: String, required: true},
   ip: {type: String, required: true},
   createdAt: {type: String, required: true},
   updatedAt: {type: String, required: true},
}); 


module.exports = mongoose.model('Cluster', ClusterSchema);

