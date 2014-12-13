// Copyright (c) 2014 The Virtual Vulcano authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that
// can be found in the LICENSE.md file.

'use strict';

var fs = require('fs'),
    Q = require('q'),
    childProccessPromise = require('child-process-promise'),
    _ = require('lodash'),
    creation = require('./creation');


describe('creation', function () {

    it('should check the correct route', function () {
        spyOn(Q, 'nfcall').and.returnValue(Q.defer().promise);

        creation._checkIfSSHExists();
        
        expect(Q.nfcall).toHaveBeenCalledWith(fs.stat, '/root/.ssh/id_rsa');
    });

    it('should check not generate a new SSH key if one exists before', function (done) {
        var defer = Q.defer();
        defer.resolve();

        spyOn(Q, 'nfcall').and.returnValue(defer.promise);
        spyOn(childProccessPromise, 'exec');

        creation._checkIfSSHExists().fin(function () {
            expect(childProccessPromise.exec).not.toHaveBeenCalled();

            done();
        });
    });

    it('should check generate a new SSH key if there is none', function (done) {
        var defer = Q.defer();
        defer.reject();

        spyOn(Q, 'nfcall').and.returnValue(defer.promise);
        spyOn(childProccessPromise, 'exec');

        creation._checkIfSSHExists().fin(function () {
            expect(childProccessPromise.exec).toHaveBeenCalledWith('ssh-keygen -t rsa -N "" -f /root/.ssh/id_rsa');

            done();
        });
    });

    it('should call to _checkIfSSHExists()', function () {
        spyOn(creation, '_checkIfSSHExists').and.returnValue(Q.defer().promise);

        creation.create();

        expect(creation._checkIfSSHExists).toHaveBeenCalled();
    });

    it('should load cloud-config template and SSH key', function (done) {
        var defer = Q.defer();
        defer.resolve();
        spyOn(creation, '_checkIfSSHExists').and.returnValue(defer.promise);

        spyOn(Q, 'nfcall').and.returnValue(Q.defer().promise);

        creation.create();

        defer.promise.fin(function () {
            expect(Q.nfcall).toHaveBeenCalledWith(fs.readFile, '/web/web/assets/cloud-config.tmpl.yml', 'utf-8');
            expect(Q.nfcall).toHaveBeenCalledWith(fs.readFile, '/root/.ssh/id_rsa.pub', 'utf-8');

            done();
        });
    });
    
    iit('should load both files before preparing the cloud-config configuration', function (done) {
        var defer = Q.defer();
        defer.resolve();
        spyOn(creation, '_checkIfSSHExists').and.returnValue(defer.promise);

        var readDefers = [
            Q.defer(), 
            Q.defer(),
        ];
        readDefers[0].resolve();

        spyOn(Q, 'nfcall').and.callFake(function () {
            return readDefers[Q.nfcall.calls.count() - 1].promise;
        });

        var spy = jasmine.createSpy();
        creation.create().then(spy);

        readDefers[0].promise.done(function () {
            expect(spy).not.toHaveBeenCalled();
            readDefers[1].resolve();
        });

        readDefers[1].promise.done(function () {
            expect(spy).toHaveBeenCalled();
            done();
        });
            
    });

});
