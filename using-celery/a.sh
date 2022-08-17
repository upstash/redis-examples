#!/bin/bash

flask --app server run

until $(curl --output /dev/null --silent --head --fail http://localhost:5000); do
    printf '.'
    sleep 1
done
curl -X POST http://localhost:5000/run -H 'Content-Type: application/json' -d '{"id":"id1", "email":"a@b.com", "difficulty":"medium"}'
