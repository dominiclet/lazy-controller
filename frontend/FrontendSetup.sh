#!/bin/bash

echo Enter IP address of backend machine: 
read ip_addr
echo Enter port of backend process:
read port

export REACT_APP_BACKEND_URL=http://$ip_addr:$port 
echo "REACT_APP_BACKEND_URL is set to $REACT_APP_BACKEND_URL"