#!/bin/bash
fuser -k 3000/tcp

service redis_6379 start
cd ./oj-server
npm install
nodemon server.js &
cd ../oj-client
npm install
ng build --watch &
cd ../executor
pip install -r requirements.txt
python executor_server.py &

echo "=================================="
read -p "PRESS [ENTER] TO TERMINATE PREOCESSES." PRESSKEY

fuser -k 5000/tcp
fuser -k 3000/tcp
server redis_6379 stop
