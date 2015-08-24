# Zoopeeker

[![Docker stars](https://img.shields.io/docker/stars/inventid/zoopeeker.svg)](https://hub.docker.com/r/inventid/zoopeeker/)
[![Docker pulls](https://img.shields.io/docker/pulls/inventid/zoopeeker.svg)](https://hub.docker.com/r/inventid/zoopeeker/)

An intuitive and very fast single page Web UI to browse your Zookeeper servers.

## Features

- Get a list of nodes.
- Get a list of children nodes.
- Filter/search for nodes.
- Update node contents.
- Create nodes.
- Delete nodes with their children.

## Quick Start

1. Clone or download this repo.

		git clone git@github.com:kadishmal/zoopeeker.git
		npm install && bower install
		cd zoopeeker

2. Run the app (set the environment variables correctly) `PORT=9999 ZK_HOST=localhost ZK_PORT=2181 node app.js`.

Suggestions & Pull Requests are welcome.

## License

Zoopeeker is distributed under the terms of the MIT license.
For details refer to the [LICENSE](https://github.com/kadishmal/zoopeeker/blob/master/LICENSE) file.

## Forwarding through nginx

Use can use the following nginx template

```
map $http_upgrade $connection_upgrade {
        default upgrade;
        '' close;
}

upstream zoopeeker {
        server                  srv4:9999;
}

server {
        listen                  80;
        server_name             zoopeeker.crew.inventid.net;
        keepalive_timeout       70;
        error_page 497          https://$host$request_uri$is_args$args;

        access_log              /var/log/nginx/crew.json.log logstash_json;
        error_log               /var/log/nginx/error.log;

        add_header              Strict-Transport-Security max-age=63072000;
        add_header              X-Frame-Options DENY;
        add_header              X-Content-Type-Options nosniff;

        client_header_timeout   600;
        client_body_timeout     600;

        root                    /opt/crew;

        gzip                    on;
        gzip_types              text/plain text/html text/css application/json application/x-javascript text/xml application/xml application/xml+rss text/javascript application/javascript text/x-js;
        gzip_disable            "MSIE [1-6]\.(?!.*SV1)";

        location / {
                proxy_redirect          off;
                proxy_set_header        Host $host;
                proxy_pass              http://zoopeeker;
        }

        location /socket.io {
                proxy_pass              http://zoopeeker;
                proxy_set_header        Host $http_host;
                proxy_set_header        X-Real-IP $remote_addr;
                proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_http_version      1.1;
                proxy_set_header        Upgrade $http_upgrade;
                proxy_set_header        Connection $connection_upgrade;
                proxy_connect_timeout   600;
                proxy_send_timeout      600;
                proxy_read_timeout      600;
                client_max_body_size    32m;
                client_body_buffer_size 128k;
        }
}
```

