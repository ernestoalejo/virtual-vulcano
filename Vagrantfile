# Copyright (c) 2015 The Virtual Vulcano authors. All rights reserved.
# Use of this source code is governed by a BSD-style license that
# can be found in the LICENSE.md file.


# Use Docker as the default provider (it's VirtualBox or VMWare in most of the
# cases when you have Vagrant installed)
ENV['VAGRANT_DEFAULT_PROVIDER'] ||= 'docker'


# Go to the directory with the Vagrantfile (the root one)
Dir.chdir File.dirname(__FILE__)


Vagrant.configure('2') do |config|
  # Don't sync the whole folder with all containers with the images we run
  config.vm.synced_folder '.', '/vagrant', :disabled => true

  config.vm.define 'database' do |database|
    database.vm.provider 'docker' do |d|
      d.name = 'database'
      d.create_args = ['--privileged=true']
      d.build_dir = 'database'
    end
  end

  config.vm.define 'web' do |web|
    web.vm.provider 'docker' do |d|
      d.name = 'web'
      d.create_args = ['--privileged=true', '-i', '-t']
      d.build_dir = 'web'
      d.ports = ['8000:8000']

      d.link('database:database')
    end

    web.vm.synced_folder 'web', '/web'
  end

  config.push.define 'database', strategy: 'local-exec' do |push|
    push.script = 'scripts/push/database.sh'
  end
  config.push.define 'ftp', strategy: 'local-exec' do |push|
    push.script = 'scripts/push/ftp.sh'
  end
  config.push.define 'web', strategy: 'local-exec' do |push|
    push.script = 'scripts/push/web.sh'
  end
end
  
