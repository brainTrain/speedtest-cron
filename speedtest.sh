#!/bin/bash

BASEDIR=$(dirname "$0")
LOG_PATH=$BASEDIR/logs/speedtest.log
BIN=/usr/local/bin

date +%Y-%m-%dT%H:%M:%S%z >> $LOG_PATH
$BIN/gdate +%s%N >> $LOG_PATH
$BIN/speedtest --simple >> $LOG_PATH
echo "-----" >> $LOG_PATH

node parse.js

git commit $BASEDIR/logs/*  -m "programmatic commit"
git push origin master
