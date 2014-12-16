// Copyright (c) 2014 The Virtual Vulcano authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that
// can be found in the LICENSE.md file.

'use strict';

var fs = require('fs'),
    Q = require('q'),
    childProccessPromise = require('child-process-promise'),
    _ = require('lodash'),
    creation = require('./creation'),
    promiseUtils = require('../../test/promise-utils'),
    run = promiseUtils.run,
    iterativePromisesFunc = promiseUtils.iterativePromisesFunc;


describe('creation', function () {

  it('should create a new SSH key if there is none', function () {
    var stat = Q.defer();
    stat.reject('file does not exists');
    spyOn(Q, 'nfcall').and.returnValue(stat.promise);
    
    spyOn(childProccessPromise, 'exec');

    run(function () {
      return creation.create()
        .fail(function () {
          // ignore the error, the rejection it's on purpose
        });
    });

    run(function () {
      expect(childProccessPromise.exec).toHaveBeenCalledWith('ssh-keygen -t rsa -N "" -f /root/.ssh/id_rsa');
    });
  });

  it('should not generate a new SSH key if one exists before', function () {
    spyOn(Q, 'nfcall').and.returnValue(Q());
    
    spyOn(childProccessPromise, 'exec');

    run(creation.create);

    run(function () {
      expect(childProccessPromise.exec).not.toHaveBeenCalledWith();
    });
  });

  it('should read cloud-config template and id_rsa key', function () {
    spyOn(Q, 'nfcall').and.callFake(function (fn) {
      if (fn === fs.stat) {
        return Q();
      }
    });

    run(creation.create);

    run(function () {
      expect(Q.nfcall).toHaveBeenCalledWith(fs.readFile, '/web/app/assets/cloud-config.tmpl.yml', 'utf-8');
      expect(Q.nfcall).toHaveBeenCalledWith(fs.readFile, '/root/.ssh/id_rsa.pub', 'utf-8');
    });
  });

  it('should read both files before generating the config', function () {
    var readDefers = [
      Q.defer(),
      Q.defer(),
    ];
    var nextReadPromise = iterativePromisesFunc(readDefers);
    spyOn(Q, 'nfcall').and.callFake(function (fn) {
      if (fn === fs.stat) {
        return Q();
      }
      if (fn === fs.readFile) {
        return nextReadPromise();
      }
    });

    var spy = jasmine.createSpy();
    creation.create().done(spy);

    run(function () {
      readDefers[0].resolve();
    });
    run(function () {
      expect(spy).not.toHaveBeenCalled();
    });
    run(function () {
      readDefers[1].resolve();
    });
    run(function () {
      expect(spy).toHaveBeenCalled();
    });
  });

  it('should generate the cloud-config template correctly', function () {
    var readDefers = [
      Q.defer(),
      Q.defer(),
    ];
    var nextReadPromise = iterativePromisesFunc(readDefers);
    spyOn(Q, 'nfcall').and.callFake(function (fn) {
      if (fn === fs.stat) {
        return Q();
      }
      if (fn === fs.readFile) {
        return nextReadPromise();
      }
    });

    readDefers[0].resolve('cloud-config template');
    readDefers[1].resolve('ssh key');

    spyOn(_, 'template').and.returnValue('template result');

    run(function () {
      return creation.create('cluster id').then(function (result) {
        expect(result).toBe('template result');
      });
    });
    run(function () {
      expect(_.template).toHaveBeenCalledWith('cloud-config template', {
        clusterId: 'cluster id',
        sshKey: 'ssh key',
      });
    });
  });

});
