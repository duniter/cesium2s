#!/bin/bash

NODE=http://localhost:9933

curl -H "Content-Type: application/json" -d '{"id":"1", "jsonrpc":"2.0", "method": "state_getMetadata", "params":[]}' ${NODE} > ../src/interfaces/types.json
