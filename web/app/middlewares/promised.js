// Copyright (c) 2014 The Virtual Vulcano authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that
// can be found in the LICENSE.md file.

'use strict';


module.exports = function (handler) {
    return function (req, res) {
        handler(req)
            .then(function (data) {
                res.json(data);
            })
            .done();
    };
};