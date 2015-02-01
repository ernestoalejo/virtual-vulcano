
Requirements for contributing
=============================

docker
------

It's pretty evident but you'll need Docker to develop containers. Instructions to install in several platforms [here](https://docs.docker.com/installation/).


crane
------

In development we use crane to manage all the services we need to test.

If you already have a working Go environment you can install it with:

```shell
go get github.com/michaelsauter/crane
```

Otherwise download the precompiled binary using:

```shell
bash -c "`curl -sL https://raw.githubusercontent.com/michaelsauter/crane/master/download.sh`" && sudo mv crane /usr/local/bin/crane
```

(commands from the [official page](https://github.com/michaelsauter/crane))
