#!/bin/bash

npm ci
npx nx build api
docker build . -t e2emcve -f api.Dockerfile
