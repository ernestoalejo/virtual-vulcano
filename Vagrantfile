# -*- mode: ruby -*-
# # vi: set ft=ruby :

require 'fileutils'

Vagrant.require_version '>= 1.6.0'


# Defaults for config options defined in CONFIG
$update_channel = 'stable'
$vb_memory = 512
$vb_cpus = 1


Vagrant.configure('2') do |config|
  config.ssh.insert_key = false

  config.vm.box = 'coreos-%s' % $update_channel
  config.vm.box_version = '>= 308.0.1'
  config.vm.box_url = 'http://%s.release.core-os.net/amd64-usr/current/coreos_production_vagrant.json' % $update_channel

  config.vm.provider :virtualbox do |v|
    v.check_guest_additions = false
    v.functional_vboxsf     = false
  end

  if Vagrant.has_plugin?('vagrant-vbguest') then
    config.vbguest.auto_update = false
  end

  config.vm.define vm_name = 'database' do |config|
    config.vm.hostname = vm_name

    config.vm.provider :virtualbox do |vb|
      vb.gui = false
      vb.memory = $vb_memory
      vb.cpus = $vb_cpus
    end

    config.vm.network :private_network, ip: '172.17.8.100'
  end
end
