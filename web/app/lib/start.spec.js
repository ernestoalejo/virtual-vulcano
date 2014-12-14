// Copyright (c) 2014 The Virtual Vulcano authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that
// can be found in the LICENSE.md file.

'use strict';

var childProccessPromise = require('child-process-promise'),
    Q = require('q'),
    promiseUtils = require('../../test/promise-utils'),
    run = promiseUtils.run,
    iterativePromisesFunc = promiseUtils.iterativePromisesFunc,
    start = require('./start');


describe('start', function () {

  it('should execute scp to copy the start script', function () {
    spyOn(childProccessPromise, 'exec').and.returnValue(Q.defer().promise);
    spyOn(start, '_generateRandomId').and.returnValue('foo');

    start.start('foo', '192.168.0.1');

    expect(childProccessPromise.exec).toHaveBeenCalledWith('scp core@192.168.0.1 /web/assets/start.tmpl.sh /tmp/foo.sh');
  });

  it('should execute ssh to run the start script', function () {
    spyOn(childProccessPromise, 'exec').and.returnValue(Q());
    spyOn(start, '_generateRandomId').and.returnValue('foo');

    run(function () {
      return start.start('foo', '192.168.0.1');
    });

    run(function () {
      expect(childProccessPromise.exec).toHaveBeenCalledWith('ssh core@192.168.0.1 "cd /tmp && chmod +x foo.sh && ./foo.sh"');
    });
  });

  it('should wait for both commands sequentially before returning', function () {
    var defers = [
      Q.defer(),
      Q.defer(),
    ];
    spyOn(childProccessPromise, 'exec').and.callFake(iterativePromisesFunc(defers));

    var spy = jasmine.createSpy();
    start.start().done(spy);

    run(function () {
      expect(childProccessPromise.exec.calls.count()).toBe(1);
      defers[0].resolve();
    });
    run(function () {
      expect(spy).not.toHaveBeenCalled();
    });
    run(function () {
      expect(childProccessPromise.exec.calls.count()).toBe(2);
      defers[1].resolve();
    });
    run(function () {
      expect(spy).toHaveBeenCalled();
    });
  });

});
