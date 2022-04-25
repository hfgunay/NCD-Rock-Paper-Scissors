#!/usr/bin/env bash
set -e

[ -z "$CONTRACT" ] && echo "Missing \$CONTRACT environment variable" && exit 1

echo
echo 'About to call createGame function for player 1'
echo 'If you call createGame you will be set as player 1'
echo near call $CONTRACT createGame  --accountId accountId.testnet --amount
echo  
echo \$CONTRACT is $CONTRACT
echo  'You should write accountId.testnet as player 1'
echo  'You should write accountId.testnet as player 1'
echo  'You should write accountId.testnet as player 1'
echo 
echo  'You can change amount before using script'
echo  'You can change amount before using script'
echo  'You can change amount before using script'
near call $CONTRACT createGame --accountId accountId.testnet --amount 0.1