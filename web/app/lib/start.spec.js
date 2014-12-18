// Copyright (c) 2014 The Virtual Vulcano authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that
// can be found in the LICENSE.md file.

'use strict';

var childProccessPromise = require('child-process-promise'),
    Q = require('q'),
    promiseUtils = require('../../test/promise-utils'),
    run = promiseUtils.run,
    iterativePromisesFunc = promiseUtils.iterativePromisesFunc,
    fs = require('fs'),
    _ = require('lodash'),
    start = require('./start');


describe('start', function () {

  it('should read start script template', function () {
    spyOn(Q, 'nfcall').and.returnValue(Q.defer().promise);

    start._sendStartScript('foo-id', '192.168.0.1');

    expect(Q.nfcall).toHaveBeenCalledWith(fs.readFile, 'app/assets/start.tmpl.sh', 'utf-8');
  });

  it('should write start script', function () {
    spyOn(Q, 'nfcall').and.callFake(function (fn) {
      if(fn == fs.readFile) {
        return Q('bar-template');
      }

      return Q.defer().promise;
    });
    spyOn(_, 'template').and.returnValue('baz');

    start._sendStartScript('foo-id', '192.168.0.1');

    run(function () {
      expect(_.template).toHaveBeenCalledWith('bar-template', {
        id: 'foo-id',
      });
      expect(Q.nfcall).toHaveBeenCalledWith(fs.writeFile, '/tmp/foo-id.sh', 'baz');
    });
  });

  it('should execute scp to copy the start script', function () {
    spyOn(Q, 'nfcall').and.returnValue(Q());
    spyOn(childProccessPromise, 'exec').and.returnValue(Q.defer().promise);

    start._sendStartScript('foo-id', '192.168.0.1');

    run(function () {
      expect(childProccessPromise.exec).toHaveBeenCalledWith('scp /tmp/foo-id.sh core@192.168.0.1:/tmp/foo-id.sh');
    });
  });

  it('should send start script', function () {
    spyOn(start, '_generateRandomId').and.returnValue('foo-id');
    spyOn(start, '_sendStartScript').and.returnValue(Q.defer().promise);

    start.start('foo-service', '192.168.0.1');

    expect(start._sendStartScript).toHaveBeenCalledWith('foo-id', '192.168.0.1');
  });

  it('should write service in a file', function () {
    spyOn(Q, 'nfcall').and.returnValue(Q.defer().promise);
    spyOn(start, '_generateRandomId').and.returnValue('foo-id');
    spyOn(start, '_sendStartScript').and.returnValue(Q());

    start.start('foo-service', '192.168.0.1');

    run(function () {
      expect(Q.nfcall).toHaveBeenCalledWith(fs.writeFile, '/tmp/foo-id.service', 'foo-service');
    });
  });

  it('should send the service', function () {
    spyOn(Q, 'nfcall').and.returnValue(Q());
    spyOn(start, '_generateRandomId').and.returnValue('foo-id');
    spyOn(childProccessPromise, 'exec').and.returnValue(Q.defer().promise);
    spyOn(start, '_sendStartScript').and.returnValue(Q());

    start.start('foo-service', '192.168.0.1');

    run(function () {
      expect(childProccessPromise.exec).toHaveBeenCalledWith('scp /tmp/foo-id.service core@192.168.0.1:/tmp/foo-id.service');
    });
  });

  it('should execute the script remotely', function () {
    spyOn(Q, 'nfcall').and.returnValue(Q());
    spyOn(childProccessPromise, 'exec').and.returnValue(Q());
    spyOn(start, '_generateRandomId').and.returnValue('foo-id');
    spyOn(start, '_sendStartScript').and.returnValue(Q());
    
    start.start('foo-service', '192.168.0.1');

    run(function () {
      expect(childProccessPromise.exec).toHaveBeenCalledWith('ssh core@192.168.0.1 "cd /tmp && chmod +x foo-id.sh && ./foo-id.sh"');
    });
  });

  it('should return a promise', function () {
    var execDefers = [
      Q.defer(),
      Q.defer(),
    ];
    execDefers[0].resolve();
    spyOn(childProccessPromise, 'exec').and.callFake(function () {
      return execDefers[childProccessPromise.exec.calls.count() - 1].promise;
    });

    spyOn(Q, 'nfcall').and.returnValue(Q());
    spyOn(start, '_generateRandomId').and.returnValue('foo-id');
    spyOn(start, '_sendStartScript').and.returnValue(Q());
    
    var spy = jasmine.createSpy();
    start.start('foo-service', '192.168.0.1').done(spy);

    run(function () {
      expect(spy).not.toHaveBeenCalled();
    });
    run(function () {
      execDefers[1].resolve();
    });
    run(function () {
      expect(spy).toHaveBeenCalled();
    });
  });

});
