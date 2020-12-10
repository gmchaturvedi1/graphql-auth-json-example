#!/bin/bash
#yarn build 
tar  czvf  myApp.tar.gz    src package.json .babelrc  process.json start.js   --exclude="node_modules"
scp -i ~/Documents/gm-go4itest.pem myApp.tar.gz  ubuntu@3.13.54.73:~/
rm myApp.tar.gz
ssh -T  -i ~/Documents/gm-go4itest.pem ubuntu@3.13.54.73 << 'ENDSSH'
cd ~/
#pm2 stop go4itestServer
rm -rf server
mkdir server
tar -xf myApp.tar.gz -C server
rm -rf myApp.tar.gz
#rm myApp.tar.gz
cd server
yarn
yarn add bcrypt --force
yarn build
#pm2 start  go4itestServer
ENDSSH
