// Copyright (c) 2014 The Virtual Vulcano authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that
// can be found in the LICENSE.md file.

'use strict';

var fs = require('fs'),
    childProccessPromise = require('child-process-promise'),
    creation = require('./creation');


describe('creation', function () {

    it('should check the correct route', function (done) {
        spyOn(fs, 'stat').and.callFake(function (path, callback) {
            callback();
        });

        creation._checkIfSSHExists().fin(function () {
            expect(fs.stat).toHaveBeenCalledWith('/root/.ssh/id_rsa', jasmine.any(Function));

            done();
        });
    });

    it('should check not generate a new SSH key if one exists before', function (done) {
        spyOn(fs, 'stat').and.callFake(function (path, callback) {
            callback();
        });
        spyOn(childProccessPromise, 'exec');

        creation._checkIfSSHExists().fin(function () {
            expect(childProccessPromise.exec).not.toHaveBeenCalled();

            done();
        });
    });

    it('should check generate a new SSH key if there is none', function (done) {
        spyOn(fs, 'stat').and.callFake(function (path, callback) {
            callback('file not found');
        });
        spyOn(childProccessPromise, 'exec');

        creation._checkIfSSHExists().fin(function () {
            expect(childProccessPromise.exec).toHaveBeenCalledWith('ssh-keygen -t rsa -N "" -f /root/.ssh/id_rsa');

            done();
        });
    });

});
