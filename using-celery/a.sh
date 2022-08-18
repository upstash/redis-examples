#!/bin/bash

# curl -X POST http://localhost:5000/run -H 'Content-Type: application/json' -d '{"id":"id1", "email":"a@b.com", "difficulty":"medium"}'
# flask --app server run

# until $(curl --output /dev/null --silent --head --fail http://localhost:5000); do
#     printf '.'
#     sleep 1
# done
# curl -X POST http://localhost:5000/run -H 'Content-Type: application/json' -d '{"id":"id1", "email":"a@b.com", "difficulty":"medium"}'



# echo 'from tasks import add ; add.delay(1,2); add.delay(1,3)' | python3



flask --app server run > /dev/null 2>&1 &
celery -A tasks worker --loglevel=INFO > /dev/null 2>&1 &
python3 test.py
