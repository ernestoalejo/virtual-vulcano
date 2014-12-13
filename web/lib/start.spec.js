// Copyright (c) 2014 The Virtual Vulcano authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that
// can be found in the LICENSE.md file.

'use strict';

var childProccessPromise = require('child-process-promise'),
    Q = require('q'),
    start = require('./start');


describe('start', function () {

  it('should execute scp to copy the start script', function () {
    spyOn(childProccessPromise, 'exec').and.returnValue(Q.defer().promise);
    spyOn(start, '_generateRandomId').and.returnValue('foo');

    start.start('foo', '192.168.0.1');

    expect(childProccessPromise.exec).toHaveBeenCalledWith('scp core@192.168.0.1 /web/assets/start.tmpl.sh /tmp/foo.sh');
  });

  it('should execute ssh to run the start script', function (done) {
    var defer = Q.defer();
    defer.resolve();

    spyOn(childProccessPromise, 'exec').and.returnValue(defer.promise);
    spyOn(start, '_generateRandomId').and.returnValue('foo');

    start.start('foo', '192.168.0.1').then(function () {
      expect(childProccessPromise.exec).toHaveBeenCalledWith('ssh core@192.168.0.1 "cd /tmp && chmod +x foo.sh && ./foo.sh"');
    
      done();
    });
  });

  // TODO(alberto): Test that the second then callback returns a promise with the exec.

});
