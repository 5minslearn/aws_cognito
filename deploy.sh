#!/bin/bash
cd /home/ubuntu/rentscore_web
git pull origin master
yarn install &&
yarn build &&
pm2 restart web
