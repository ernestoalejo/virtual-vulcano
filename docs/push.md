
Pushing a new release
=====================

Once the code it's in a good form to make a new release you can use this to push the new containers to Docker Hub:

```shell
crane provision
crane push
```

You'll have to configure first the account using:

```shell
docker login
```

To update the running servers you can use again the install command in the README, or simply restart the server (so all the CoreOS services get restarted too.)
