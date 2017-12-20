#!/bin/sh

set -e

PORT=${PORT:=80}
TLS=${TLS:=off}

# Wait for mongo
sleep 10

node index.js &

caddy -conf config/Caddyfile -root frontend/dist