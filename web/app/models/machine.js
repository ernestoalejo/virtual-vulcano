//Copyright (c) 2014 The Virtual Vulcano authors. All rights reserved.
//Use of this source code is governed by a BSD-style license that
//can be found in the LICENSE.md file.

'use strict';


var MachineSchema = mongoose.Schema ({
   machineId: {type: String, required: true}, 
   name: {type: String, required: true},
}); 


module.exports = mongoose.model('Machine', MachineSchema);
