
Example service file
====================

```yaml
[Unit]
Description=Test service

[Service]
Type=oneshot
RemainAfterExit=true
ExecStart=/usr/bin/pwd
```
